"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Send, Image, TagIcon } from "lucide-react"

export default function NewTopicPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
  })

  // Mock categories
  const categories = [
    { id: 1, name: "River Pollution Reports" },
    { id: 2, name: "Cleanup Events" },
    { id: 3, name: "Water Quality Monitoring" },
    { id: 4, name: "Government Initiatives" },
    { id: 5, name: "Education & Awareness" },
    { id: 6, name: "Technology & Innovation" },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.category || !formData.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to create the topic
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Topic created",
        description: "Your discussion topic has been posted successfully.",
      })

      // Redirect to the community page
      router.push("/community")
    } catch (error) {
      toast({
        title: "Error creating topic",
        description: "There was a problem posting your topic. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.push("/community")}>
          <ArrowLeft className="h-4 w-4" />
          Back to Discussions
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Topic</CardTitle>
            <CardDescription>Start a new discussion in the community forum</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Topic Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter a descriptive title for your topic"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  disabled={isSubmitting}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your discussion topic here..."
                  value={formData.content}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex items-center gap-2">
                  <TagIcon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="Enter tags separated by commas (e.g., yamuna, pollution, delhi)"
                    value={formData.tags}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Tags help others find your topic. Add relevant keywords separated by commas.
                </p>
              </div>

              <div className="border border-dashed rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Image className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Attach Images (Optional)</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  You can upload images to support your discussion. Supported formats: JPG, PNG, GIF.
                </p>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Upload Images
                </Button>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => router.push("/community")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                  {isSubmitting ? "Creating Topic..." : "Create Topic"}
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

