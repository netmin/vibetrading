import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ChatItem {
  id: string;
  title: string;
}

interface SidebarProps {
  onNewChat?: () => void;
}

export default function Sidebar({ onNewChat }: SidebarProps) {
  const [recentChats] = useState<ChatItem[]>([
    { id: '1', title: 'BTC Strategy' },
    { id: '2', title: 'ETH Analysis' },
    { id: '3', title: 'Market Overview' },
  ]);

  return (
    <aside className="h-full flex flex-col items-center bg-[#131313] border-r border-[#262626] py-4 w-20">
      {/* New Chat Button */}
      <button 
        onClick={onNewChat}
        className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#262626] text-text-primary mb-8 transition-colors group relative"
        aria-label="New Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        
        {/* Tooltip */}
        <span className="absolute left-full ml-2 px-2 py-1 bg-card text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          New Chat
        </span>
      </button>
      
      {/* Recent Chats */}
      <div className="flex-grow flex flex-col items-center gap-4">
        {recentChats.map((chat) => (
          <Link
            key={chat.id}
            to={`/chat/${chat.id}`}
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#262626] text-text-primary transition-colors group relative"
            aria-label={`Chat: ${chat.title}`}
          >
            <div className="w-full h-full flex items-center justify-center">
              {chat.title.charAt(0)}
            </div>
            
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-2 py-1 bg-card text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {chat.title}
            </span>
          </Link>
        ))}
      </div>
      
      {/* Settings Button */}
      <button 
        className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#262626] text-text-primary mt-4 transition-colors group relative"
        aria-label="Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        
        {/* Tooltip */}
        <span className="absolute left-full ml-2 px-2 py-1 bg-card text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Settings
        </span>
      </button>
    </aside>
  );
}