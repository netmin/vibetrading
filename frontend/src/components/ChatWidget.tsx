import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import TypingDots from './TypingDots'
import { Button } from './ui'
import { subscribeEmail } from '../api/subscriptionApi'

interface ChatWidgetProps {
  onEmailSubmit: (email: string) => void;
  position?: 'fixed' | 'embedded';
  className?: string;
}

// Chat welcome message
const WELCOME_MESSAGE = `👋 Welcome to Vibe Trading!

We're building an innovative algorithmic trading platform that uses market sentiment analysis to identify opportunities.

✨ Please type your email address in this chat to join our waitlist and get notified when we launch! ✨

I can also tell you more about our project if you have questions.`;

// Sample conversation for when user asks about the project
const PROJECT_INFO = `Vibe Trading is currently in development. Here's what we're working on:

• Advanced algorithmic trading strategies based on market sentiment
• Real-time analysis of social media and news sources
• User-friendly interface with customizable trading parameters
• Secure API integrations with major exchanges

Our platform is designed to help both beginners and experienced traders make more informed decisions based on market sentiment.`;

export default function ChatWidget({ 
  onEmailSubmit, 
  position = 'embedded',
  className = ''
}: ChatWidgetProps) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: WELCOME_MESSAGE }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(position === 'embedded');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll the chat container (not the page) when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.parentElement;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [inputMessage]);

  // Process message for email collection
  const processMessage = (message: string) => {
    // Simple email regex pattern
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const emailMatch = message.match(emailPattern);

    if (emailMatch) {
      const email = emailMatch[0];

      // Always call onEmailSubmit to ensure the email is sent to the backend
      onEmailSubmit(email);

      // Set local state to avoid repeatedly asking for email
      setEmailSubmitted(true);

      console.log(`Submitting email: ${email}`);

      return `Thanks for subscribing with ${email}! We'll notify you when Vibe Trading launches.

Is there anything else you'd like to know about our platform?`;
    }

    // Check if message contains questions about the project
    const projectInfoKeywords = ['what', 'how', 'platform', 'trading', 'about', 'project', 'vibe', 'features'];
    if (projectInfoKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return PROJECT_INFO;
    }

    // Default response
    return `That's interesting! If you'd like to stay updated on our progress, just share your email address.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Prevent default scrolling behavior
    e.stopPropagation();

    // Add user message
    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');

    // Simulate assistant typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Process the message and get a response
      const response = processMessage(inputMessage);
      setMessages([...newMessages, {
        role: 'assistant',
        content: response
      }]);
    }, 1500);
  };

  // For fixed position, we need a toggle button
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  // Define widget container styles based on position
  const widgetContainerStyles = position === 'fixed' 
    ? 'fixed bottom-6 right-6 z-50 flex flex-col items-end'
    : `flex flex-col h-[600px] ${className}`;

  // Chat bubble button for fixed position
  const chatBubbleButton = (
    <button 
      onClick={toggleChat}
      className="bg-accent text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )}
    </button>
  );

  // Chat window content
  const chatWindow = (
    <div className={`
      overflow-hidden bg-card/20 shadow-xl rounded-xl border border-accent/20
      ${position === 'fixed' ? 'w-80 sm:w-96 h-[500px] mb-3' : 'w-full h-full'}
      relative
    `}>
      {/* Subtle glow around the entire chat window */}
      <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent rounded-xl blur-md opacity-70 -z-10"></div>
      {/* Chat header */}
      <div className="p-3 border-b border-accent/20 bg-card/40 backdrop-blur-sm flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <h2 className="font-semibold text-text-primary">Vibe Trading Assistant</h2>
        </div>
        {position === 'fixed' && (
          <button 
            onClick={toggleChat} 
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 h-[calc(100%-130px)] bg-card/10">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <MessageBubble 
              key={index} 
              role={msg.role as 'user' | 'assistant'} 
              content={msg.content} 
            />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="border-l-2 border-accent pl-4 py-2">
              <div className="text-xs text-text-muted mb-1">
                Vibe Trading Assistant
              </div>
              <TypingDots />
            </div>
          )}
        </div>

        {/* Invisible element for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area with smooth animated prompt */}
      <div className="border-t border-accent/20 p-3 bg-card/30 backdrop-blur-sm relative">
        {/* Subtle highlight for the entire input area */}
        <div className="absolute inset-0 bg-accent/5 border-t border-accent/15"></div>
        <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); }} className="flex items-center gap-2 relative">
          {/* Subtle glow effect around the form */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent/5 rounded-lg blur-sm opacity-70"></div>
          <div className="flex-1 bg-background rounded-md border border-accent/40 overflow-hidden relative z-10"
                 style={{ animation: 'gentlePulse 4s ease-in-out infinite' }}>
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder=""
              className="w-full bg-transparent border-none resize-none p-2 outline-none text-text-primary min-h-[40px] max-h-[160px] text-sm"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  e.stopPropagation(); // Prevent scrolling
                  handleSubmit(e);
                }
              }}
            />
            {!inputMessage && !emailSubmitted && (
              <div className="absolute inset-0 pointer-events-none flex items-center p-2">
                <span className="text-accent text-sm bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent"
                      style={{
                        backgroundSize: '200% auto',
                        animation: 'gradientFlow 3s ease-in-out infinite, fadeInOut 2s ease-in-out infinite'
                      }}>
                  Type your email here to join our waitlist!
                </span>
              </div>
            )}
            {!inputMessage && emailSubmitted && (
              <div className="absolute inset-0 pointer-events-none flex items-center p-2">
                <span className="text-text-secondary text-sm">
                  Ask me about Vibe Trading...
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            className="relative z-10 flex items-center justify-center self-stretch w-14 group disabled:opacity-50"
            disabled={!inputMessage.trim()}
            aria-label="Send message"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(e);
            }}
          >
            {/* Button background with gradient and animations */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-light rounded-md opacity-90 group-hover:opacity-100 transition-all duration-300 group-active:scale-95"></div>
            <div className="absolute inset-0 bg-accent rounded-md shadow-lg group-hover:shadow-[0_4px_14px_0px_rgba(0,118,255,0.5)] transition-all duration-300"></div>

            {/* Animated overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/5 rounded-md overflow-hidden">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Icon */}
            <div className="relative z-10 text-white transform group-active:scale-90 transition-transform duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </div>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className={widgetContainerStyles}>
      {position === 'fixed' && chatBubbleButton}
      {isOpen && chatWindow}
    </div>
  );
}