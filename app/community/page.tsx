"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Users, Clock, Tag, PlusCircle, Search, Filter, MapPin } from "lucide-react"

export default function CommunityPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for forum categories
  const categories = [
    {
      id: 1,
      name: "River Pollution Reports",
      description: "Discuss recent pollution incidents and findings",
      icon: "AlertTriangle",
      threads: 42,
      color: "bg-red-100 text-red-800",
    },
    {
      id: 2,
      name: "Cleanup Events",
      description: "Organize and coordinate cleanup activities",
      icon: "Users",
      threads: 28,
      color: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      name: "Water Quality Monitoring",
      description: "Share water quality data and testing methods",
      icon: "BarChart3",
      threads: 35,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 4,
      name: "Government Initiatives",
      description: "Updates on government schemes and policies",
      icon: "Building",
      threads: 19,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 5,
      name: "Education & Awareness",
      description: "Resources for environmental education",
      icon: "BookOpen",
      threads: 31,
      color: "bg-amber-100 text-amber-800",
    },
    {
      id: 6,
      name: "Technology & Innovation",
      description: "Discuss new technologies for river conservation",
      icon: "Lightbulb",
      threads: 24,
      color: "bg-cyan-100 text-cyan-800",
    },
  ]

  // Mock data for recent discussions
  const recentDiscussions = [
    {
      id: 1,
      title: "Industrial waste found in Yamuna near Okhla",
      category: "River Pollution Reports",
      author: {
        name: "Rahul Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: 18,
      views: 142,
      lastActivity: "2 hours ago",
      tags: ["yamuna", "industrial-waste", "delhi"],
    },
    {
      id: 2,
      title: "Organizing a cleanup drive at Juhu Beach this Sunday",
      category: "Cleanup Events",
      author: {
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: 24,
      views: 210,
      lastActivity: "5 hours ago",
      tags: ["mumbai", "beach-cleanup", "volunteer"],
    },
    {
      id: 3,
      title: "Water quality testing results from Ganga at Varanasi",
      category: "Water Quality Monitoring",
      author: {
        name: "Dr. Amit Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: 12,
      views: 98,
      lastActivity: "1 day ago",
      tags: ["ganga", "water-quality", "research"],
    },
    {
      id: 4,
      title: "New Namami Gange project phase announced",
      category: "Government Initiatives",
      author: {
        name: "Sunita Rao",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: 9,
      views: 87,
      lastActivity: "2 days ago",
      tags: ["namami-gange", "policy", "funding"],
    },
    {
      id: 5,
      title: "Innovative plastic waste collection system for rivers",
      category: "Technology & Innovation",
      author: {
        name: "Vikram Mehta",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: 31,
      views: 245,
      lastActivity: "3 days ago",
      tags: ["innovation", "plastic-waste", "technology"],
    },
  ]

  // Mock data for popular discussions
  const popularDiscussions = [
    {
      id: 6,
      title: "Comprehensive guide to water quality testing at home",
      category: "Water Quality Monitoring",
      author: {
        name: "Dr. Meera Iyer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: 76,
      views: 1240,
      lastActivity: "1 week ago",
      tags: ["guide", "water-quality", "diy"],
    },
    {
      id: 7,
      title: "Success story: How we cleaned up Powai Lake",
      category: "Cleanup Events",
      author: {
        name: "Arjun Nair",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: 54,
      views: 890,
      lastActivity: "2 weeks ago",
      tags: ["success-story", "mumbai", "lake"],
    },
    {
      id: 8,
      title: "Petition: Stricter regulations for industrial waste disposal",
      category: "Government Initiatives",
      author: {
        name: "Anjali Desai",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: 128,
      views: 2150,
      lastActivity: "3 days ago",
      tags: ["petition", "industrial-waste", "regulations"],
    },
    {
      id: 9,
      title: "River conservation curriculum for schools",
      category: "Education & Awareness",
      author: {
        name: "Prof. Suresh Menon",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: 42,
      views: 670,
      lastActivity: "5 days ago",
      tags: ["education", "curriculum", "schools"],
    },
    {
      id: 10,
      title: "Using drones for river pollution monitoring",
      category: "Technology & Innovation",
      author: {
        name: "Karan Malhotra",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      replies: 67,
      views: 1120,
      lastActivity: "1 week ago",
      tags: ["drones", "technology", "monitoring"],
    },
  ]

  // Mock data for trending tags
  const trendingTags = [
    { name: "cleanup-drive", count: 42 },
    { name: "water-quality", count: 38 },
    { name: "namami-gange", count: 27 },
    { name: "plastic-pollution", count: 24 },
    { name: "volunteer", count: 21 },
    { name: "yamuna", count: 19 },
    { name: "ganga", count: 18 },
    { name: "technology", count: 16 },
  ]

  // Filter discussions based on search query
  const filterDiscussions = (discussions) => {
    if (!searchQuery.trim()) return discussions

    return discussions.filter(
      (discussion) =>
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  const filteredRecentDiscussions = filterDiscussions(recentDiscussions)
  const filteredPopularDiscussions = filterDiscussions(popularDiscussions)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Community Forum</h1>
              <p className="text-muted-foreground">Connect, discuss, and collaborate with fellow river guardians</p>
            </div>
            <Button onClick={() => router.push("/community/new-topic")} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Topic
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <Tabs defaultValue="recent" className="mb-6">
            <TabsList>
              <TabsTrigger value="recent">Recent Discussions</TabsTrigger>
              <TabsTrigger value="popular">Popular Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="recent">
              <div className="space-y-4">
                {filteredRecentDiscussions.length > 0 ? (
                  filteredRecentDiscussions.map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))
                ) : (
                  <div className="bg-muted p-6 rounded-lg text-center">
                    <p className="text-muted-foreground">No discussions found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="popular">
              <div className="space-y-4">
                {filteredPopularDiscussions.length > 0 ? (
                  filteredPopularDiscussions.map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))
                ) : (
                  <div className="bg-muted p-6 rounded-lg text-center">
                    <p className="text-muted-foreground">No discussions found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 flex-shrink-0 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/community/category/${category.id}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${category.color.split(" ")[0]}`}></div>
                    <span>{category.name}</span>
                  </div>
                  <Badge variant="outline">{category.threads}</Badge>
                </Link>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                View All Categories
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Trending Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag, index) => (
                  <Link key={index} href={`/community/tag/${tag.name}`}>
                    <Badge variant="secondary" className="cursor-pointer">
                      #{tag.name} <span className="ml-1 text-xs">({tag.count})</span>
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Members</span>
                <span className="font-medium">5,280</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Discussions</span>
                <span className="font-medium">1,342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Replies</span>
                <span className="font-medium">8,756</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Members</span>
                <span className="font-medium">324</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border rounded-md p-3">
                <h3 className="font-medium">Yamuna Cleanup Drive</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  Delhi, Kalindi Kunj
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  May 15, 2023 • 9:00 AM
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    45 participants
                  </Badge>
                </div>
              </div>

              <div className="border rounded-md p-3">
                <h3 className="font-medium">Water Quality Workshop</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  Mumbai, Powai
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  May 22, 2023 • 10:00 AM
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    28 participants
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                View All Events
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DiscussionCard({ discussion }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="hidden sm:block">
            <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <Link
                href={`/community/discussion/${discussion.id}`}
                className="font-medium hover:text-primary transition-colors"
              >
                {discussion.title}
              </Link>
              <Badge variant="outline">{discussion.category}</Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {discussion.tags.map((tag, index) => (
                <Link key={index} href={`/community/tag/${tag}`}>
                  <Badge variant="secondary" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>By {discussion.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{discussion.replies} replies</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{discussion.lastActivity}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

