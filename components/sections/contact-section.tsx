"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { User, Phone, MapPin, Mail, Globe, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  { icon: User, label: "Founder", value: "Hrishabh Patidar" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: MapPin, label: "Address", value: "Indore, India" },
  { icon: Mail, label: "Email", value: "contact@parikranti.org" },
  { icon: Globe, label: "Website", value: "www.parikranti.org" },
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  return (
    <section id="contact" className="py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-wider uppercase" style={{ color: "#E5243B" }}>
            Get In Touch
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground text-balance">Contact Us</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground">
              Ready to join the movement or partner with us? Reach out and let's create impact together.
            </p>

            <div className="space-y-4 mt-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: ["#E5243B15", "#26BDE215", "#4C9F3815", "#FCC30B15", "#DD136715"][index],
                    }}
                  >
                    <info.icon
                      className="w-5 h-5"
                      style={{
                        color: ["#E5243B", "#26BDE2", "#4C9F38", "#FCC30B", "#DD1367"][index],
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="text-sm text-foreground font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    placeholder="Your Name"
                    className="bg-background border-border focus:border-[#26BDE2] transition-colors"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {focusedField === "name" && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: "#26BDE2" }}
                    />
                  )}
                </div>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-background border-border focus:border-[#4C9F38] transition-colors"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {focusedField === "email" && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: "#4C9F38" }}
                    />
                  )}
                </div>
              </div>
              <div className="relative">
                <Input
                  placeholder="Subject"
                  className="bg-background border-border focus:border-[#FCC30B] transition-colors"
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                />
                {focusedField === "subject" && (
                  <motion.div
                    layoutId="focus-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "#FCC30B" }}
                  />
                )}
              </div>
              <div className="relative">
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  className="bg-background border-border focus:border-[#E5243B] transition-colors resize-none"
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
                {focusedField === "message" && (
                  <motion.div
                    layoutId="focus-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: "#E5243B" }}
                  />
                )}
              </div>
              <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90 group">
                Send Message
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
