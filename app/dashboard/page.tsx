"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, Award, BarChart3, Users, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const userData = {
    name: "Priya Sharma",
    username: "priya_eco",
    avatar: "/placeholder.svg?height=100&width=100",
    points: 750,
    level: "River Guardian",
    reports: 12,
    cleanups: 5,
    badges: [
      { name: "First Report", icon: "CheckCircle", date: "Jan 15, 2023" },
      { name: "Cleanup Volunteer", icon: "Users", date: "Feb 20, 2023" },
      { name: "Data Contributor", icon: "BarChart3", date: "Mar 10, 2023" },
    ],
    nextLevel: {
      name: "River Champion",
      pointsNeeded: 1000,
      progress: 75,
    },
  }

  // Mock reports data
  const reportsData = [
    {
      id: 1,
      river: "Yamuna",
      location: "Near ITO Bridge, Delhi",
      date: "Apr 10, 2023",
      type: "industrial",
      severity: 4,
      status: "verified",
      points: 65,
    },
    {
      id: 2,
      river: "Yamuna",
      location: "Wazirabad, Delhi",
      date: "Mar 25, 2023",
      type: "sewage",
      severity: 3,
      status: "verified",
      points: 55,
    },
    {
      id: 3,
      river: "Ganga",
      location: "Haridwar",
      date: "Feb 15, 2023",
      type: "plastic",
      severity: 2,
      status: "verified",
      points: 50,
    },
    {
      id: 4,
      river: "Yamuna",
      location: "Okhla Barrage",
      date: "Jan 30, 2023",
      type: "chemical",
      severity: 5,
      status: "pending",
      points: 0,
    },
  ]

  // Mock events data
  const eventsData = [
    {
      id: 1,
      name: "Yamuna Cleanup Drive",
      location: "Kalindi Kunj, Delhi",
      date: "May 15, 2023",
      time: "9:00 AM - 12:00 PM",
      status: "upcoming",
      participants: 45,
    },
    {
      id: 2,
      name: "World Water Day Awareness Camp",
      location: "India Gate, Delhi",
      date: "Mar 22, 2023",
      time: "10:00 AM - 4:00 PM",
      status: "completed",
      participants: 120,
      pointsEarned: 100,
    },
    {
      id: 3,
      name: "Yamuna Biodiversity Survey",
      location: "Sonia Vihar, Delhi",
      date: "Feb 18, 2023",
      time: "8:00 AM - 11:00 AM",
      status: "completed",
      participants: 25,
      pointsEarned: 75,
    },
  ]

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with user profile */}
        <div className="w-full md:w-80 flex-shrink-0 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>My Profile</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">@{userData.username}</p>

              <div className="bg-primary/10 rounded-full px-3 py-1 inline-flex items-center gap-1 mb-4">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{userData.level}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Points</span>
                  <span className="font-medium">
                    {userData.points} / {userData.nextLevel.pointsNeeded}
                  </span>
                </div>
                <Progress value={userData.nextLevel.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {userData.nextLevel.pointsNeeded - userData.points} points to reach {userData.nextLevel.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-muted p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold">{userData.reports}</p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>
                <div className="bg-muted p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold">{userData.cleanups}</p>
                  <p className="text-xs text-muted-foreground">Cleanups</p>
                </div>
              </div>

              <Link href="/profile/edit">
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">My Badges</CardTitle>
              <CardDescription>Achievements you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.badges.map((badge, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {badge.icon === "CheckCircle" && <CheckCircle className="h-4 w-4 text-primary" />}
                      {badge.icon === "Users" && <Users className="h-4 w-4 text-primary" />}
                      {badge.icon === "BarChart3" && <BarChart3 className="h-4 w-4 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">Earned on {badge.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <Link href="/badges">
                  <Button variant="link" className="p-0 h-auto text-sm">
                    View all badges
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="flex-grow">
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">My Reports</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Award className="h-8 w-8 text-primary" />
                      <span className="text-3xl font-bold">{userData.points}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Reports Submitted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-8 w-8 text-primary" />
                      <span className="text-3xl font-bold">{userData.reports}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Cleanups Joined</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Users className="h-8 w-8 text-primary" />
                      <span className="text-3xl font-bold">{userData.cleanups}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">Recent Reports</CardTitle>
                      <Link href="/dashboard?tab=reports" onClick={() => setActiveTab("reports")}>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          View all
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reportsData.slice(0, 3).map((report) => (
                        <div key={report.id} className="flex items-start gap-3">
                          <div className={`h-2 w-2 rounded-full mt-2 ${getSeverityColor(report.severity)}`}></div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <p className="font-medium text-sm">{report.river} River</p>
                              <Badge variant={report.status === "verified" ? "default" : "outline"}>
                                {report.status === "verified" ? "Verified" : "Pending"}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {report.location}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Calendar className="h-3 w-3" />
                              {report.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">Upcoming Events</CardTitle>
                      <Link href="/dashboard?tab=events" onClick={() => setActiveTab("events")}>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          View all
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {eventsData
                        .filter((event) => event.status === "upcoming")
                        .map((event) => (
                          <div key={event.id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-sm">{event.name}</h3>
                              <Badge>Upcoming</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Calendar className="h-3 w-3" />
                              {event.date}, {event.time}
                            </p>
                            <div className="flex justify-between items-center mt-3">
                              <p className="text-xs flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {event.participants} participants
                              </p>
                              <Button size="sm">Join</Button>
                            </div>
                          </div>
                        ))}

                      {eventsData.filter((event) => event.status === "upcoming").length === 0 && (
                        <div className="text-center py-6">
                          <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <h3 className="font-medium mb-1">No upcoming events</h3>
                          <p className="text-sm text-muted-foreground">Check back later for new events</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">My Reports</h2>
                <Link href="/report">
                  <Button>Submit New Report</Button>
                </Link>
              </div>

              {reportsData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportsData.map((report) => (
                    <Card key={report.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <span className={`h-2 w-2 rounded-full ${getSeverityColor(report.severity)}`}></span>
                              {report.river} River
                            </CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {report.location}
                            </CardDescription>
                          </div>
                          <Badge variant={report.status === "verified" ? "default" : "outline"}>
                            {report.status === "verified" ? "Verified" : "Pending"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="bg-muted p-2 rounded-lg">
                            <p className="text-xs text-muted-foreground">Type</p>
                            <p className="text-sm font-medium">{getPollutionTypeLabel(report.type)}</p>
                          </div>
                          <div className="bg-muted p-2 rounded-lg">
                            <p className="text-xs text-muted-foreground">Date</p>
                            <p className="text-sm font-medium">{report.date}</p>
                          </div>
                          <div className="bg-muted p-2 rounded-lg">
                            <p className="text-xs text-muted-foreground">Severity</p>
                            <p className="text-sm font-medium">{report.severity}/5</p>
                          </div>
                          <div className="bg-muted p-2 rounded-lg">
                            <p className="text-xs text-muted-foreground">Points</p>
                            <p className="text-sm font-medium">{report.points}</p>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Link href={`/report/${report.id}`}>
                            <Button variant="link" className="p-0 h-auto text-sm">
                              View Details
                            </Button>
                          </Link>
                          {report.status === "pending" && (
                            <Button variant="outline" size="sm" className="text-xs">
                              Edit Report
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-muted p-8 rounded-lg text-center">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No reports yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't submitted any pollution reports yet. Start contributing by reporting pollution
                    incidents.
                  </p>
                  <Link href="/report">
                    <Button>Submit Your First Report</Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="events">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Events</h2>
                <Link href="/events">
                  <Button variant="outline">Browse All Events</Button>
                </Link>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
                  {eventsData.filter((event) => event.status === "upcoming").length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {eventsData
                        .filter((event) => event.status === "upcoming")
                        .map((event) => (
                          <Card key={event.id}>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{event.name}</CardTitle>
                                <Badge>Upcoming</Badge>
                              </div>
                              <CardDescription className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <p className="text-sm">
                                    {event.date}, {event.time}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <p className="text-sm">{event.participants} participants registered</p>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                  <Link href={`/events/${event.id}`}>
                                    <Button variant="link" className="p-0 h-auto text-sm">
                                      View Details
                                    </Button>
                                  </Link>
                                  <Button>Join Event</Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <div className="bg-muted p-6 rounded-lg text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="font-medium mb-1">No upcoming events</h3>
                      <p className="text-sm text-muted-foreground">
                        Check back later for new events or browse past events below
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Past Events</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventsData
                      .filter((event) => event.status === "completed")
                      .map((event) => (
                        <Card key={event.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{event.name}</CardTitle>
                              <Badge variant="outline">Completed</Badge>
                            </div>
                            <CardDescription className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm">
                                  {event.date}, {event.time}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm">{event.participants} participants attended</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm">You earned {event.pointsEarned} points</p>
                              </div>

                              <div className="flex justify-between items-center pt-2">
                                <Link href={`/events/${event.id}`}>
                                  <Button variant="link" className="p-0 h-auto text-sm">
                                    View Details
                                  </Button>
                                </Link>
                                <Button variant="outline">View Photos</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rewards">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Rewards & Recognition</h2>
                <p className="text-muted-foreground">
                  Earn points and badges for your contributions to river conservation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Your Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="h-10 w-10 text-primary" />
                      <span className="text-4xl font-bold">{userData.points}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Level Progress</span>
                        <span className="font-medium">
                          {userData.points} / {userData.nextLevel.pointsNeeded}
                        </span>
                      </div>
                      <Progress value={userData.nextLevel.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {userData.nextLevel.pointsNeeded - userData.points} points to reach {userData.nextLevel.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Current Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <Award className="h-10 w-10 mx-auto mb-2 text-primary" />
                      <h3 className="text-xl font-bold mb-1">{userData.level}</h3>
                      <p className="text-sm text-muted-foreground">
                        You've made significant contributions to river conservation
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Next Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <Award className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="text-xl font-bold mb-1">{userData.nextLevel.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Need {userData.nextLevel.pointsNeeded - userData.points} more points to reach this level
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">How to Earn Points</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center mb-4">
                          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                            <CheckCircle className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mt-2">Submit Reports</h3>
                        </div>
                        <ul className="text-sm space-y-2">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Basic report</span>
                            <span>+30 points</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">With photos</span>
                            <span>+10 points</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">With location data</span>
                            <span>+15 points</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Verified report bonus</span>
                            <span>+20 points</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center mb-4">
                          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mt-2">Join Events</h3>
                        </div>
                        <ul className="text-sm space-y-2">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Cleanup participation</span>
                            <span>+50 points</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Awareness event</span>
                            <span>+30 points</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Survey/monitoring</span>
                            <span>+40 points</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Event organization</span>
                            <span>+100 points</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center mb-4">
                          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                            <BarChart3 className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium mt-2">Other Activities</h3>
                        </div>
                        <ul className="text-sm space-y-2">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Refer a friend</span>
                            <span>+25 points</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Share on social media</span>
                            <span>+10 points</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Complete surveys</span>
                            <span>+15 points</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Educational workshop</span>
                            <span>+35 points</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Available Rewards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Eco-Friendly Merchandise</CardTitle>
                        <CardDescription>Redeem your points for sustainable products</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="bg-muted w-10 h-10 rounded-md"></div>
                              <div>
                                <p className="font-medium text-sm">RiverGuard T-shirt</p>
                                <p className="text-xs text-muted-foreground">100% organic cotton</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" disabled={userData.points < 500}>
                              500 points
                            </Button>
                          </li>
                          <li className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="bg-muted w-10 h-10 rounded-md"></div>
                              <div>
                                <p className="font-medium text-sm">Reusable Water Bottle</p>
                                <p className="text-xs text-muted-foreground">Stainless steel, plastic-free</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" disabled={userData.points < 350}>
                              350 points
                            </Button>
                          </li>
                          <li className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="bg-muted w-10 h-10 rounded-md"></div>
                              <div>
                                <p className="font-medium text-sm">Cleanup Kit</p>
                                <p className="text-xs text-muted-foreground">Gloves, bags, and tools</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" disabled={userData.points < 400}>
                              400 points
                            </Button>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Special Opportunities</CardTitle>
                        <CardDescription>Exclusive access to events and programs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="bg-muted w-10 h-10 rounded-md"></div>
                              <div>
                                <p className="font-medium text-sm">Leadership Workshop</p>
                                <p className="text-xs text-muted-foreground">Environmental leadership training</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" disabled={userData.points < 800}>
                              800 points
                            </Button>
                          </li>
                          <li className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="bg-muted w-10 h-10 rounded-md"></div>
                              <div>
                                <p className="font-medium text-sm">Field Research Trip</p>
                                <p className="text-xs text-muted-foreground">
                                  Join scientists in water quality research
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" disabled={userData.points < 1000}>
                              1000 points
                            </Button>
                          </li>
                          <li className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="bg-muted w-10 h-10 rounded-md"></div>
                              <div>
                                <p className="font-medium text-sm">Conference Pass</p>
                                <p className="text-xs text-muted-foreground">Annual River Conservation Conference</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" disabled={userData.points < 1200}>
                              1200 points
                            </Button>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

