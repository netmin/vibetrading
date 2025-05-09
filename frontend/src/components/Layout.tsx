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
                    <path d="M2 12C2 6.48 6.44 2 12 2C17.56 2 22 6.48 22 12C22 17.52 17.56 22 12 22C6.44 22 2 17.52 2 12Z" 
                      className="stroke-accent" strokeWidth="1.5" />
                    <path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" 
                      className="fill-accent" />
                    <path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" 
                      className="fill-accent" />
                    <path d="M8.5 17C10.25 15.5 13.75 15.5 15.5 17" 
                      className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-xl font-semibold flex items-center">
                  <span className="font-extrabold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">Vibe</span>
                  <span className="font-light">Trading</span>
                  <span className="ml-1 text-xs font-bold px-1.5 py-0.5 bg-accent/10 text-accent rounded-md">β</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <a 
            href="https://x.com/vibetrading" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent transition-colors"
            aria-label="Follow us on X (Twitter)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <Link 
            to="/discord" 
            className="text-text-primary hover:text-accent transition-colors"
            aria-label="Join our Discord community"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
          </Link>
          <a 
            href="https://github.com/vibetrading" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-primary hover:text-accent transition-colors"
            aria-label="View our GitHub repository"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
              <Link to="/discord" className="text-text/60 hover:text-accent transition-colors">
                Discord
              </Link>
              <a 
                href="https://x.com/vibetrading" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text/60 hover:text-accent transition-colors"
              >
                X
              </a>
              <a 
                href="https://github.com/vibetrading" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text/60 hover:text-accent transition-colors"
              >
                GitHub
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
