import { useState } from "react";
import { Button } from "@/components/ui/button";


// components/CodeInput.tsx
interface CodeInputProps {
  onSubmit: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

export const CodeInput = ({ onSubmit, isLoading }: CodeInputProps) => {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="w-full max-w-2xl mx-auto">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the code you want to generate..."
        className="w-full px-4 py-3 rounded-lg bg-background/40 border border-border/50 
                   focus:ring-2 focus:ring-primary/50 focus:border-primary/50 
                   transition-all duration-200 resize-none h-32"
      />
      <Button
        onClick={() => onSubmit(prompt)}
        disabled={isLoading || !prompt.trim()}
        className="mt-4 w-full"
      >
        {isLoading ? 'Generating...' : 'Generate Code'}
      </Button>
    </div>
  );
};