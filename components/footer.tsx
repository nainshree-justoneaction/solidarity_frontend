"use client"

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Solidarity</h3>
            <p className="text-muted text-sm">
              Building careers through real opportunities and meaningful connections.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm text-white">Platform</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm text-white">Company</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4 text-sm text-white">Connect</h4>
            <div className="flex gap-4">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-white/60 hover:white-glow transition-all text-sm text-white/70 hover:text-white"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">© 2025 Solidarity. All rights reserved.</p>
          <p className="text-sm text-muted">Built for students. By people who care.</p>
        </div>
      </div>
    </footer>
  )
}
