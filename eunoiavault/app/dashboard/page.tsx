"use client"
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, MessageCircle, Calendar, ClipboardList, Gamepad, Brain } from 'lucide-react'
import useMeditationStaking from '@/hooks/useMeditationStakingContract'

export default function Dashboard() {
  const {userData}=useMeditationStaking()
  console.log(userData)
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Mental Health Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Daily Check-In</CardTitle>
            <CardDescription>Record your mood and thoughts</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart className="w-12 h-12 mb-4 text-primary" />
            <p>Track your daily mental state and receive AI-powered insights.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/input">Start Check-In</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Chatbot</CardTitle>
            <CardDescription>Chat with our mental health AI</CardDescription>
          </CardHeader>
          <CardContent>
            <MessageCircle className="w-12 h-12 mb-4 text-primary" />
            <p>Get personalized support and advice from our AI chatbot.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/chatbot">Start Chat</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mood Calendar</CardTitle>
            <CardDescription>View your mood history</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar className="w-12 h-12 mb-4 text-primary" />
            <p>Write journals visualize your mood patterns over time.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/calendar">View Calendar</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mini Games</CardTitle>
            <CardDescription>Relax and have fun while tracking your progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <Gamepad className="w-12 h-12 mb-4 text-primary" />
            <p>Enjoy mini games designed to boost your mood and well-being.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/mini-games">Play Now</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire</CardTitle>
            <CardDescription>Complete mental health assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <ClipboardList className="w-12 h-12 mb-4 text-primary" />
            <p>Take standardized mental health questionnaires for more in-depth analysis.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/questionnaire">Start Questionnaire</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Meditation</CardTitle>
            <CardDescription>Set a timer and relax with calming music</CardDescription>
          </CardHeader>
          <CardContent>
            <Brain className="w-12 h-12 mb-4 text-primary" />
            <p>Set a timer and relax with soothing music to unwind.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/meditation">Start Meditation</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

