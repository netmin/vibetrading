import React from 'react';
import CodeBlock from './CodeBlock';

type MessageRole = 'user' | 'assistant';

interface MessageBubbleProps {
  role: MessageRole;
  content: string | React.ReactNode;
  isLoading?: boolean;
}

export default function MessageBubble({ role, content, isLoading = false }: MessageBubbleProps) {
  // Function to render content with code blocks and enhanced styling
  const renderContent = () => {
    if (typeof content !== 'string') {
      return content;
    }

    // Simple regex to detect code blocks (```code```)
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    // Find all code blocks and split the content
    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      // Add code block
      const code = match[1].trim();
      const language = code.split('\n')[0].trim();
      const codeContent = language ? code.substring(language.length).trim() : code;

      parts.push(
        <CodeBlock 
          key={match.index} 
          code={codeContent} 
          language={language || 'plaintext'} 
        />
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.map((part, index) => {
      if (typeof part !== 'string') return part;
      
      // Process text parts to format bullet points nicely
      const lines = part.split('\n');
      return (
        <div key={index} className="whitespace-pre-wrap mb-4 last:mb-0">
          {lines.map((line, lineIndex) => {
            // Special formatting for bullet points
            if (line.trim().startsWith('•')) {
              return (
                <div key={lineIndex} className="flex items-start mb-1 last:mb-0">
                  <span className="text-accent font-bold mr-2 flex-shrink-0">•</span>
                  <span>{line.trim().substring(1).trim()}</span>
                </div>
              );
            }
            
            return (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex !== lines.length - 1 && <br />}
              </React.Fragment>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="flex mb-6 last:mb-0 group">
      <div className={`
        relative max-w-[85%] ${role === 'user' ? 'ml-auto' : 'mr-auto'} 
        animate-fade-in transition-all duration-200 group-hover:shadow-md
        ${
          role === 'user' 
            ? 'bg-gradient-to-r from-accent to-accent/90 text-gray-800 rounded-t-2xl rounded-bl-2xl rounded-br-md' 
            : 'bg-card/80 backdrop-blur-sm border border-accent/10 text-text-primary rounded-t-2xl rounded-br-2xl rounded-bl-md'
        }
        ${isLoading ? 'animate-pulse' : ''}
      `}>
        {/* Chat bubble arrow for assistant only */}
        {role === 'assistant' && (
          <div className="absolute -left-2 bottom-0 w-4 h-4 bg-card/80 border-l border-b border-accent/10 rounded-sm transform rotate-45"></div>
        )}
        
        {/* Message content */}
        <div className="p-4 relative z-10">
          {/* Role indicator at the top of the bubble */}
          <div className={`
            text-xs mb-1 font-medium
            ${role === 'user' ? 'text-gray-800/70' : 'text-accent'}
          `}>
            {role === 'user' ? 'You' : 'VibeTrading AI'}
          </div>
          
          <div className={`
            ${role === 'user' ? 'text-gray-800' : 'text-text-primary'}
          `}>
            {renderContent()}
          </div>
          
          {/* Loading indicator */}
          {isLoading && role === 'assistant' && (
            <div className="mt-2 flex gap-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-200"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
