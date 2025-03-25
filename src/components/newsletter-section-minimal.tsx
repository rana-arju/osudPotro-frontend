"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter } from "@/services/newsletter"

export default function NewsletterSectionMinimal() {
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
    <section className="w-full py-16 bg-primary/5">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground">
            Get the latest health tips and exclusive offers delivered to your inbox.
          </p>
        </div>

        <form action={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                placeholder="Your email address"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <MinimalSubmitButton />
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex items-center gap-2 text-sm p-2 mt-3 rounded-md ${
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

          <p className="text-xs text-center text-muted-foreground mt-4">
            By subscribing, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </div>
    </section>
  )
}

function MinimalSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
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

