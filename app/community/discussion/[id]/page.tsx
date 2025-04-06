"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Users, Tag, ThumbsUp, Flag, Share, ArrowLeft, Send } from "lucide-react"

export default function DiscussionPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock discussion data
  const discussion = {
    id: params.id,
    title: "Industrial waste found in Yamuna near Okhla",
    content: `
      <p>I was conducting a routine water quality check near the Okhla Barrage yesterday and found alarming levels of industrial waste being discharged into the Yamuna River.</p>
      
      <p>The water had a strong chemical smell and unusual coloration. I collected samples and preliminary testing shows high levels of heavy metals and chemical compounds typically associated with textile and leather industries.</p>
      
      <p>Has anyone else observed similar issues in this area? I've already reported this to the local pollution control board, but I think we need to organize a more thorough investigation and possibly a cleanup effort.</p>
      
      <p>I've attached some photos of the affected area and would appreciate any insights or suggestions on how to address this issue effectively.</p>
    `,
    category: "River Pollution Reports",
    author: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Water Quality Specialist",
      joinDate: "Member since Jan 2022",
      posts: 48,
    },
    createdAt: "April 15, 2023 at 10:24 AM",
    updatedAt: "April 15, 2023 at 11:30 AM",
    replies: 18,
    views: 142,
    likes: 36,
    tags: ["yamuna", "industrial-waste", "delhi", "water-quality"],
    images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  }

  // Mock replies data
  const replies = [
    {
      id: 1,
      author: {
        name: "Dr. Anjali Desai",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Environmental Scientist",
        joinDate: "Member since Mar 2021",
        posts: 124,
      },
      content: `
        <p>Thank you for reporting this, Rahul. The situation looks concerning based on your photos.</p>
        
        <p>I've been monitoring water quality in the Yamuna for the past 5 years, and this area has been problematic due to unauthorized industrial discharge. The textile and leather industries you mentioned are likely culprits, but there are also several small-scale chemical manufacturing units operating without proper effluent treatment facilities.</p>
        
        <p>I suggest we coordinate with the Delhi Pollution Control Committee and organize a comprehensive sampling campaign. I can help analyze the samples at our university lab if needed.</p>
        
        <p>Have you noticed any dead fish or other aquatic life in the area? That would help us assess the immediate ecological impact.</p>
      `,
      createdAt: "April 15, 2023 at 11:45 AM",
      likes: 24,
    },
    {
      id: 2,
      author: {
        name: "Vikram Mehta",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Community Organizer",
        joinDate: "Member since Nov 2022",
        posts: 37,
      },
      content: `
        <p>This is exactly why we need stricter enforcement of pollution regulations. The industries keep getting away with minimal penalties while our rivers suffer.</p>
        
        <p>I'm part of a local environmental group in Delhi, and we'd be happy to organize a cleanup drive in this area. We can also help with documenting the pollution for legal action.</p>
        
        <p>@Rahul - Could you share the exact coordinates of this location? We'll plan to visit this weekend and assess the situation.</p>
      `,
      createdAt: "April 15, 2023 at 1:20 PM",
      likes: 18,
    },
    {
      id: 3,
      author: {
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Journalist",
        joinDate: "Member since Feb 2023",
        posts: 15,
      },
      content: `
        <p>I'm a journalist covering environmental issues for a national daily. This is concerning and deserves wider attention.</p>
        
        <p>Would you be willing to share your findings and photos for a news story? I believe public pressure can help expedite action from authorities.</p>
        
        <p>I'd also like to interview you about your water quality monitoring work. Please let me know if you're interested.</p>
      `,
      createdAt: "April 15, 2023 at 3:05 PM",
      likes: 12,
    },
  ]

  const handleReplySubmit = async (e) => {
    e.preventDefault()

    if (!replyContent.trim()) {
      toast({
        title: "Empty reply",
        description: "Please enter your reply before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to post the reply
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Reply posted",
        description: "Your reply has been added to the discussion.",
      })

      setReplyContent("")
    } catch (error) {
      toast({
        title: "Error posting reply",
        description: "There was a problem posting your reply. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = (type, id) => {
    toast({
      title: "Liked",
      description: `You liked this ${type}.`,
    })
  }

  const handleShare = () => {
    // In a real app, this would copy the URL to clipboard or open a share dialog
    navigator.clipboard.writeText(window.location.href)

    toast({
      title: "Link copied",
      description: "Discussion link copied to clipboard.",
    })
  }

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for reporting this content. Our moderators will review it.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.push("/community")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Discussions
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{discussion.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Badge>{discussion.category}</Badge>
                  <span className="text-muted-foreground">Posted {discussion.createdAt}</span>
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleLike("discussion", discussion.id)}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{discussion.likes}</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleShare}>
                  <Share className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleReport}>
                  <Flag className="h-4 w-4" />
                  Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="hidden md:block">
                <div className="flex flex-col items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm mt-2">{discussion.author.name}</p>
                  <p className="text-xs text-muted-foreground">{discussion.author.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{discussion.author.joinDate}</p>
                  <p className="text-xs text-muted-foreground">{discussion.author.posts} posts</p>
                </div>
              </div>

              <div className="flex-grow">
                <div className="md:hidden flex items-center gap-2 mb-4">
                  <Avatar>
                    <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{discussion.author.name}</p>
                    <p className="text-xs text-muted-foreground">{discussion.author.role}</p>
                  </div>
                </div>

                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: discussion.content }}
                ></div>

                {discussion.images && discussion.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {discussion.images.map((image, index) => (
                      <div key={index} className="rounded-md overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Image ${index + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {discussion.tags.map((tag, index) => (
                    <Link key={index} href={`/community/tag/${tag}`}>
                      <Badge variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{discussion.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{discussion.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Replies ({replies.length})</h2>

          <div className="space-y-6">
            {replies.map((reply) => (
              <Card key={reply.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="hidden md:block">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                          <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-sm mt-2">{reply.author.name}</p>
                        <p className="text-xs text-muted-foreground">{reply.author.role}</p>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div className="md:hidden flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                            <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{reply.author.name}</p>
                            <p className="text-xs text-muted-foreground">{reply.author.role}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{reply.createdAt}</span>
                      </div>

                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: reply.content }}
                      ></div>

                      <div className="flex items-center gap-4 mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 h-8 px-2"
                          onClick={() => handleLike("reply", reply.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{reply.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 h-8 px-2"
                          onClick={() => setReplyContent(`@${reply.author.name} `)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          Quote
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 h-8 px-2"
                          onClick={handleReport}
                        >
                          <Flag className="h-4 w-4" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Post a Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReplySubmit}>
              <Textarea
                placeholder="Write your reply here..."
                className="min-h-[150px] mb-4"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                disabled={isSubmitting}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                  {isSubmitting ? "Posting..." : "Post Reply"}
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

