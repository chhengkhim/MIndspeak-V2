import { TypingAnimation } from "@/components/magicui/typing-animation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send } from "lucide-react"
import Link from "next/link"

export default function TelegramPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <TypingAnimation className="text-3xl font-bold tracking-tight mb-6 text-center text-blue-500">Join Our Telegram Community</TypingAnimation>
        <p className="text-muted-foreground mb-8 text-center">
          Connect with our supportive community through our anonymous Telegram group.
        </p>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-primary mb-4" />
            <CardTitle>MindSpeak Telegram Group</CardTitle>
            <CardDescription>A safe space for anonymous conversations about mental health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">How It Works:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Join our Telegram group using the link below</li>
                <li>Set up an anonymous username that does not identify you</li>
                <li>Interact with our community bot to get started</li>
                <li>Share your experiences and support others in the group</li>
              </ol>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Community Guidelines:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Be respectful and supportive of others</li>
                <li>Maintain anonymity - do not share personal identifying information</li>
                <li>No hate speech, harassment, or bullying</li>
                <li>If you are in crisis, please reach out to emergency services</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-500 text-white dark:hover:bg-white dark:hover:text-blue-500 shadow-md hover:shadow-blue-500" asChild>
              <Link href="https://t.me/MindSpeakCommunity" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-4 w-4" />
                Join Telegram Group
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>

          <div>
            <h3 className="font-medium">Is the Telegram group really anonymous?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Yes, you can set up a username that does not identify you. We also have community guidelines to ensure
              everyone respects anonymity.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Who moderates the group?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              The group is moderated by trained volunteers and our automated bot to ensure a safe environment for all
              members.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Can I leave the group at any time?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Absolutely. You can leave the group at any time, and you can also delete your messages if you wish.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Is professional help available through the group?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              While our group provides peer support, it is not a substitute for professional help. We can direct you to
              professional resources if needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

