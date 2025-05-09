import { useState, useRef, useEffect } from 'react'
import { useAuthState } from '../hooks/useAuthState'
import Sidebar from '../components/Sidebar'
import ChatHeader from '../components/ChatHeader'
import MessageBubble from '../components/MessageBubble'
import TypingDots from '../components/TypingDots'
import PayModal from '../components/PayModal'

// Chat templates based on user status
const STATUS_MESSAGES = {
  guest: "Still collecting historical moon-phase data. 💫\nLeave your e-mail or grab an Early-Bird pass to get first access!",
  waitlist: "Thanks for joining our waitlist! You'll be among the first to access our full features once they're ready.\nUpgrade to Early-Bird for immediate access.",
  paid: "Welcome to Vibe Trading! I'm your AI trading assistant. How can I help you today?"
};

// Sample conversation for demo
const SAMPLE_MESSAGES = [
  { role: 'user', content: 'buy the dip on BTC if the moon looks right' },
  { role: 'assistant', content: "I'll help you create a strategy based on your idea. Here's a simple pseudocode:\n\n```python\ndef moon_based_btc_strategy(btc_price, moon_phase):\n    # Check if moon is in the right phase (e.g., new moon)\n    if moon_phase == 'new' or moon_phase == 'waxing_crescent':\n        # Check if BTC is in a dip (e.g., below 5-day moving average)\n        if btc_price < calculate_moving_average(btc_price_history, days=5):\n            # Buy signal\n            return 'BUY'\n    \n    # No signal\n    return 'HOLD'\n```\n\nThis is just a starting point. We would need to define what 'the moon looks right' means in more specific terms and how to detect a 'dip' in BTC price." },
];

export default function ChatShell() {
  const { status } = useAuthState();
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
      // Add assistant response based on status
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: STATUS_MESSAGES[status] 
      }]);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages(SAMPLE_MESSAGES);
  };

  return (
    <div className="flex h-screen bg-base text-text-primary">
      {/* Sidebar */}
      <Sidebar onNewChat={handleNewChat} />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <ChatHeader title="New Chat" />

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto">
            {/* Message bubbles */}
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
                    Vibe Trading Bot
                  </div>
                  <TypingDots />
                </div>
              )}

              {/* Status message for non-paid users */}
              {!isTyping && status !== 'paid' && messages.length > 0 && messages[messages.length - 1].role !== 'assistant' && (
                <MessageBubble 
                  role="assistant" 
                  content={STATUS_MESSAGES[status]} 
                />
              )}
            </div>

            {/* Invisible element for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-[#262626] p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 bg-base rounded-md border border-[#262626] overflow-hidden">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your trading idea..."
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
                className="btn p-3"
                disabled={!inputMessage.trim()}
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayModal && (
        <PayModal onClose={() => setShowPayModal(false)} />
      )}
    </div>
  );
}
