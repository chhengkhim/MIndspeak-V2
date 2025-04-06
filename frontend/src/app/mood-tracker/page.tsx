"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Smile, Meh, Frown, TrendingUp, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { TypingAnimation } from "@/components/magicui/typing-animation"

// Sample mood data
const moodData = [
  { date: "2023-04-01", mood: "happy", note: "Had a great day at university" },
  { date: "2023-04-02", mood: "sad", note: "Struggled with assignment deadline" },
  { date: "2023-04-03", mood: "neutral", note: "Regular day, nothing special" },
  { date: "2023-04-04", mood: "happy", note: "Got good feedback on my project" },
  { date: "2023-04-05", mood: "sad", note: "Feeling overwhelmed with coursework" },
  { date: "2023-04-06", mood: "happy", note: "Spent time with friends" },
  { date: "2023-04-07", mood: "neutral", note: "Just an ordinary day" },
  { date: "2023-04-08", mood: "happy", note: "Weekend relaxation" },
  { date: "2023-04-09", mood: "happy", note: "Family time" },
  { date: "2023-04-10", mood: "sad", note: "Monday blues and exam stress" },
  { date: "2023-04-11", mood: "neutral", note: "Getting through the week" },
  { date: "2023-04-12", mood: "happy", note: "Made progress on assignments" },
  { date: "2023-04-13", mood: "sad", note: "Feeling anxious about presentation" },
  { date: "2023-04-14", mood: "neutral", note: "Tired but managing" },
]

// Convert to a format for the calendar
const moodByDate = moodData.reduce((acc: Record<string, string>, curr) => {
  acc[curr.date] = curr.mood
  return acc
}, {})

export default function MoodTrackerPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeframe, setTimeframe] = useState("week")

  // Calculate mood statistics
  const moodCounts = moodData.reduce((acc: Record<string, number>, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1
    return acc
  }, {})

  const totalMoods = moodData.length
  const happyPercentage = Math.round(((moodCounts.happy || 0) / totalMoods) * 100)
  const neutralPercentage = Math.round(((moodCounts.neutral || 0) / totalMoods) * 100)
  const sadPercentage = Math.round(((moodCounts.sad || 0) / totalMoods) * 100)

  // Filter moods for the selected date
  const selectedDateStr = date ? date.toISOString().split("T")[0] : ""
  const selectedMood = moodData.find((m) => m.date === selectedDateStr)

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <ScrollAnimation>
          <TypingAnimation className="text-3xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Mood Tracker
          </TypingAnimation>
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <p className="text-muted-foreground mb-8">
            Track your emotional wellbeing over time to identify patterns and progress.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mood Overview Card */}
          <ScrollAnimation direction="up" delay={0.2} className="md:col-span-2">
            <Card className="border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle>Your Mood Overview</CardTitle>
                <CardDescription>See how your mood has changed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-6">
                  <Tabs
                    defaultValue="week"
                    onValueChange={setTimeframe}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-md"
                  >
                    <TabsList>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-primary/20 focus:border-primary/50">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <SelectItem value="all">All Moods</SelectItem>
                      <SelectItem value="happy">Happy</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="sad">Sad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mood Chart */}
                <div className="h-[200px] flex items-end gap-1 bg-gradient-to-b from-primary/5 to-transparent p-4 rounded-lg">
                  {moodData.slice(0, timeframe === "week" ? 7 : 14).map((data, index) => (
                    <motion.div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-1"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                    >
                      <motion.div
                        className={cn(
                          "w-full rounded-t-md shadow-md",
                          data.mood === "happy"
                            ? "bg-gradient-to-t from-green-400 to-green-500 h-[80%]"
                            : data.mood === "neutral"
                              ? "bg-gradient-to-t from-yellow-400 to-yellow-500 h-[50%]"
                              : "bg-gradient-to-t from-red-400 to-red-500 h-[30%]",
                        )}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      />
                      <span className="text-xs text-muted-foreground">{new Date(data.date).getDate()}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">Happy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Neutral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">Sad</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          {/* Mood Stats Card */}
          <ScrollAnimation direction="up" delay={0.3}>
            <Card className="border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle>Mood Statistics</CardTitle>
                <CardDescription>Your emotional balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Smile className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Happy</span>
                      </div>
                      <span className="text-sm font-medium">{happyPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${happyPercentage}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Meh className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Neutral</span>
                      </div>
                      <span className="text-sm font-medium">{neutralPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${neutralPercentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Frown className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Sad</span>
                      </div>
                      <span className="text-sm font-medium">{sadPercentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${sadPercentage}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Mood Trend</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Last 14 days</span>
                  </div>
                  <p className="text-sm mt-2">Your mood has been mostly positive. Keep up the good work!</p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimation>

          {/* Calendar Card */}
          <ScrollAnimation direction="up" delay={0.4} className="md:col-span-2">
            <Card className="border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle>Mood Calendar</CardTitle>
                <CardDescription>Select a date to see your mood</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-primary/20"
                  modifiers={{
                    happy: (date) => {
                      const dateStr = date.toISOString().split("T")[0]
                      return moodByDate[dateStr] === "happy"
                    },
                    neutral: (date) => {
                      const dateStr = date.toISOString().split("T")[0]
                      return moodByDate[dateStr] === "neutral"
                    },
                    sad: (date) => {
                      const dateStr = date.toISOString().split("T")[0]
                      return moodByDate[dateStr] === "sad"
                    },
                  }}
                  modifiersClassNames={{
                    happy: "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-50",
                    neutral: "bg-yellow-100 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-50",
                    sad: "bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-50",
                  }}
                />
              </CardContent>
            </Card>
          </ScrollAnimation>

          {/* Selected Day Mood Card */}
          <ScrollAnimation direction="up" delay={0.5}>
            <Card className="border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle>Daily Mood</CardTitle>
                <CardDescription>
                  {date
                    ? date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Select a date"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedMood ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-md"
                      >
                        {selectedMood.mood === "happy" ? "😊" : selectedMood.mood === "neutral" ? "😐" : "😔"}
                      </motion.div>
                    </div>

                    <div className="text-center">
                      <h3 className="font-medium capitalize">{selectedMood.mood}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{selectedMood.note}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[150px] text-center">
                    <CalendarIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No mood recorded for this date.
                      <br />
                      Select a highlighted date or log a new mood.
                    </p>
                  </div>
                )}

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-primary/20 transition-all duration-300">
                    {selectedMood ? "Update Mood" : "Log Mood for Today"}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </motion.div>
    </div>
  )
}

