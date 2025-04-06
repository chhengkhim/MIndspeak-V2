import { TypingAnimation } from "@/components/magicui/typing-animation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Phone } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <TypingAnimation className="text-3xl font-bold tracking-tight mb-6 text-blue-500">Mental Health Resources</TypingAnimation>
        <p className="text-muted-foreground mb-8">
          Find helpful resources, professional support, and educational materials to support your mental health journey.
        </p>

        <Tabs defaultValue="emergency">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="emergency">Emergency Help</TabsTrigger>
            <TabsTrigger value="campus">Campus Resources</TabsTrigger>
            <TabsTrigger value="educational">Educational Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Mental Health Support</CardTitle>
                <CardDescription>
                  If you or someone you know is in crisis, please use these resources to get immediate help.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border text-teal-600 dark:text-blue-500 font-bold border-red-200 rounded-lg p-4">
                  <h3 className="font-medium text-red-800 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Contacts
                  </h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex justify-between">
                      <span>National Emergency Number:</span>
                      <span className="font-medium">119</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Cambodia Mental Health Hotline:</span>
                      <span className="font-medium">017 276 477</span>
                    </li>
                    <li className="flex justify-between">
                      <span>TPO Cambodia Hotline:</span>
                      <span className="font-medium">017 276 477</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Crisis Centers in Phnom Penh</h3>
                  <ul className="space-y-3">
                    <li className="border-b pb-3">
                      <div className="font-medium">Khmer-Soviet Friendship Hospital</div>
                      <div className="text-sm text-muted-foreground">St 271, Phnom Penh</div>
                      <div className="text-sm">Phone: 023 883 710</div>
                    </li>
                    <li className="border-b pb-3">
                      <div className="font-medium">Calmette Hospital</div>
                      <div className="text-sm text-muted-foreground">3 Monivong Blvd (93), Phnom Penh</div>
                      <div className="text-sm">Phone: 023 426 948</div>
                    </li>
                    <li>
                      <div className="font-medium">TPO Cambodia</div>
                      <div className="text-sm text-muted-foreground">
                        #2&4, Corner of St 494 & 497, Sangkat Phsar Deum Thkov, Khan Chamkarmon, Phnom Penh
                      </div>
                      <div className="text-sm">Phone: 023 63 66 991 / 023 63 66 992</div>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full bg-teal-500 text-white hover:text-white hover:bg-teal-600" asChild>
                  <Link href="https://tpocambodia.org/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit TPO Cambodia Website
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="campus" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Paragon University Resources</CardTitle>
                <CardDescription>
                  Support services available to Paragon International University students.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Student Counseling Services</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Paragon International University offers confidential counseling services to all enrolled students.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Location:</span>
                      <span>Student Affairs Office, 2nd Floor</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Hours:</span>
                      <span>Monday-Friday, 8:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Appointment:</span>
                      <span>Email counseling@paragoniu.edu.kh</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Peer Support Groups</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Join student-led support groups to connect with peers facing similar challenges.
                  </p>
                  <ul className="space-y-3">
                    <li className="border-b pb-3">
                      <div className="font-medium">Stress Management Group</div>
                      <div className="text-sm text-muted-foreground">Wednesdays, 4:00 PM - 5:30 PM</div>
                      <div className="text-sm">Room 305</div>
                    </li>
                    <li>
                      <div className="font-medium">International Student Support Circle</div>
                      <div className="text-sm text-muted-foreground">Thursdays, 5:00 PM - 6:30 PM</div>
                      <div className="text-sm">Student Lounge</div>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book a Counseling Session</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="educational" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>Learn more about mental health through these educational materials.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Understanding Anxiety</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Learn about the symptoms, causes, and management strategies for anxiety.
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Coping with Academic Stress</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Strategies to manage the pressures of university life and academic expectations.
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Building Resilience</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Develop skills to bounce back from challenges and grow stronger through adversity.
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Mindfulness Practices</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Simple mindfulness techniques to reduce stress and improve mental wellbeing.
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full">
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Download Resources</Button>
                <Button>View All Articles</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

