"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Clock, Calendar, BarChart3, FileText, Info, Droplets } from "lucide-react"
import Image from "next/image"

export default function HistoryPage() {
  const [selectedRiver, setSelectedRiver] = useState("ganga")
  const [timelineYear, setTimelineYear] = useState(2020)

  // Mock data for river history
  const riverData = {
    ganga: {
      name: "Ganga",
      description:
        "The Ganges is a trans-boundary river of Asia which flows through India and Bangladesh. The 2,525 km river rises in the western Himalayas in the Indian state of Uttarakhand.",
      historicalSignificance:
        "The Ganges is a sacred river to Hindus and has been so since the dawn of their civilization. It has been mentioned in the Rigveda, the earliest of the Hindu scriptures, which was composed between 1500 and 1200 BCE.",
      pollutionHistory: [
        { year: 1970, level: "Low", description: "Limited industrial activity, primarily religious and domestic use" },
        { year: 1985, level: "Moderate", description: "Increasing industrial discharge and urban sewage" },
        {
          year: 2000,
          level: "High",
          description: "Severe pollution from industrial waste, sewage, and religious activities",
        },
        { year: 2015, level: "Very High", description: "Critical levels of pollution despite cleanup efforts" },
        { year: 2020, level: "High", description: "Some improvement due to Namami Gange Programme" },
      ],
      waterQualityData: {
        1970: { pH: 7.5, BOD: 1.5, DO: 8.5, coliform: 500 },
        1985: { pH: 7.3, BOD: 3.2, DO: 7.1, coliform: 5000 },
        2000: { pH: 6.8, BOD: 5.7, DO: 5.3, coliform: 15000 },
        2015: { pH: 6.5, BOD: 7.2, DO: 4.1, coliform: 22000 },
        2020: { pH: 6.9, BOD: 4.8, DO: 5.8, coliform: 12000 },
      },
      conservationEfforts: [
        { year: 1985, name: "Ganga Action Plan Phase I", impact: "Limited" },
        { year: 1993, name: "Ganga Action Plan Phase II", impact: "Moderate" },
        { year: 2014, name: "Namami Gange Programme", impact: "Significant" },
      ],
    },
    yamuna: {
      name: "Yamuna",
      description:
        "The Yamuna is the second largest tributary river of the Ganges and the longest tributary in India. Originating from the Yamunotri Glacier in the Himalayas, it flows through several states in North India.",
      historicalSignificance:
        "The Yamuna is closely linked to the Hindu deity Krishna and has been mentioned in ancient Indian texts. The river has played a crucial role in the development of the Indo-Gangetic civilization.",
      pollutionHistory: [
        { year: 1970, level: "Low", description: "Relatively clean with limited urban impact" },
        { year: 1985, level: "Moderate", description: "Growing pollution from Delhi's expansion" },
        {
          year: 2000,
          level: "Very High",
          description: "Severe pollution in Delhi stretch, classified as 'dead river'",
        },
        { year: 2015, level: "Critical", description: "One of the most polluted rivers in the world" },
        { year: 2020, level: "Very High", description: "Slight improvement in some stretches" },
      ],
      waterQualityData: {
        1970: { pH: 7.6, BOD: 1.2, DO: 8.8, coliform: 600 },
        1985: { pH: 7.2, BOD: 4.5, DO: 6.2, coliform: 8000 },
        2000: { pH: 6.5, BOD: 11.3, DO: 2.1, coliform: 100000 },
        2015: { pH: 6.3, BOD: 16.8, DO: 0.5, coliform: 160000 },
        2020: { pH: 6.7, BOD: 9.6, DO: 2.8, coliform: 80000 },
      },
      conservationEfforts: [
        { year: 1993, name: "Yamuna Action Plan Phase I", impact: "Limited" },
        { year: 2004, name: "Yamuna Action Plan Phase II", impact: "Limited" },
        { year: 2013, name: "Yamuna Action Plan Phase III", impact: "Moderate" },
        { year: 2018, name: "Delhi Yamuna Rejuvenation Project", impact: "Ongoing" },
      ],
    },
  }

  const currentRiver = riverData[selectedRiver]

  // Get water quality data for the selected year or closest available year
  const getWaterQualityForYear = (year) => {
    const availableYears = Object.keys(currentRiver.waterQualityData).map(Number)
    const closestYear = availableYears.reduce((prev, curr) => {
      return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
    })
    return {
      data: currentRiver.waterQualityData[closestYear],
      year: closestYear,
    }
  }

  const waterQuality = getWaterQualityForYear(timelineYear)

  // Get pollution level for the selected year or closest available year
  const getPollutionForYear = (year) => {
    return currentRiver.pollutionHistory.reduce((prev, curr) => {
      return Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev
    })
  }

  const pollutionData = getPollutionForYear(timelineYear)

  // Get conservation efforts before or during the selected year
  const getConservationEffortsBeforeYear = (year) => {
    return currentRiver.conservationEfforts.filter((effort) => effort.year <= year)
  }

  const relevantConservationEfforts = getConservationEffortsBeforeYear(timelineYear)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">River History Explorer</h1>
        <p className="text-muted-foreground mb-8">
          Discover the historical journey of India's rivers and their transformation over time
        </p>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-64">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="river-select">Select River</Label>
                <Select value={selectedRiver} onValueChange={setSelectedRiver}>
                  <SelectTrigger id="river-select">
                    <SelectValue placeholder="Select a river" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ganga">Ganga</SelectItem>
                    <SelectItem value="yamuna">Yamuna</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="timeline">Timeline</Label>
                  <span className="text-sm text-muted-foreground">{timelineYear}</span>
                </div>
                <Slider
                  id="timeline"
                  min={1970}
                  max={2023}
                  step={1}
                  value={[timelineYear]}
                  onValueChange={(value) => setTimelineYear(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1970</span>
                  <span>2000</span>
                  <span>2023</span>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Key Events</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  {relevantConservationEfforts.map((effort, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">
                        {effort.year}
                      </Badge>
                      <div>
                        <p className="font-medium">{effort.name}</p>
                        <p className="text-xs text-muted-foreground">Impact: {effort.impact}</p>
                      </div>
                    </div>
                  ))}
                  {relevantConservationEfforts.length === 0 && (
                    <p className="text-muted-foreground">
                      No major conservation efforts recorded before {timelineYear}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex-grow">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-primary" />
                      {currentRiver.name} River
                    </CardTitle>
                    <CardDescription>Historical overview and transformation</CardDescription>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Viewing: {timelineYear}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt={`${currentRiver.name} River`}
                    fill
                    className="object-cover"
                  />
                </div>

                <Tabs defaultValue="overview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="pollution">Pollution History</TabsTrigger>
                    <TabsTrigger value="quality">Water Quality</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">About {currentRiver.name} River</h3>
                        <p className="text-sm text-muted-foreground">{currentRiver.description}</p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Historical Significance</h3>
                        <p className="text-sm text-muted-foreground">{currentRiver.historicalSignificance}</p>
                      </div>

                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <Info className="h-4 w-4 text-primary" />
                          River Status in {timelineYear}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Pollution Level:</p>
                            <p className="text-sm text-muted-foreground">{pollutionData.level}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Primary Concerns:</p>
                            <p className="text-sm text-muted-foreground">{pollutionData.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pollution">
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-3">Pollution Timeline</h3>
                        <div className="space-y-4">
                          {currentRiver.pollutionHistory.map((item, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border ${item.year === pollutionData.year ? "border-primary bg-primary/5" : "border-transparent"}`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">{item.year}</span>
                                <Badge
                                  variant={item.level === "Low" ? "outline" : "default"}
                                  className={
                                    item.level === "Critical"
                                      ? "bg-red-500"
                                      : item.level === "Very High"
                                        ? "bg-orange-500"
                                        : item.level === "High"
                                          ? "bg-amber-500"
                                          : item.level === "Moderate"
                                            ? "bg-yellow-500"
                                            : "bg-green-500"
                                  }
                                >
                                  {item.level}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Major Pollution Sources in {timelineYear}</h3>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          {timelineYear >= 2000 ? (
                            <>
                              <li>Industrial effluents from factories along the riverbank</li>
                              <li>Untreated sewage from urban areas</li>
                              <li>Agricultural runoff containing pesticides and fertilizers</li>
                              <li>Religious activities and improper disposal of offerings</li>
                              <li>Solid waste dumping</li>
                            </>
                          ) : timelineYear >= 1985 ? (
                            <>
                              <li>Growing industrial discharge</li>
                              <li>Increasing urban sewage</li>
                              <li>Agricultural runoff</li>
                              <li>Limited waste management infrastructure</li>
                            </>
                          ) : (
                            <>
                              <li>Limited industrial activity</li>
                              <li>Small-scale urban sewage</li>
                              <li>Traditional activities along the riverbank</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="quality">
                    <div className="space-y-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">Water Quality Parameters</h3>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Data from {waterQuality.year}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-background p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1">pH Level</p>
                            <p className="text-2xl font-bold">{waterQuality.data.pH}</p>
                            <p className="text-xs text-muted-foreground">
                              {waterQuality.data.pH < 6.5
                                ? "Acidic - Below safe levels"
                                : waterQuality.data.pH > 8.5
                                  ? "Alkaline - Above safe levels"
                                  : "Within safe range (6.5-8.5)"}
                            </p>
                          </div>

                          <div className="bg-background p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1">Dissolved Oxygen (DO)</p>
                            <p className="text-2xl font-bold">{waterQuality.data.DO} mg/L</p>
                            <p className="text-xs text-muted-foreground">
                              {waterQuality.data.DO < 4
                                ? "Poor - Below safe levels"
                                : waterQuality.data.DO < 6
                                  ? "Fair - Moderate levels"
                                  : "Good - Healthy levels"}
                            </p>
                          </div>

                          <div className="bg-background p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1">Biochemical Oxygen Demand (BOD)</p>
                            <p className="text-2xl font-bold">{waterQuality.data.BOD} mg/L</p>
                            <p className="text-xs text-muted-foreground">
                              {waterQuality.data.BOD > 5
                                ? "High pollution levels"
                                : waterQuality.data.BOD > 3
                                  ? "Moderate pollution"
                                  : "Low pollution levels"}
                            </p>
                          </div>

                          <div className="bg-background p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1">Fecal Coliform</p>
                            <p className="text-2xl font-bold">
                              {waterQuality.data.coliform.toLocaleString()} MPN/100ml
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {waterQuality.data.coliform > 10000
                                ? "Severely contaminated"
                                : waterQuality.data.coliform > 2500
                                  ? "Highly contaminated"
                                  : waterQuality.data.coliform > 500
                                    ? "Contaminated"
                                    : "Relatively clean"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Water Quality Interpretation</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {waterQuality.data.BOD > 5 && waterQuality.data.DO < 4
                            ? `In ${waterQuality.year}, the ${currentRiver.name} River showed significant pollution with high BOD (${waterQuality.data.BOD} mg/L) and low dissolved oxygen (${waterQuality.data.DO} mg/L). The high fecal coliform count (${waterQuality.data.coliform.toLocaleString()} MPN/100ml) indicates severe sewage contamination, making the water unsafe for bathing or drinking.`
                            : waterQuality.data.BOD > 3 && waterQuality.data.DO < 6
                              ? `In ${waterQuality.year}, the ${currentRiver.name} River showed moderate pollution levels with BOD at ${waterQuality.data.BOD} mg/L and dissolved oxygen at ${waterQuality.data.DO} mg/L. The fecal coliform count of ${waterQuality.data.coliform.toLocaleString()} MPN/100ml indicates contamination from sewage discharge.`
                              : `In ${waterQuality.year}, the ${currentRiver.name} River was relatively clean with low BOD (${waterQuality.data.BOD} mg/L) and healthy dissolved oxygen levels (${waterQuality.data.DO} mg/L). The fecal coliform count was ${waterQuality.data.coliform.toLocaleString()} MPN/100ml, indicating minimal sewage contamination.`}
                        </p>

                        <div className="bg-muted p-3 rounded-lg">
                          <h4 className="text-sm font-medium mb-1">Water Classification (Based on CPCB Standards)</h4>
                          <p className="text-sm">
                            {waterQuality.data.BOD <= 2 && waterQuality.data.DO >= 6
                              ? "Class A: Drinking water source without conventional treatment but after disinfection"
                              : waterQuality.data.BOD <= 3 && waterQuality.data.DO >= 5
                                ? "Class B: Outdoor bathing (organized)"
                                : waterQuality.data.BOD <= 3 && waterQuality.data.DO >= 4
                                  ? "Class C: Drinking water source after conventional treatment and disinfection"
                                  : waterQuality.data.BOD <= 6 && waterQuality.data.DO >= 4
                                    ? "Class D: Propagation of wildlife and fisheries"
                                    : "Class E: Irrigation, industrial cooling, controlled waste disposal"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Historical Resources</h2>
          <p className="mb-6">
            Explore additional resources to learn more about the historical aspects of India's rivers and their cultural
            significance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Historical Archives</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Access historical photographs, documents, and records related to India's rivers from colonial times to
                the present day.
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Browse Archives
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Research Papers</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Read academic research and scientific studies on the historical ecology, pollution trends, and
                conservation efforts for Indian rivers.
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  View Research
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Cultural Heritage</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Discover the rich cultural and religious significance of rivers in Indian history, literature, art, and
                traditions.
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Explore Heritage
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

