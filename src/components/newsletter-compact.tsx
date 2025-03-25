"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter } from "@/services/newsletter"

export default function NewsletterCompact() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<{ success?: boolean; message?: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setResult(null)
    const response = await subscribeToNewsletter(formData)
    setResult(response)

    if (response.success) {
      setEmail("")
    }
  }

  return (
    <div className="w-full py-6 px-4">
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get health tips and exclusive offers directly to your inbox.
        </p>

        <form action={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                placeholder="Your email address"
                className="pl-9"
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
                  className={`flex items-center gap-2 text-xs p-2 rounded-md ${
                    result.success
                      ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="h-3 w-3 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  )}
                  <span>{result.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <CompactSubmitButton />

          <p className="text-xs text-muted-foreground text-center">
            By subscribing, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-primary">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

function CompactSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
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

