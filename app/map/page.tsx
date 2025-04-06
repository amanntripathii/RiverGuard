"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Filter, MapPin, Calendar, AlertTriangle, Droplets } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"

// Import the map component with no SSR
const MapWithNoSSR = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="bg-muted h-[500px] flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
})

// Add type definition for window.L
declare global {
  interface Window {
    L: any
  }
}

export default function MapPage() {
  const { toast } = useToast()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRiver, setSelectedRiver] = useState("all")
  const [pollutionType, setPollutionType] = useState("all")
  const [timeRange, setTimeRange] = useState("all")
  const [severityRange, setSeverityRange] = useState([1, 5])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]) // Center of India
  const [mapZoom, setMapZoom] = useState(5)
  const [selectedReport, setSelectedReport] = useState(null)

  // Mock data for pollution reports with coordinates
  const pollutionReports = [
    {
      id: 1,
      river: "Yamuna",
      location: "Near Wazirabad Barrage, Delhi",
      coordinates: [28.7158, 77.2309],
      type: "industrial",
      severity: 4,
      date: "2023-04-15",
      verified: true,
      description: "Heavy industrial discharge with chemical smell and discoloration",
      reportedBy: "Rahul S.",
    },
    {
      id: 2,
      river: "Ganga",
      location: "Downstream from Kanpur",
      coordinates: [26.4499, 80.3319],
      type: "sewage",
      severity: 3,
      date: "2023-04-10",
      verified: true,
      description: "Untreated sewage discharge causing foam formation",
      reportedBy: "Priya M.",
    },
    {
      id: 3,
      river: "Sabarmati",
      location: "Industrial area, Ahmedabad",
      coordinates: [23.0225, 72.5714],
      type: "chemical",
      severity: 5,
      date: "2023-04-05",
      verified: false,
      description: "Severe chemical pollution with dead fish visible",
      reportedBy: "Amit P.",
    },
    {
      id: 4,
      river: "Godavari",
      location: "Near Nashik",
      coordinates: [19.9975, 73.7898],
      type: "plastic",
      severity: 2,
      date: "2023-04-20",
      verified: true,
      description: "Plastic waste accumulation along the riverbank",
      reportedBy: "Sneha K.",
    },
    {
      id: 5,
      river: "Brahmaputra",
      location: "Guwahati",
      coordinates: [26.1445, 91.7362],
      type: "oil",
      severity: 4,
      date: "2023-04-08",
      verified: true,
      description: "Oil spill from nearby industrial unit",
      reportedBy: "Deepak R.",
    },
  ]

  // Filter the reports based on selected filters
  const filteredReports = pollutionReports.filter((report) => {
    if (selectedRiver !== "all" && report.river !== selectedRiver) return false
    if (pollutionType !== "all" && report.type !== pollutionType) return false
    if (report.severity < severityRange[0] || report.severity > severityRange[1]) return false
    if (showVerifiedOnly && !report.verified) return false
    return true
  })

  // Get pollution type label
  const getPollutionTypeLabel = (type) => {
    const types = {
      industrial: "Industrial Waste",
      sewage: "Sewage Discharge",
      agricultural: "Agricultural Runoff",
      plastic: "Plastic Waste",
      chemical: "Chemical Pollution",
      oil: "Oil Spill",
      other: "Other",
    }
    return types[type] || type
  }

  // Get severity color
  const getSeverityColor = (severity) => {
    if (severity >= 5) return "bg-red-500"
    if (severity >= 4) return "bg-orange-500"
    if (severity >= 3) return "bg-amber-500"
    if (severity >= 2) return "bg-yellow-500"
    return "bg-green-500"
  }

  // Handle marker click
  const handleMarkerClick = (report) => {
    setSelectedReport(report)
    setMapCenter(report.coordinates)
    setMapZoom(12)
  }

  // Handle user location
  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setMapCenter([latitude, longitude])
          setMapZoom(11)
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with filters */}
        <div className="w-full md:w-80 flex-shrink-0">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Filters</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 md:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Toggle filters</span>
                </Button>
              </div>
              <CardDescription>Refine pollution reports on the map</CardDescription>
            </CardHeader>
            <CardContent className={`space-y-4 ${showFilters ? "block" : "hidden md:block"}`}>
              <div className="space-y-2">
                <Label htmlFor="river">River</Label>
                <Select value={selectedRiver} onValueChange={setSelectedRiver}>
                  <SelectTrigger id="river">
                    <SelectValue placeholder="Select river" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rivers</SelectItem>
                    <SelectItem value="Ganga">Ganga</SelectItem>
                    <SelectItem value="Yamuna">Yamuna</SelectItem>
                    <SelectItem value="Brahmaputra">Brahmaputra</SelectItem>
                    <SelectItem value="Godavari">Godavari</SelectItem>
                    <SelectItem value="Krishna">Krishna</SelectItem>
                    <SelectItem value="Narmada">Narmada</SelectItem>
                    <SelectItem value="Sabarmati">Sabarmati</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pollutionType">Pollution Type</Label>
                <Select value={pollutionType} onValueChange={setPollutionType}>
                  <SelectTrigger id="pollutionType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
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
                <Label htmlFor="timeRange">Time Period</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="timeRange">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Past Week</SelectItem>
                    <SelectItem value="month">Past Month</SelectItem>
                    <SelectItem value="year">Past Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="severityRange">Severity Level</Label>
                  <span className="text-sm text-muted-foreground">
                    {severityRange[0]} - {severityRange[1]}
                  </span>
                </div>
                <Slider
                  id="severityRange"
                  min={1}
                  max={5}
                  step={1}
                  value={severityRange}
                  onValueChange={setSeverityRange}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Minor</span>
                  <span>Severe</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch id="verified" checked={showVerifiedOnly} onCheckedChange={setShowVerifiedOnly} />
                <Label htmlFor="verified">Show verified reports only</Label>
              </div>

              <Button className="w-full mt-4">Apply Filters</Button>

              <div className="pt-2">
                <Button variant="outline" className="w-full flex items-center gap-2" onClick={handleGetUserLocation}>
                  <MapPin className="h-4 w-4" />
                  Show my location
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500"></span>
                  <span className="text-sm">Severity 5 (Critical)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-orange-500"></span>
                  <span className="text-sm">Severity 4 (High)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                  <span className="text-sm">Severity 3 (Medium)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                  <span className="text-sm">Severity 2 (Low)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="text-sm">Severity 1 (Minor)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main map area */}
        <div className="flex-grow">
          <Card className="mb-6">
            <CardContent className="p-0">
              <MapWithNoSSR
                reports={filteredReports}
                center={mapCenter}
                zoom={mapZoom}
                onMarkerClick={handleMarkerClick}
                getSeverityColor={getSeverityColor}
              />
            </CardContent>
          </Card>

          <h2 className="text-xl font-bold mb-4">
            Recent Reports {filteredReports.length > 0 && `(${filteredReports.length})`}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <Card
                  key={report.id}
                  className={`overflow-hidden cursor-pointer transition-shadow hover:shadow-md ${selectedReport?.id === report.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => handleMarkerClick(report)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-primary" />
                          {report.river} River
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {report.location}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.verified ? "default" : "outline"}>
                          {report.verified ? "Verified" : "Pending"}
                        </Badge>
                        <span className={`h-3 w-3 rounded-full ${getSeverityColor(report.severity)}`}></span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary">{getPollutionTypeLabel(report.type)}</Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </Badge>
                    </div>
                    <p className="text-sm">{report.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">Reported by: {report.reportedBy}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 bg-muted p-6 rounded-lg text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-medium mb-1">No reports found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

