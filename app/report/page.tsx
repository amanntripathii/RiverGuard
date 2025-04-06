"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { MapPin, Upload, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    riverName: "",
    pollutionType: "",
    description: "",
    severityLevel: 3,
    images: [],
    location: null,
  })
  const [step, setStep] = useState(1)
  const [userLocation, setUserLocation] = useState(null)

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          setFormData({
            ...formData,
            location: { lat: latitude, lng: longitude },
          })
          toast({
            title: "Location detected",
            description: `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`,
          })
        },
        (error) => {
          toast({
            title: "Error getting location",
            description: error.message,
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSeverityChange = (value) => {
    setFormData({
      ...formData,
      severityLevel: value[0],
    })
  }

  const handleImageUpload = (images) => {
    setFormData({
      ...formData,
      images,
    })
  }

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      location,
    })
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your API
      // const response = await fetch('/api/reports', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Report submitted successfully!",
        description: "Thank you for contributing to cleaner rivers.",
      })

      // Redirect to success page or dashboard
      router.push("/report/success")
    } catch (error) {
      toast({
        title: "Error submitting report",
        description: error.message || "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Report River Pollution</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Help us track and address pollution by submitting a detailed report.
        </p>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className={`h-1 flex-1 ${step >= 1 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <div className={`h-1 flex-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <div className={`h-1 flex-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
            <div className={`h-1 flex-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Basic Info</span>
            <span>Location</span>
            <span>Evidence</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Pollution Details</CardTitle>
                <CardDescription>Provide basic information about the pollution you observed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="riverName">River Name</Label>
                  <Input
                    id="riverName"
                    name="riverName"
                    placeholder="Enter the name of the river"
                    value={formData.riverName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pollutionType">Type of Pollution</Label>
                  <Select
                    value={formData.pollutionType}
                    onValueChange={(value) => setFormData({ ...formData, pollutionType: value })}
                    required
                  >
                    <SelectTrigger id="pollutionType">
                      <SelectValue placeholder="Select pollution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industrial">Industrial Waste</SelectItem>
                      <SelectItem value="sewage">Sewage Discharge</SelectItem>
                      <SelectItem value="agricultural">Agricultural Runoff</SelectItem>
                      <SelectItem value="plastic">Plastic Waste</SelectItem>
                      <SelectItem value="chemical">Chemical Pollution</SelectItem>
                      <SelectItem value="oil">Oil Spill</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe what you observed (color, smell, visible effects, etc.)"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="severityLevel">Severity Level</Label>
                    <span className="text-sm text-muted-foreground">{formData.severityLevel}/5</span>
                  </div>
                  <Slider
                    id="severityLevel"
                    min={1}
                    max={5}
                    step={1}
                    value={[formData.severityLevel]}
                    onValueChange={handleSeverityChange}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Minor</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={nextStep}>
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Location Information</CardTitle>
                <CardDescription>Provide the exact location of the pollution incident</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Map will be displayed here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      (In a real implementation, this would be an interactive map component)
                    </p>
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    Use My Current Location
                  </Button>
                </div>

                {userLocation && (
                  <div className="bg-muted/50 p-3 rounded-md text-sm">
                    <p className="font-medium">Detected Location:</p>
                    <p className="text-muted-foreground">
                      Latitude: {userLocation.lat.toFixed(6)}, Longitude: {userLocation.lng.toFixed(6)}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="locationNotes">Additional Location Details (Optional)</Label>
                  <Textarea
                    id="locationNotes"
                    placeholder="Provide landmarks or directions to help locate the pollution (e.g., 'Near the old bridge', 'Downstream from the textile factory')"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button type="button" onClick={nextStep}>
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Evidence Upload</CardTitle>
                <CardDescription>Upload photos or videos of the pollution incident</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                  <div className="mx-auto flex flex-col items-center justify-center gap-1">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mt-2">Upload Evidence</h3>
                    <p className="text-sm text-muted-foreground mb-4">Drag and drop files or click to browse</p>
                    <Input type="file" id="fileUpload" className="hidden" multiple accept="image/*,video/*" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("fileUpload").click()}
                    >
                      Select Files
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Maximum file size: 10MB. Supported formats: JPG, PNG, MP4
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Important Note</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Please ensure your photos clearly show the pollution. Avoid including identifiable faces of
                        people unless you have their permission. All submissions will be reviewed before being made
                        public.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </form>
      </div>
    </div>
  )
}

