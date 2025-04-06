import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Calendar, Users, BarChart3, FileText } from "lucide-react"
import Link from "next/link"

export default function SchemesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Government Schemes</h1>
        <p className="text-muted-foreground mb-8">
          Learn about and participate in government initiatives for river rejuvenation
        </p>

        <Tabs defaultValue="national" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="national">National Schemes</TabsTrigger>
            <TabsTrigger value="state">State Schemes</TabsTrigger>
            <TabsTrigger value="local">Local Initiatives</TabsTrigger>
          </TabsList>

          <TabsContent value="national">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Namami Gange Programme</CardTitle>
                      <CardDescription>Integrated Conservation Mission for the Ganga River</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">Timeline</span>
                      </div>
                      <p className="text-sm text-muted-foreground">2014 - Present</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">Implementing Agency</span>
                      </div>
                      <p className="text-sm text-muted-foreground">National Mission for Clean Ganga</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Budget</span>
                      </div>
                      <p className="text-sm text-muted-foreground">₹20,000 Crore</p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-2">About the Programme</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Namami Gange Programme is an integrated conservation mission, approved as a 'Flagship Programme' by
                    the Union Government in June 2014 with a budget outlay of ₹20,000 Crore to accomplish the twin
                    objectives of effective abatement of pollution, conservation and rejuvenation of the Ganga river.
                  </p>

                  <h3 className="font-medium mb-2">Key Components</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mb-4">
                    <li>Sewerage Treatment Infrastructure</li>
                    <li>River-Front Development</li>
                    <li>River-Surface Cleaning</li>
                    <li>Bio-Diversity Conservation</li>
                    <li>Afforestation</li>
                    <li>Public Awareness</li>
                    <li>Industrial Effluent Monitoring</li>
                  </ul>

                  <h3 className="font-medium mb-2">How You Can Participate</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Join Ganga Vichar Manch - an online platform for public participation</li>
                    <li>Participate in Ganga Utsav and other awareness events</li>
                    <li>Volunteer for Ganga Task Force</li>
                    <li>Report pollution incidents through the RiverGuard app</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Download Guidelines
                  </Button>
                  <Link href="https://nmcg.nic.in/" target="_blank" rel="noopener noreferrer">
                    <Button className="flex items-center gap-2">
                      Visit Official Website
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">National River Conservation Plan</CardTitle>
                      <CardDescription>Pollution abatement of rivers across India</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">Timeline</span>
                      </div>
                      <p className="text-sm text-muted-foreground">1995 - Present</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">Implementing Agency</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ministry of Environment, Forest and Climate Change
                      </p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Coverage</span>
                      </div>
                      <p className="text-sm text-muted-foreground">34 Rivers in 16 States</p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-2">About the Programme</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The National River Conservation Plan (NRCP) is a centrally sponsored scheme aimed at pollution
                    abatement of rivers across the country. The objective is to improve the water quality of major
                    rivers through implementation of various pollution abatement works.
                  </p>

                  <h3 className="font-medium mb-2">Key Components</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Interception and diversion of sewage</li>
                    <li>Sewage treatment plants</li>
                    <li>Low cost sanitation works</li>
                    <li>Electric/improved wood crematoria</li>
                    <li>River front development</li>
                    <li>Public participation & awareness</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Download Guidelines
                  </Button>
                  <Link
                    href="https://moef.gov.in/en/division/water-quality-management/national-river-conservation-plan/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="flex items-center gap-2">
                      Visit Official Website
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="state">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Yamuna Action Plan (Delhi)</CardTitle>
                      <CardDescription>Restoration of Yamuna River in Delhi NCR</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">Timeline</span>
                      </div>
                      <p className="text-sm text-muted-foreground">1993 - Present (Phase III ongoing)</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">Implementing Agency</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Delhi Jal Board</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Focus Area</span>
                      </div>
                      <p className="text-sm text-muted-foreground">22 km stretch in Delhi</p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-2">About the Programme</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The Yamuna Action Plan (YAP) is a bilateral project between the Government of India and Japan, aimed
                    at improving the water quality of the Yamuna River and its tributaries. The project focuses on the
                    22 km stretch of the Yamuna in Delhi, which is considered the most polluted.
                  </p>

                  <h3 className="font-medium mb-2">Current Initiatives</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Construction of new sewage treatment plants</li>
                    <li>Rehabilitation of existing treatment infrastructure</li>
                    <li>Interceptor sewers along major drains</li>
                    <li>Development of riverfront and biodiversity parks</li>
                    <li>Community toilets and public awareness campaigns</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Download Project Report
                  </Button>
                  <Link href="https://delhijalboard.nic.in/" target="_blank" rel="noopener noreferrer">
                    <Button className="flex items-center gap-2">
                      Visit Official Website
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Maharashtra River Restoration Program</CardTitle>
                      <CardDescription>Comprehensive river restoration in Maharashtra</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">Timeline</span>
                      </div>
                      <p className="text-sm text-muted-foreground">2018 - Present</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">Implementing Agency</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Maharashtra Water Resources Department</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Rivers Covered</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Mithi, Godavari, Krishna, Tapi</p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-2">About the Programme</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The Maharashtra River Restoration Program is a state initiative to restore and rejuvenate major
                    rivers flowing through the state. The program adopts a comprehensive approach to river management,
                    including pollution control, biodiversity conservation, and sustainable water use.
                  </p>

                  <h3 className="font-medium mb-2">Key Features</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>River pollution monitoring and control</li>
                    <li>Riverbank stabilization and afforestation</li>
                    <li>Sustainable water management practices</li>
                    <li>Community participation in river conservation</li>
                    <li>Urban river management in metropolitan areas</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Download Guidelines
                  </Button>
                  <Link href="https://wrd.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer">
                    <Button className="flex items-center gap-2">
                      Visit Official Website
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="local">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Mula-Mutha River Cleanup (Pune)</CardTitle>
                      <CardDescription>Community-led initiative for Pune's rivers</CardDescription>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">Timeline</span>
                      </div>
                      <p className="text-sm text-muted-foreground">2017 - Present</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">Implementing Agency</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Pune Municipal Corporation & NGOs</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Volunteer Participation</span>
                      </div>
                      <p className="text-sm text-muted-foreground">5,000+ citizens</p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-2">About the Initiative</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The Mula-Mutha River Cleanup is a collaborative initiative between the Pune Municipal Corporation,
                    local NGOs, and citizen volunteers to restore the health of Pune's rivers. The project focuses on
                    regular cleanup drives, awareness campaigns, and sustainable river management practices.
                  </p>

                  <h3 className="font-medium mb-2">Activities</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Weekly river cleanup drives</li>
                    <li>Riverbank plantation and maintenance</li>
                    <li>Water quality monitoring by citizen scientists</li>
                    <li>Educational workshops in schools and colleges</li>
                    <li>Advocacy for improved sewage treatment</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Download Volunteer Guide
                  </Button>
                  <Link href="/volunteer/local">
                    <Button className="flex items-center gap-2">
                      Join as Volunteer
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Sabarmati Riverfront Development (Ahmedabad)</CardTitle>
                      <CardDescription>Urban river restoration and development</CardDescription>
                    </div>
                    <Badge>Ongoing</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">Timeline</span>
                      </div>
                      <p className="text-sm text-muted-foreground">2005 - Present</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-medium">Implementing Agency</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Sabarmati Riverfront Development Corporation</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Project Area</span>
                      </div>
                      <p className="text-sm text-muted-foreground">11.5 km stretch</p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-2">About the Project</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The Sabarmati Riverfront Development project is an urban rejuvenation initiative that has
                    transformed the Sabarmati River in Ahmedabad. The project includes environmental improvement, social
                    infrastructure, and sustainable development along the riverfront.
                  </p>

                  <h3 className="font-medium mb-2">Key Features</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Two-level promenades on both banks</li>
                    <li>Water retention and management system</li>
                    <li>Sewage diversion and treatment infrastructure</li>
                    <li>Public parks, gardens, and recreational spaces</li>
                    <li>Cultural and educational facilities</li>
                    <li>Sustainable urban development model</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Download Project Brief
                  </Button>
                  <Link href="https://sabarmatiriverfront.com/" target="_blank" rel="noopener noreferrer">
                    <Button className="flex items-center gap-2">
                      Visit Official Website
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Get Involved</h2>
          <p className="mb-4">
            There are many ways you can participate in government schemes and initiatives for river conservation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Report Pollution</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Use the RiverGuard app to report pollution incidents directly to authorities and contribute to the
                national database of river pollution.
              </CardContent>
              <CardFooter>
                <Link href="/report">
                  <Button variant="outline" size="sm">
                    Report Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Join Cleanup Events</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Participate in organized cleanup drives and community events to directly contribute to river
                conservation efforts.
              </CardContent>
              <CardFooter>
                <Link href="/events">
                  <Button variant="outline" size="sm">
                    Find Events
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Volunteer as Monitor</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Become a citizen scientist and help monitor water quality, biodiversity, and pollution levels in your
                local rivers.
              </CardContent>
              <CardFooter>
                <Link href="/volunteer">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Spread Awareness</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Educate others about river conservation through social media, community workshops, and educational
                programs.
              </CardContent>
              <CardFooter>
                <Link href="/resources">
                  <Button variant="outline" size="sm">
                    Get Resources
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

