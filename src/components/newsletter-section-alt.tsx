"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Send, CheckCircle, AlertCircle, ShieldCheck, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { subscribeToNewsletter } from "@/services/newsletter"

export default function NewsletterSectionAlt() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<{ success?: boolean; message?: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setResult(null) // Reset result state
    const response = await subscribeToNewsletter(formData)
    setResult(response)

    if (response.success) {
      setEmail("") // Clear input on success
    }
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="custom-container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4">
            <div className="inline-block">
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Newsletter
              </Badge>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stay Informed About Health & Medicine
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[600px]">
              Join our newsletter and get the latest health tips, medicine updates, and exclusive offers delivered
              directly to your inbox.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-2">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Health Tips</h3>
                  <p className="text-sm text-muted-foreground">Expert advice for a healthier lifestyle</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Medicine Updates</h3>
                  <p className="text-sm text-muted-foreground">Latest information on medications</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Exclusive Offers</h3>
                  <p className="text-sm text-muted-foreground">Special discounts for subscribers</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Seasonal Advice</h3>
                  <p className="text-sm text-muted-foreground">Timely health guidance for each season</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:ml-auto">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-primary/5 blur-3xl opacity-70" />
              <div className="relative rounded-xl border bg-background/80 backdrop-blur-sm p-6 md:p-8 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Subscribe to Our Newsletter</h3>
                </div>

                <form action={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <AnimatePresence>
                      {result && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`flex items-center gap-2 text-sm p-2 rounded-md ${
                            result.success
                              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          }`}
                        >
                          {result.success ? (
                            <CheckCircle className="h-4 w-4 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          )}
                          <span>{result.message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <SubmitButton />

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                    <Clock className="h-3.5 w-3.5" />
                    <span>We send newsletters twice a month. No spam.</span>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    By subscribing, you agree to our{" "}
                    <a href="/privacy-policy" className="underline hover:text-primary">
                      Privacy Policy
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Subscribing...
        </>
      ) : (
        <>
          Subscribe <Send className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  )
}

