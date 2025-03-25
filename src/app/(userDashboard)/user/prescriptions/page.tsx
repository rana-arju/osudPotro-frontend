import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Download, Eye } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "OsudPotro - My Prescriptions",
  description: "Manage your medical prescriptions",
}

export default function PrescriptionsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">My Prescriptions</h1>

      <Card>
        <CardHeader>
          <CardTitle>Saved Prescriptions</CardTitle>
          <CardDescription>Manage your saved prescriptions for faster ordering.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prescription 1 */}
            <Card>
              <CardContent className="p-4">
                <div className="aspect-[4/3] relative rounded-md overflow-hidden mb-3 bg-muted">
                  <Image src="/placeholder.svg?height=300&width=400" alt="Prescription" fill className="object-cover" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Prescription #1</h3>
                    <p className="text-sm text-muted-foreground">Uploaded on 15 May 2023</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prescription 2 */}
            <Card>
              <CardContent className="p-4">
                <div className="aspect-[4/3] relative rounded-md overflow-hidden mb-3 bg-muted">
                  <Image src="/placeholder.svg?height=300&width=400" alt="Prescription" fill className="object-cover" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Prescription #2</h3>
                    <p className="text-sm text-muted-foreground">Uploaded on 3 June 2023</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" size="lg">
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload New Prescription
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

