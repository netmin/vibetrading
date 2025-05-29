import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import RiskDisclosure from './RiskDisclosure'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-20 px-8 border-b border-[#262626] flex justify-between items-center">
        <Link to="/" className="relative group">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent/50 to-accent rounded-lg blur-md opacity-30 group-hover:opacity-70 transition duration-300"></div>
              <div className="relative flex items-center bg-gradient-to-r from-background to-card p-1 rounded-lg">
                <div className="w-7 h-7 flex items-center justify-center mr-2">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    {/* Circle background */}
                    <circle cx="12" cy="12" r="10" className="stroke-accent" strokeWidth="1.5" />

                    {/* Pulse wave pattern representing vibrations/sentiment */}
                    <path d="M5.5 12H7L8.5 9.5L10 14.5L12 7.5L14 16.5L15.5 11.5L17 14L18.5 12"
                      className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Central point showing focal energy */}
                    <circle cx="12" cy="12" r="1.5" className="fill-accent" />
                  </svg>
                </div>
                <div className="text-xl font-semibold flex items-center">
                  <span className="font-extrabold text-accent">Vibe</span>
                  <span className="font-light">Trading</span>
                  <span className="ml-1 text-xs font-bold px-1.5 py-0.5 bg-accent/10 text-accent rounded-md">β</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <a
            href="https://app.thevibe.trading"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-accent hover:bg-accent/80 text-white font-semibold rounded-lg transition-colors flex items-center shadow-md hover:shadow-lg"
          >
            <span>App</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="https://x.com/vibecatdev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent transition-colors"
            aria-label="Follow us on X (Twitter)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://discord.gg/SNRKrSh2wF"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent transition-colors"
            aria-label="Join our Discord community"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
          </a>
          <a
            href="https://t.me/thevibetrading"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent transition-colors"
            aria-label="Join our Telegram channel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <RiskDisclosure />

      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-text/60">
              © {new Date().getFullYear()} Vibe Trading
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://discord.gg/SNRKrSh2wF"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-accent transition-colors"
              >
                Discord
              </a>
              <a
                href="https://x.com/vibecatdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-accent transition-colors"
              >
                X
              </a>
              <a
                href="https://t.me/thevibetrading"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/60 hover:text-accent transition-colors"
              >
                Telegram
              </a>
            </div>

            <div className="text-sm">
              <a 
                href="mailto:vibetrade@proton.me" 
                className="text-text/60 hover:text-accent transition-colors"
              >
                vibetrade@proton.me
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
