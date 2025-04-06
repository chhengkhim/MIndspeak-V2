"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageSquare, ThumbsUp, Send, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { TypingAnimation } from "@/components/magicui/typing-animation"


export default function StoriesPage() {
  // This would normally come from a database
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "Finding Light in Darkness",
      category: "Anxiety",
      content:
        "For years, I struggled with anxiety that felt like a constant weight on my chest. Every morning was a battle to get out of bed, every social interaction a mountain to climb. I never thought I'd find relief, but through therapy and the support of friends who truly listened, I've started to see light again. It's not always easy, but I'm learning that it's okay to not be okay sometimes.",
      likes: 24,
      comments: 7,
      date: "2 days ago",
      isLiked: false,
      isHelpful: false,
      helpfulCount: 18,
      commentsList: [
        {
          id: 1,
          content: "Thank you for sharing this. I've been feeling the same way and it helps to know I'm not alone.",
          timestamp: "1 day ago",
        },
        {
          id: 2,
          content: "What kind of therapy worked for you? I've been considering getting help.",
          timestamp: "1 day ago",
        },
      ],
      showComments: false,
    },
    {
      id: 2,
      title: "My Journey Through Depression",
      category: "Depression",
      content:
        "Depression crept into my life slowly, like a fog that gradually thickened until I couldn't see anything else. I lost interest in my studies, stopped hanging out with friends, and felt like I was just going through the motions. Reaching out for help was the hardest but most important step I've taken. If you're feeling this way, please know you're not alone and it can get better.",
      likes: 32,
      comments: 12,
      date: "1 week ago",
      isLiked: false,
      isHelpful: false,
      helpfulCount: 27,
      commentsList: [
        {
          id: 1,
          content: "I'm in this exact place right now. How did you find the courage to reach out?",
          timestamp: "6 days ago",
        },
        {
          id: 2,
          content: "Your story gives me hope. Thank you for being brave enough to share.",
          timestamp: "5 days ago",
        },
      ],
      showComments: false,
    },
    {
      id: 3,
      title: "Overcoming Academic Pressure",
      category: "Stress",
      content:
        "The pressure to excel academically nearly broke me. I was staying up all night studying, skipping meals, and constantly feeling like I wasn't doing enough. When I finally opened up to my professor about my struggles, I was surprised by their understanding. They helped me develop healthier study habits and reminded me that my worth isn't determined by my GPA.",
      likes: 18,
      comments: 5,
      date: "2 weeks ago",
      isLiked: false,
      isHelpful: false,
      helpfulCount: 15,
      commentsList: [
        {
          id: 1,
          content: "I wish more professors were understanding like this. University can be so overwhelming.",
          timestamp: "10 days ago",
        },
      ],
      showComments: false,
    },
    {
      id: 4,
      title: "Learning to Love Myself Again",
      category: "Self-esteem",
      content:
        "Social media had me constantly comparing myself to others, making me feel inadequate in every way. I started practicing small acts of self-compassion each day - speaking kindly to myself, celebrating small victories, and focusing on gratitude. It's been a gradual process, but I'm slowly rebuilding my relationship with myself.",
      likes: 29,
      comments: 8,
      date: "3 weeks ago",
      isLiked: false,
      isHelpful: false,
      helpfulCount: 22,
      commentsList: [
        {
          id: 1,
          content: "Could you share some specific self-compassion practices that helped you?",
          timestamp: "2 weeks ago",
        },
        {
          id: 2,
          content: "I deleted all social media apps from my phone last month and it's been life-changing.",
          timestamp: "2 weeks ago",
        },
      ],
      showComments: false,
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [commentText, setCommentText] = useState("")
  const [activeCommentStory, setActiveCommentStory] = useState<number | null>(null)
  const [editingComment, setEditingComment] = useState<{ storyId: number; commentId: number } | null>(null)
  const [editCommentText, setEditCommentText] = useState("")

  // Ref for scrolling to comments
  const commentsRef = useRef<HTMLDivElement>(null)

  // Scroll animation
  // Removed unused scaleX variable

  const handleLike = (id: number) => {
    setStories(
      stories.map((story) => {
        if (story.id === id) {
          return {
            ...story,
            likes: story.isLiked ? story.likes - 1 : story.likes + 1,
            isLiked: !story.isLiked,
          }
        }
        return story
      }),
    )
  }

  const handleHelpful = (id: number) => {
    setStories(
      stories.map((story) => {
        if (story.id === id) {
          return {
            ...story,
            helpfulCount: story.isHelpful ? story.helpfulCount - 1 : story.helpfulCount + 1,
            isHelpful: !story.isHelpful,
          }
        }
        return story
      }),
    )
  }

  const toggleComments = (id: number) => {
    setStories(
      stories.map((story) => {
        if (story.id === id) {
          return {
            ...story,
            showComments: !story.showComments,
          }
        }
        return story
      }),
    )

    // Scroll to comments section after a short delay to allow for animation
    if (!stories.find((s) => s.id === id)?.showComments) {
      setTimeout(() => {
        commentsRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 300)
    }
  }

  const handleAddComment = (id: number) => {
    if (!commentText.trim()) return

    setStories(
      stories.map((story) => {
        if (story.id === id) {
          const newComment = {
            id: story.commentsList.length + 1,
            content: commentText,
            timestamp: "Just now",
          }
          return {
            ...story,
            comments: story.comments + 1,
            commentsList: [...story.commentsList, newComment],
          }
        }
        return story
      }),
    )

    setCommentText("")
    setActiveCommentStory(null)
  }

  const handleEditComment = (storyId: number, commentId: number) => {
    const story = stories.find((s) => s.id === storyId)
    const comment = story?.commentsList.find((c) => c.id === commentId)

    if (story && comment) {
      setEditingComment({ storyId, commentId })
      setEditCommentText(comment.content)
    }
  }

  const saveEditedComment = (storyId: number, commentId: number) => {
    if (!editCommentText.trim()) return

    setStories(
      stories.map((story) => {
        if (story.id === storyId) {
          const updatedComments = story.commentsList.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                content: editCommentText,
                timestamp: "Edited just now",
              }
            }
            return comment
          })

          return {
            ...story,
            commentsList: updatedComments,
          }
        }
        return story
      }),
    )

    setEditingComment(null)
    setEditCommentText("")
  }

  const cancelEditComment = () => {
    setEditingComment(null)
    setEditCommentText("")
  }

  const deleteComment = (storyId: number, commentId: number) => {
    setStories(
      stories.map((story) => {
        if (story.id === storyId) {
          const filteredComments = story.commentsList.filter((comment) => comment.id !== commentId)

          return {
            ...story,
            comments: story.comments - 1,
            commentsList: filteredComments,
          }
        }
        return story
      }),
    )
  }

  const filteredStories = stories.filter((story) => {
    if (!searchQuery) return true
    return (
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }


  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <ScrollAnimation>
          <TypingAnimation className="text-3xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Community Stories
          </TypingAnimation>
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <p className="text-muted-foreground mb-8">
            Read experiences shared by others in our community. These stories remind us that we are not alone in our
            struggles.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg">
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <TabsTrigger value="all">All Stories</TabsTrigger>
                <TabsTrigger value="anxiety">Anxiety</TabsTrigger>
                <TabsTrigger value="depression">Depression</TabsTrigger>
                <TabsTrigger value="stress">Stress</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex w-full md:w-auto gap-4">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stories..."
                  className="pl-8 w-full md:w-[200px] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-primary/20 focus:border-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-primary/20 transition-all duration-300"
                >
                  <Link href="/share">Share Your Story</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </ScrollAnimation>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          {filteredStories.length > 0 ? (
            filteredStories.map((story, index) => (
              <ScrollAnimation key={story.id} delay={0.1 * index} threshold={0.1}>
                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="transform transition-all duration-200"
                >
                  <Card className="overflow-hidden hover:shadow-md hover:shadow-blue-500 transition-shadow border-primary/10 hover:border-primary/30">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{story.title}</CardTitle>
                          <div className="flex items-center mt-2">
                            <motion.span
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              {story.category}
                            </motion.span>
                            <span className="text-xs text-muted-foreground ml-3">{story.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{story.content}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start">
                      <div className="flex justify-between w-full">
                        <div className="flex space-x-4">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "flex items-center gap-1 transition-colors duration-300",
                                story.isLiked ? "text-red-500 hover:text-red-600" : "hover:text-red-400",
                              )}
                              onClick={() => handleLike(story.id)}
                            >
                              <Heart className="h-4 w-4" fill={story.isLiked ? "currentColor" : "none"} />
                              <span>{story.likes}</span>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "flex items-center gap-1 transition-colors duration-300",
                                story.showComments ? "text-blue-500 hover:text-blue-600" : "hover:text-blue-400",
                              )}
                              onClick={() => toggleComments(story.id)}
                            >
                              <MessageSquare className="h-4 w-4" fill={story.showComments ? "currentColor" : "none"} />
                              <span>{story.comments}</span>
                            </Button>
                          </motion.div>
                        </div>
                        <div className="flex space-x-4">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "flex items-center gap-1 transition-colors duration-300",
                                story.isHelpful ? "text-green-600 hover:text-green-700" : "hover:text-green-500",
                              )}
                              onClick={() => handleHelpful(story.id)}
                            >
                              <ThumbsUp className="h-4 w-4" fill={story.isHelpful ? "currentColor" : "none"} />
                              <span>{story.helpfulCount} found this helpful</span>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary/20 hover:border-primary/50 transition-all duration-300"
                            >
                              Read More
                            </Button>
                          </motion.div>
                        </div>
                      </div>

                      {/* Comments section */}
                      <AnimatePresence>
                        {story.showComments && (
                          <motion.div
                            className="w-full mt-4 pt-4 border-t space-y-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            ref={commentsRef}
                          >
                            <h4 className="text-sm font-medium">Comments</h4>

                            <AnimatePresence>
                              {story.commentsList.length > 0 ? (
                                story.commentsList.map((comment) => (
                                  <motion.div
                                    key={comment.id}
                                    className="flex gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback>A</AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted p-2 rounded-md text-sm flex-1 hover:bg-muted/80 transition-colors duration-200">
                                      {editingComment?.storyId === story.id &&
                                      editingComment?.commentId === comment.id ? (
                                        <div className="flex flex-col gap-2">
                                          <Textarea
                                            value={editCommentText}
                                            onChange={(e) => setEditCommentText(e.target.value)}
                                            className="min-h-[60px] text-sm focus:border-primary/50"
                                          />
                                          <div className="flex justify-end gap-2">
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={cancelEditComment}
                                              className="border-primary/20 hover:border-primary/50"
                                            >
                                              Cancel
                                            </Button>
                                            <Button
                                              size="sm"
                                              onClick={() => saveEditedComment(story.id, comment.id)}
                                              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                                            >
                                              Save
                                            </Button>
                                          </div>
                                        </div>
                                      ) : (
                                        <>
                                          <div className="flex justify-between items-start">
                                            <p>{comment.content}</p>
                                            <DropdownMenu>
                                              <DropdownMenuTrigger asChild>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-6 w-6 p-0 opacity-50 hover:opacity-100 transition-opacity duration-200"
                                                >
                                                  <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                              </DropdownMenuTrigger>
                                              <DropdownMenuContent
                                                align="end"
                                                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                                              >
                                                <DropdownMenuItem
                                                  onClick={() => handleEditComment(story.id, comment.id)}
                                                >
                                                  <Edit className="mr-2 h-4 w-4" />
                                                  <span>Edit</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                  className="text-red-600"
                                                  onClick={() => deleteComment(story.id, comment.id)}
                                                >
                                                  <Trash2 className="mr-2 h-4 w-4" />
                                                  <span>Delete</span>
                                                </DropdownMenuItem>
                                              </DropdownMenuContent>
                                            </DropdownMenu>
                                          </div>
                                          <p className="text-xs text-muted-foreground mt-1">{comment.timestamp}</p>
                                        </>
                                      )}
                                    </div>
                                  </motion.div>
                                ))
                              ) : (
                                <motion.p
                                  className="text-sm text-muted-foreground"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  No comments yet. Be the first to comment!
                                </motion.p>
                              )}
                            </AnimatePresence>

                            {/* Add comment form */}
                            <motion.div
                              className="flex gap-2 mt-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.3 }}
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>A</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 flex gap-2">
                                <Textarea
                                  placeholder="Add a supportive comment..."
                                  value={activeCommentStory === story.id ? commentText : ""}
                                  onChange={(e) => {
                                    setCommentText(e.target.value)
                                    setActiveCommentStory(story.id)
                                  }}
                                  className="min-h-[60px] text-sm flex-1 focus:border-primary/50"
                                />
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button
                                    size="sm"
                                    onClick={() => handleAddComment(story.id)}
                                    className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardFooter>
                  </Card>
                </motion.div>
              </ScrollAnimation>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No stories found matching your search.</p>
              <Button
                variant="outline"
                className="mt-4 border-primary/20 hover:border-primary/50"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

