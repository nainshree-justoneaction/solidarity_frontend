"use client"

import { motion } from "framer-motion"

const sdgColors = [
  "#E5243B",
  "#DDA63A",
  "#4C9F38",
  "#C5192D",
  "#FF3A21",
  "#26BDE2",
  "#FCC30B",
  "#A21942",
  "#FD6925",
  "#DD1367",
  "#FD9D24",
  "#BF8B2E",
  "#3F7E44",
  "#0A97D9",
  "#56C02B",
  "#00689D",
  "#19486A",
]

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SDG color bar */}
        <div className="flex h-1 rounded-full overflow-hidden mb-8">
          {sdgColors.map((color, index) => (
            <motion.div
              key={index}
              className="flex-1"
              style={{ backgroundColor: color }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <a href="#" className="text-xl font-bold tracking-tight">
              <span className="text-foreground">Just </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #E5243B, #FCC30B, #4C9F38, #26BDE2)",
                }}
              >
                OneAction
              </span>
            </a>
            <p className="mt-2 text-sm text-muted-foreground">A Parikranti Foundation Initiative</p>
          </div>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#movement" className="hover:text-foreground transition-colors">
              Movement
            </a>
            <a href="#impact" className="hover:text-foreground transition-colors">
              Impact
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Parikranti Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
