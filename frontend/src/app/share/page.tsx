"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TypingAnimation } from "@/components/magicui/typing-animation"

export default function SharePage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to the server
    try {
      // Simulate success
      setSubmitted(true)
      setError(false)
      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    } catch {
      setError(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <TypingAnimation className="text-3xl font-bold tracking-tight mb-6 text-blue-500">Share Your Story</TypingAnimation>
        <p className="text-muted-foreground mb-8">
          Your experiences matter. Share your journey in a safe, anonymous space where others can find comfort and
          connection.
        </p>

        {submitted && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Thank you for sharing</AlertTitle>
            <AlertDescription className="text-green-600">
              Your story has been submitted and will be reviewed before being published. Your courage to share helps
              others feel less alone.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>There was a problem submitting your story. Please try again later.</AlertDescription>
          </Alert>
        )}

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Your Experience</CardTitle>
              <CardDescription>
                Share as much or as little as you feel comfortable with. All stories are anonymous by default.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Give your story a title" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="stress">Stress</SelectItem>
                    <SelectItem value="self-esteem">Self-esteem</SelectItem>
                    <SelectItem value="relationships">Relationships</SelectItem>
                    <SelectItem value="academic">Academic Pressure</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="story">Your Story</Label>
                <Textarea id="story" placeholder="Share your experience..." className="min-h-[200px]" required />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="anonymous" defaultChecked />
                <Label htmlFor="anonymous">Keep my story anonymous</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="dark:bg-red-500 bg-red-500 hover:bg-red-600 hover:text-white text-white dark:text-white dark:hover:bg-white dark:hover:text-red-500" type="button" variant="outline">
                Cancel
              </Button>
              <Button className="dark:text-white dark:hover:bg-teal-500" type="submit">Submit Story</Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 p-4 bg-primary/5 rounded-lg">
          <h3 className="font-medium mb-2">Before you share:</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Your story will be reviewed before being published</li>
            <li>Remove any personally identifying information</li>
            <li>Be respectful of yourself and others</li>
            <li>If you are in crisis, please reach out to emergency services or a mental health professional</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

