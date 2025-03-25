"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Send, CheckCircle, AlertCircle, Bell, Gift, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { subscribeToNewsletter } from "@/services/newsletter"

export default function NewsletterSection() {
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
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Background"
          fill
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Bell className="h-4 w-4 mr-2" />
            Stay Updated
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get the latest health tips, medicine updates, and exclusive offers delivered straight to your inbox.
          </p>
        </div>

        <div className="max-w-xl mx-auto relative">
          <div className="bg-background/80 backdrop-blur-sm border rounded-xl p-6 md:p-8 shadow-lg">
            <form action={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                <div className="sm:col-span-3">
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
                </div>

                <div className="sm:col-span-3">
                  <SubmitButton />
                </div>
              </div>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-center gap-2 text-sm p-3 rounded-md ${
                      result.success
                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    }`}
                  >
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <span>{result.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-xs text-muted-foreground text-center">
                By subscribing, you agree to our{" "}
                <a href="/privacy-policy" className="underline hover:text-primary">
                  Privacy Policy
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="bg-background/60 backdrop-blur-sm border rounded-lg p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Health Updates</h3>
              <p className="text-sm text-muted-foreground">
                Get the latest health tips and medical advice from experts.
              </p>
            </div>
          </div>

          <div className="bg-background/60 backdrop-blur-sm border rounded-lg p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Exclusive Offers</h3>
              <p className="text-sm text-muted-foreground">
                Receive special discounts and promotions available only to subscribers.
              </p>
            </div>
          </div>

          <div className="bg-background/60 backdrop-blur-sm border rounded-lg p-5 flex items-start gap-4 sm:col-span-2 md:col-span-1">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">New Products</h3>
              <p className="text-sm text-muted-foreground">
                Be the first to know about new medicines and healthcare products.
              </p>
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

