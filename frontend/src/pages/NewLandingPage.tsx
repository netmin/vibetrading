import { useState, useRef, useEffect } from 'react'
import Layout from '../components/Layout'
import MessageBubble from '../components/MessageBubble'
import TypingDots from '../components/TypingDots'
import { subscribeEmail } from '../api/subscriptionApi'

// Chat welcome message
const WELCOME_MESSAGE = `👋 Welcome to Vibe Trading!

We're building an innovative algorithmic trading platform that uses market sentiment analysis to identify opportunities.

I can tell you more about our project or you can leave your email to get notified when we launch.`;

// Sample conversation for when user asks about the project
const PROJECT_INFO = `Vibe Trading is currently in development. Here's what we're working on:

• Advanced algorithmic trading strategies based on market sentiment
• Real-time analysis of social media and news sources
• User-friendly interface with customizable trading parameters
• Secure API integrations with major exchanges

Our platform is designed to help both beginners and experienced traders make more informed decisions based on market sentiment.`;

// Helper component for the chat UI
const ChatInterface = ({ onEmailSubmit }: { onEmailSubmit: (email: string) => void }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: WELCOME_MESSAGE }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    
    if (emailMatch && !emailSubmitted) {
      const email = emailMatch[0];
      onEmailSubmit(email);
      setEmailSubmitted(true);
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

  return (
    <div className="flex flex-col h-[600px] bg-card/5 shadow-lg rounded-xl border border-accent/10 overflow-hidden">
      {/* Chat header */}
      <div className="p-4 border-b border-accent/10 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <h2 className="font-semibold text-text-primary">Vibe Trading Assistant</h2>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <MessageBubble 
              key={index} 
              role={msg.role as 'user' | 'assistant'} 
              content={msg.content} 
            />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="border-l-2 border-accent pl-6 py-4">
              <div className="text-xs text-text-muted mb-2">
                Vibe Trading Assistant
              </div>
              <TypingDots />
            </div>
          )}
        </div>

        {/* Invisible element for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-accent/10 p-4 bg-card/30 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1 bg-background rounded-md border border-accent/20 overflow-hidden">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={emailSubmitted ? "Ask me about Vibe Trading..." : "Tell me about Vibe Trading or leave your email..."}
              className="w-full bg-transparent border-none resize-none p-3 outline-none text-text-primary min-h-[40px] max-h-[160px]"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <button 
            type="submit" 
            className="p-3 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors"
            disabled={!inputMessage.trim()}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default function NewLandingPage() {
  const handleEmailSubmit = async (email: string) => {
    try {
      // Send email to backend API using our subscription API utility
      const result = await subscribeEmail(email);
      console.log('Email submission response:', result);

      // You could add a toast notification here if desired
      if (!result.success) {
        console.error('Failed to subscribe:', result.message);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  return (
    <Layout>
      {/* Hero Section with Chat */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                The Future of <br /> Sentiment-Based Trading
              </h1>
              <p className="text-lg text-text-secondary mb-6">
                Vibe Trading is an innovative algorithmic trading platform that analyzes market sentiment to find the best opportunities. Currently in development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="bg-card/30 backdrop-blur-sm rounded-full px-4 py-2 border border-accent/10 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs">AS</div>
                    <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center text-xs">JL</div>
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs">PK</div>
                  </div>
                  <span className="text-sm text-text-secondary">Join 120+ early adopters</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <ChatInterface onEmailSubmit={handleEmailSubmit} />
            </div>
          </div>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="container mx-auto px-4 py-16 bg-card/5">
        <div className="max-w-[1100px] mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Vibe Trading?</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Our platform combines advanced algorithms with sentiment analysis to help you make better trading decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
          {[
            {
              title: "Sentiment Analysis",
              description: "Analyze market sentiment from social media, news, and other sources to identify trading opportunities.",
              icon: "📊"
            },
            {
              title: "Algorithmic Strategies",
              description: "Leverage pre-built trading strategies or create your own based on sentiment indicators.",
              icon: "🤖"
            },
            {
              title: "Real-time Alerts",
              description: "Get notified when market sentiment changes align with your trading parameters.",
              icon: "🔔"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-accent/10 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-12 border-t border-accent/10">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="font-bold text-xl">Vibe Trading</span>
            <span className="ml-2 bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
              Beta
            </span>
          </div>
          <div className="text-text-secondary text-sm">
            © {new Date().getFullYear()} Vibe Trading. All rights reserved.
          </div>
        </div>
      </div>
    </Layout>
  );
}