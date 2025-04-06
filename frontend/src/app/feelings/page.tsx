"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  ThumbsUp,
  Send,
  Smile,
  Frown,
  Meh,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { TypingAnimation } from "@/components/magicui/typing-animation";


// Feeling types with corresponding colors
const feelingTypes = [
  {
    name: "Happy",
    emoji: "😊",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
  {
    name: "Sad",
    emoji: "😢",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  },
  {
    name: "Anxious",
    emoji: "😰",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  },
  {
    name: "Angry",
    emoji: "😠",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  },
  {
    name: "Confused",
    emoji: "😕",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  },
  {
    name: "Grateful",
    emoji: "🙏",
    color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
  },
  {
    name: "Overwhelmed",
    emoji: "😩",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  },
  {
    name: "Hopeful",
    emoji: "🌱",
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
  },
];

// Sample feelings data
const initialFeelings = [
  {
    id: 1,
    content:
      "Today I managed to get out of bed and attend all my classes despite feeling anxious. Small victory but I'm proud of myself.",
    feeling: "Anxious",
    timestamp: "2 hours ago",
    likes: 12,
    comments: 3,
    isLiked: false,
    commentsList: [
      {
        id: 1,
        content: "You should be proud! That's a big step.",
        timestamp: "1 hour ago",
      },
      {
        id: 2,
        content: "I struggle with this too. You're doing great!",
        timestamp: "30 minutes ago",
      },
    ],
  },
  {
    id: 2,
    content:
      "Failed my exam today. Feeling like a complete failure and don't know how to tell my parents.",
    feeling: "Sad",
    timestamp: "5 hours ago",
    likes: 24,
    comments: 7,
    isLiked: false,
    commentsList: [
      {
        id: 1,
        content:
          "One exam doesn't define you. Take some time to process and then make a plan.",
        timestamp: "4 hours ago",
      },
      {
        id: 2,
        content:
          "I've been there. Parents can be more understanding than you expect.",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    id: 3,
    content:
      "After months of therapy, I finally feel like I'm making progress with my depression. There's light at the end of the tunnel.",
    feeling: "Hopeful",
    timestamp: "1 day ago",
    likes: 45,
    comments: 12,
    isLiked: false,
    commentsList: [
      {
        id: 1,
        content:
          "This gives me hope for my own journey. Thank you for sharing.",
        timestamp: "20 hours ago",
      },
      {
        id: 2,
        content: "So happy for you! Keep going!",
        timestamp: "10 hours ago",
      },
    ],
  },
  {
    id: 4,
    content:
      "My roommate surprised me with coffee and notes from the class I missed when I was sick. Sometimes people can be so kind.",
    feeling: "Grateful",
    timestamp: "2 days ago",
    likes: 38,
    comments: 5,
    isLiked: false,
    commentsList: [
      {
        id: 1,
        content: "Those small acts of kindness make such a difference.",
        timestamp: "1 day ago",
      },
    ],
  },
];

export default function FeelingsPage() {
  const [feelings, setFeelings] = useState(initialFeelings);
  const [newFeeling, setNewFeeling] = useState("");
  const [selectedFeelingType, setSelectedFeelingType] = useState("Happy");
  const [showCommentInput, setShowCommentInput] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState<{
    feelingId: number;
    commentId: number;
  } | null>(null);
  const [editCommentText, setEditCommentText] = useState<string>(""); // Ensure this line exists in the component

  // Ref for scrolling to comments
  const commentsRef = useRef<HTMLDivElement>(null);

  const handlePostFeeling = () => {
    if (!newFeeling.trim()) return;

    const newFeelingObj = {
      id: feelings.length + 1,
      content: newFeeling,
      feeling: selectedFeelingType,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
      commentsList: [],
    };

    setFeelings([newFeelingObj, ...feelings]);
    setNewFeeling("");
  };

  const handleLike = (id: number) => {
    setFeelings(
      feelings.map((feeling) => {
        if (feeling.id === id) {
          return {
            ...feeling,
            likes: feeling.isLiked ? feeling.likes - 1 : feeling.likes + 1,
            isLiked: !feeling.isLiked,
          };
        }
        return feeling;
      })
    );
  };

  const handleAddComment = (id: number) => {
    if (!commentText.trim()) return;

    setFeelings(
      feelings.map((feeling) => {
        if (feeling.id === id) {
          const newComment = {
            id: feeling.commentsList.length + 1,
            content: commentText,
            timestamp: "Just now",
          };
          return {
            ...feeling,
            comments: feeling.comments + 1,
            commentsList: [...feeling.commentsList, newComment],
          };
        }
        return feeling;
      })
    );

    setCommentText("");
    setShowCommentInput(null);
  };

  const handleEditComment = (feelingId: number, commentId: number) => {
    const feeling = feelings.find((f) => f.id === feelingId);
    const comment = feeling?.commentsList.find((c) => c.id === commentId);

    if (feeling && comment) {
      setEditingComment({ feelingId, commentId });
      setEditCommentText(comment.content);
    }
  };

  const saveEditedComment = (feelingId: number, commentId: number) => {
    if (!editCommentText.trim()) return;

    setFeelings(
      feelings.map((feeling) => {
        if (feeling.id === feelingId) {
          const updatedComments = feeling.commentsList.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                content: editCommentText,
                timestamp: "Edited just now",
              };
            }
            return comment;
          });

          return {
            ...feeling,
            commentsList: updatedComments,
          };
        }
        return feeling;
      })
    );

    setEditingComment(null);
    setEditCommentText("");
  };

  const cancelEditComment = () => {
    setEditingComment(null);
    setEditCommentText("");
  };

  const deleteComment = (feelingId: number, commentId: number) => {
    setFeelings(
      feelings.map((feeling) => {
        if (feeling.id === feelingId) {
          const filteredComments = feeling.commentsList.filter(
            (comment) => comment.id !== commentId
          );

          return {
            ...feeling,
            comments: feeling.comments - 1,
            commentsList: filteredComments,
          };
        }
        return feeling;
      })
    );
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

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
            Express Your Feelings
          </TypingAnimation>
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <p className="text-muted-foreground mb-8">
            Share what is on your mind anonymously. Your feelings are valid and
            you are not alone.
          </p>
        </ScrollAnimation>

        {/* Post new feeling */}
        <ScrollAnimation delay={0.2}>
          <Card className="mb-8 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Anonymous</span>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What's on your mind today?"
                value={newFeeling}
                onChange={(e) => setNewFeeling(e.target.value)}
                className="min-h-[100px] mb-3 focus:border-primary/50"
              />
              <div className="flex flex-wrap gap-2 mb-3">
                {feelingTypes.map((type) => (
                  <motion.div
                    key={type.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedFeelingType === type.name ? type.color : ""
                      )}
                      onClick={() => setSelectedFeelingType(type.name)}
                    >
                      {type.emoji} {type.name}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handlePostFeeling}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-primary/20 transition-all duration-300"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Share Feeling
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </ScrollAnimation>

        {/* Feelings filter */}
        <ScrollAnimation delay={0.3}>
          <div className="mb-6 bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg">
            <Tabs defaultValue="all">
              <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <TabsTrigger value="all">All Feelings</TabsTrigger>
                <TabsTrigger value="happy">
                  <Smile className="mr-1 h-4 w-4" />
                  Positive
                </TabsTrigger>
                <TabsTrigger value="sad">
                  <Frown className="mr-1 h-4 w-4" />
                  Challenging
                </TabsTrigger>
                <TabsTrigger value="neutral">
                  <Meh className="mr-1 h-4 w-4" />
                  Neutral
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4 mt-4"
                >
                  {feelings.map((feeling, index) => (
                    <ScrollAnimation
                      key={feeling.id}
                      delay={0.1 * index}
                      threshold={0.1}
                    >
                      <FeelingCard
                        feeling={feeling}
                        onLike={handleLike}
                        showCommentInput={showCommentInput === feeling.id}
                        setShowCommentInput={setShowCommentInput}
                        commentText={commentText}
                        setCommentText={setCommentText}
                        onAddComment={handleAddComment}
                        editingComment={editingComment}
                        editCommentText={editCommentText}
                        setEditCommentText={setEditCommentText}
                        handleEditComment={handleEditComment}
                        saveEditedComment={saveEditedComment}
                        cancelEditComment={cancelEditComment}
                        deleteComment={deleteComment}
                        variants={item}
                        commentsRef={commentsRef}
                      />
                    </ScrollAnimation>
                  ))}
                </motion.div>
              </TabsContent>

              {/* Other tabs would filter by feeling type */}
              <TabsContent value="happy">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4 mt-4"
                >
                  {feelings
                    .filter((f) =>
                      ["Happy", "Grateful", "Hopeful"].includes(f.feeling)
                    )
                    .map((feeling, index) => (
                      <ScrollAnimation
                        key={feeling.id}
                        delay={0.1 * index}
                        threshold={0.1}
                      >
                        <FeelingCard
                          feeling={feeling}
                          onLike={handleLike}
                          showCommentInput={showCommentInput === feeling.id}
                          setShowCommentInput={setShowCommentInput}
                          commentText={commentText}
                          setCommentText={setCommentText}
                          onAddComment={handleAddComment}
                          editingComment={editingComment}
                          editCommentText={editCommentText}
                          setEditCommentText={setEditCommentText}
                          handleEditComment={handleEditComment}
                          saveEditedComment={saveEditedComment}
                          cancelEditComment={cancelEditComment}
                          deleteComment={deleteComment}
                          variants={item}
                          commentsRef={commentsRef}
                        />
                      </ScrollAnimation>
                    ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="sad">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4 mt-4"
                >
                  {feelings
                    .filter((f) =>
                      ["Sad", "Anxious", "Angry", "Overwhelmed"].includes(
                        f.feeling
                      )
                    )
                    .map((feeling, index) => (
                      <ScrollAnimation
                        key={feeling.id}
                        delay={0.1 * index}
                        threshold={0.1}
                      >
                        <FeelingCard
                          feeling={feeling}
                          onLike={handleLike}
                          showCommentInput={showCommentInput === feeling.id}
                          setShowCommentInput={setShowCommentInput}
                          commentText={commentText}
                          setCommentText={setCommentText}
                          onAddComment={handleAddComment}
                          editingComment={editingComment}
                          editCommentText={editCommentText}
                          setEditCommentText={setEditCommentText}
                          handleEditComment={handleEditComment}
                          saveEditedComment={saveEditedComment}
                          cancelEditComment={cancelEditComment}
                          deleteComment={deleteComment}
                          variants={item}
                          commentsRef={commentsRef}
                        />
                      </ScrollAnimation>
                    ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="neutral">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4 mt-4"
                >
                  {feelings
                    .filter((f) => ["Confused"].includes(f.feeling))
                    .map((feeling, index) => (
                      <ScrollAnimation
                        key={feeling.id}
                        delay={0.1 * index}
                        threshold={0.1}
                      >
                        <FeelingCard
                          feeling={feeling}
                          onLike={handleLike}
                          showCommentInput={showCommentInput === feeling.id}
                          setShowCommentInput={setShowCommentInput}
                          commentText={commentText}
                          setCommentText={setCommentText}
                          onAddComment={handleAddComment}
                          editingComment={editingComment}
                          editCommentText={editCommentText}
                          setEditCommentText={setEditCommentText}
                          handleEditComment={handleEditComment}
                          saveEditedComment={saveEditedComment}
                          cancelEditComment={cancelEditComment}
                          deleteComment={deleteComment}
                          variants={item}
                          commentsRef={commentsRef}
                        />
                      </ScrollAnimation>
                    ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollAnimation>
      </motion.div>
    </div>
  );
}

interface FeelingCardProps {
  feeling: {
    id: number;
    content: string;
    feeling: string;
    timestamp: string;
    likes: number;
    comments: number;
    isLiked: boolean;
    commentsList: { id: number; content: string; timestamp: string }[];
  };
  onLike: (id: number) => void;
  showCommentInput: boolean;
  setShowCommentInput: (id: number | null) => void;
  commentText: string;
  setCommentText: (text: string) => void;
  onAddComment: (id: number) => void;
  editingComment: { feelingId: number; commentId: number } | null;
  editCommentText: string;
  setEditCommentText: (text: string) => void;
  handleEditComment: (feelingId: number, commentId: number) => void;
  saveEditedComment: (feelingId: number, commentId: number) => void;
  cancelEditComment: () => void;
  deleteComment: (feelingId: number, commentId: number) => void;
  variants: Variants;
  commentsRef: React.RefObject<HTMLDivElement | null>;
}

function FeelingCard({
  feeling,
  onLike,
  showCommentInput,
  setShowCommentInput,
  commentText,
  setCommentText,
  onAddComment,
  editingComment,
  editCommentText,
  setEditCommentText,
  handleEditComment,
  saveEditedComment,
  cancelEditComment,
  deleteComment,
  variants,
  commentsRef,
}: FeelingCardProps) {
  const feelingType =
    feelingTypes.find((type) => type.name === feeling.feeling) ||
    feelingTypes[0];

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="transform transition-all duration-200"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/30">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-primary/20">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-sm font-medium">Anonymous</span>
                <p className="text-xs text-muted-foreground">
                  {feeling.timestamp}
                </p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Badge className={feelingType.color}>
                {feelingType.emoji} {feeling.feeling}
              </Badge>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{feeling.content}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start pt-0">
          <div className="flex items-center gap-4 w-full pb-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-1 transition-colors duration-300",
                  feeling.isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "hover:text-red-400"
                )}
                onClick={() => onLike(feeling.id)}
              >
                <Heart
                  className="h-4 w-4"
                  fill={feeling.isLiked ? "currentColor" : "none"}
                />
                <span>{feeling.likes}</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-1 transition-colors duration-300",
                  showCommentInput
                    ? "text-blue-500 hover:text-blue-600"
                    : "hover:text-blue-400"
                )}
                onClick={() =>
                  setShowCommentInput(showCommentInput ? null : feeling.id)
                }
              >
                <MessageCircle
                  className="h-4 w-4"
                  fill={showCommentInput ? "currentColor" : "none"}
                />
                <span>{feeling.comments}</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-auto"
            >
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 hover:text-green-500 transition-colors duration-300"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful</span>
              </Button>
            </motion.div>
          </div>

          {/* Comments section */}
          <AnimatePresence>
            {feeling.commentsList.length > 0 && (
              <motion.div
                className="w-full border-t pt-3 space-y-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                ref={commentsRef}
              >
                <h4 className="text-sm font-medium">Comments</h4>
                <AnimatePresence>
                  {feeling.commentsList.map(
                    (comment: {
                      id: number;
                      content: string;
                      timestamp: string;
                    }) => (
                      <motion.div
                        key={comment.id}
                        className="flex gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Avatar className="h-6 w-6 border-2 border-primary/10">
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="bg-muted p-2 rounded-md text-sm flex-1 hover:bg-muted/80 transition-colors duration-200">
                          {editingComment?.feelingId === feeling.id &&
                          editingComment?.commentId === comment.id ? (
                            <div className="flex flex-col gap-2">
                              <Textarea
                                value={editCommentText}
                                onChange={(e) =>
                                  setEditCommentText(e.target.value)
                                }
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
                                  onClick={() =>
                                    saveEditedComment(feeling.id, comment.id)
                                  }
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
                                      onClick={() =>
                                        handleEditComment(
                                          feeling.id,
                                          comment.id
                                        )
                                      }
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() =>
                                        deleteComment(feeling.id, comment.id)
                                      }
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {comment.timestamp}
                              </p>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comment input */}
          <AnimatePresence>
            {showCommentInput && (
              <motion.div
                className="w-full pt-3 flex gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Avatar className="h-6 w-6 border-2 border-primary/10">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Add a supportive comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[60px] text-sm flex-1 focus:border-primary/50"
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      size="sm"
                      onClick={() => onAddComment(feeling.id)}
                      className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
