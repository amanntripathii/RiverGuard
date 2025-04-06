import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, MapPin, Award } from "lucide-react"

export default function ReportSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">Report Submitted!</CardTitle>
            <CardDescription>Thank you for helping protect our rivers</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Your pollution report has been successfully submitted and will be reviewed by our team.</p>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium flex items-center justify-center gap-1 mb-2">
                <Award className="h-4 w-4 text-primary" />
                <span>Rewards Earned</span>
              </h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Report Points:</span>
                <span className="font-medium">+50 points</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Photo Bonus:</span>
                <span className="font-medium">+10 points</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Location Data:</span>
                <span className="font-medium">+15 points</span>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between font-medium">
                <span>Total:</span>
                <span className="text-primary">+75 points</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Your report will be verified and added to our database. Local authorities and environmental agencies will
              be notified if necessary.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link href="/map" className="w-full">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                View Pollution Map
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

