'use client'
import { cn } from "@/utils";
import { useVoice, JSONMessage, ConnectionMessage } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef, useState, useCallback, useMemo, useEffect } from "react";
import { ClipboardCopy, Circle } from "lucide-react";

type VoiceMessage = JSONMessage & {
  type: 'user_message' | 'assistant_message';
  message?: {
    role: string;
    content: string;
  };
  models?: {
    prosody?: {
      scores: Record<string, number>;
    };
  };
};

interface CodeBlock {
  language: string;
  code: string;
  isGenerating?: boolean;
}

const CodeDisplay = ({ language, code, isGenerating }: CodeBlock) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 rounded-lg overflow-hidden border border-border/20 bg-card/5 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-card/10 border-b border-border/10">
        <div className="flex items-center gap-2">
          <Circle className={cn(
            "h-2 w-2",
            isGenerating ? "text-yellow-500 animate-pulse" : "text-green-500"
          )} />
          <span className={cn(
            "text-xs font-medium px-3 py-1 rounded-full",
            language === 'typescript' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
              language === 'javascript' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                'bg-orange-500/10 text-orange-400 border border-orange-500/20'
          )}>
            {language || 'code'}
          </span>
          {isGenerating && (
            <span className="text-xs text-foreground/40">Generating...</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-card/20 rounded-lg transition-all duration-200 group"
        >
          <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-foreground/60">
            {copied ? 'Copied!' : 'Copy'}
          </span>
          <ClipboardCopy className="h-4 w-4 opacity-40 group-hover:opacity-60 transition-opacity" />
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto bg-card/5">
        <code className="text-foreground/80">{code}</code>
      </pre>
    </motion.div>
  );
};

// components/Messages.tsx
const Messages = forwardRef<ComponentRef<typeof motion.div>, Record<never, never>>(
  function Messages(props, ref) {
    const { messages } = useVoice();
    const [activeCodeBlocks, setActiveCodeBlocks] = useState<Record<number, CodeBlock>>({});

     // Process time in the same way as messages
    const currentTime = useMemo(() => {
      const now = new Date();
      return {
        display: now.toISOString().replace('T', ' ').slice(0, 19),
        raw: now
      };
    }, [messages]); // Update whenever messages change
    
    // Move the content processing logic outside of render
    const processContent = useCallback((
      content: string | undefined,
      isAssistant: boolean,
      messageIndex: number,
      currentActiveBlocks: Record<number, CodeBlock>
    ) => {
      if (!content) return { parts: [], newActiveBlocks: currentActiveBlocks };

      const parts: (string | CodeBlock)[] = [];
      const newActiveBlocks = { ...currentActiveBlocks };

      // Check if this message continues a previous code block
      const previousBlock = currentActiveBlocks[messageIndex - 1];

      if (previousBlock) {
        if (content.includes('```')) {
          // End the code block
          const [blockContent] = content.split('```');
          parts.push({
            ...previousBlock,
            code: previousBlock.code + '\n' + blockContent.trim(),
            isGenerating: false
          });

          // Remove this block from active blocks
          delete newActiveBlocks[messageIndex - 1];

          // Add any content after the code block
          const remainingContent = content.split('```')[1];
          if (remainingContent?.trim()) {
            parts.push(remainingContent.trim());
          }
        } else {
          // Continue the code block
          const updatedBlock = {
            ...previousBlock,
            code: previousBlock.code + '\n' + content.trim(),
            isGenerating: true
          };
          parts.push(updatedBlock);
          newActiveBlocks[messageIndex] = updatedBlock;
        }
        return { parts, newActiveBlocks };
      }

      // Handle new code blocks
      if (content.includes('```')) {
        const segments = content.split('```');

        if (segments[0].trim()) {
          parts.push(segments[0].trim());
        }

        if (segments[1]) {
          const [lang, ...codeLines] = segments[1].split('\n');
          const code = codeLines.join('\n').trim();

          const isComplete = segments.length > 2;
          const block: CodeBlock = {
            language: lang.trim() || 'text',
            code,
            isGenerating: isAssistant && !isComplete
          };

          if (!isComplete && isAssistant) {
            newActiveBlocks[messageIndex] = block;
          }

          parts.push(block);

          if (isComplete && segments[2]?.trim()) {
            parts.push(segments[2].trim());
          }
        }
      } else {
        parts.push(content);
      }

      return { parts, newActiveBlocks };
    }, []); // No dependencies needed anymore

    // Process all messages at once
    const processedMessages = useMemo(() => {
      let currentActiveBlocks = {};
      return messages.map((msg: JSONMessage | ConnectionMessage, index) => {
        if ((msg as VoiceMessage)?.type === "user_message" ||
          (msg as VoiceMessage)?.type === "assistant_message") {
          const voiceMsg = msg as VoiceMessage;
          const isAssistant = voiceMsg.type === 'assistant_message';
          const { parts, newActiveBlocks } = processContent(
            voiceMsg.message?.content,
            isAssistant,
            index,
            currentActiveBlocks
          );

          currentActiveBlocks = newActiveBlocks;
          return { voiceMsg, parts, activeBlocks: newActiveBlocks };
        }
        return null;
      });
    }, [messages, processContent]);

    // Update active blocks state only when needed
    useEffect(() => {
      const lastProcessedMessage = processedMessages[processedMessages.length - 1];
      if (lastProcessedMessage?.activeBlocks) {
        setActiveCodeBlocks(lastProcessedMessage.activeBlocks);
      }
    }, [processedMessages]);

      // Time info display depends on processedTime
    const timeInfo = useMemo(() => (
      <div className="text-xs text-foreground/60 mb-4 flex justify-between px-4">
        <span>Current Date and Time (UTC): {currentTime.display}</span>
        <span>Current User&apos;s Login: {process.env.NEXT_PUBLIC_USER || 'Onyerikam'}</span>
      </div>
    ), [currentTime.display]);

     return (
      <motion.div
        layoutScroll
        className="grow rounded-lg overflow-auto p-4 scroll-smooth"
        ref={ref}
      >
        {timeInfo}
        <motion.div className="max-w-2xl mx-auto w-full flex flex-col gap-4 pb-24">
          <AnimatePresence mode="popLayout">
            {processedMessages.map((processed, index) => {
              if (!processed) return null;
              const { voiceMsg, parts } = processed;

              return (
                <motion.div
                  key={voiceMsg.type + index}
                  className={cn(
                    "w-[85%]",
                    "bg-card/30",
                    "backdrop-blur-sm",
                    "border border-border/10 rounded-lg",
                    "shadow-lg",
                    voiceMsg.type === "user_message" ? "ml-auto" : ""
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 0 }}
                >
                  <div className={cn(
                    "text-xs font-medium leading-none",
                    "text-foreground/60",
                    "pt-4 px-4"
                  )}>
                    {voiceMsg.message?.role}
                    {voiceMsg.type === "assistant_message" && activeCodeBlocks[index] && (
                      <span className="ml-2 text-yellow-500">
                        Code block in progress...
                      </span>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    {parts.map((part, i) =>
                      typeof part === 'string' ? (
                        <div key={i} className="text-sm text-foreground/80 whitespace-pre-wrap">{part}</div>
                      ) : (
                        <CodeDisplay
                          key={i}
                          language={part.language}
                          code={part.code}
                          isGenerating={part.isGenerating}
                        />
                      )
                    )}
                  </div>
                  {voiceMsg.models?.prosody?.scores && (
                    <div className="px-4 pb-3 border-t border-border/10 mt-2 pt-3">
                      <Expressions values={voiceMsg.models.prosody.scores} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  }
);

export default Messages;