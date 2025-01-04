// hooks/useCodeBlockExtractor.ts
import { useState } from 'react';

interface CodeBlock {
  language: string;
  code: string;
  isComplete: boolean;
}

export function useCodeBlockExtractor() {
  const [currentBlock, setCurrentBlock] = useState<CodeBlock | null>(null);
  
  const processMessage = (content: string) => {
    const parts: (string | CodeBlock)[] = [];
    
    // If we have an ongoing block, treat content as continuation
    if (currentBlock) {
      if (content.includes('```')) {
        // Found end of block
        const [blockContent] = content.split('```');
        currentBlock.code += '\n' + blockContent;
        currentBlock.isComplete = true;
        parts.push({ ...currentBlock });
        setCurrentBlock(null);
      } else {
        // Add to existing block
        currentBlock.code += '\n' + content;
        parts.push({ ...currentBlock });
        return parts;
      }
    }

    // Look for new code blocks
    if (content.includes('```')) {
      const segments = content.split('```');
      
      // Add text before code block
      if (segments[0].trim()) {
        parts.push(segments[0].trim());
      }

      // Process code block
      if (segments[1]) {
        const [lang, ...code] = segments[1].split('\n');
        const newBlock = {
          language: lang.trim() || 'text',
          code: code.join('\n').trim(),
          isComplete: segments.length > 2
        };
        
        if (!newBlock.isComplete) {
          setCurrentBlock(newBlock);
        }
        parts.push(newBlock);
      }
    } else {
      parts.push(content);
    }
    
    return parts;
  };

  return {
    processMessage,
    currentBlock,
    resetBlock: () => setCurrentBlock(null)
  };
}