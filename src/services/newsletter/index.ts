"use server"

import { z } from "zod"

// Email validation schema
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})


export async function subscribeToNewsletter(formData: FormData) {
  try {
    // Extract email from form data
    const email = formData.get("email") as string

    // Validate the email
    const validatedData = newsletterSchema.parse({ email })

    // Make API request to your backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/newsletter/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to subscribe. Please try again.",
      }
    }

    return {
      success: true,
      message: "Thank you for subscribing to our newsletter!",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

