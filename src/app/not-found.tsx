import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pill, Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="relative mb-8">
        <Pill className="w-32 h-32 text-primary animate-pulse" />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-primary-foreground">
          404
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-4">Oops! Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        It seems this prescription has expired or never existed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Return Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/search">
            <Search className="mr-2 h-4 w-4" /> Search Products
          </Link>
        </Button>
      </div>
      <div className="text-muted-foreground">
        <p className="mb-2">Common reasons for this error:</p>
        <ul className="list-disc list-inside text-left">
          <li>The page may have been moved or deleted</li>
          <li>You might have typed the address incorrectly</li>
          <li>The link you followed may be outdated</li>
        </ul>
      </div>
      <Button variant="link" asChild className="mt-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go back to previous page
        </Link>
      </Button>
    </div>
  );
}
