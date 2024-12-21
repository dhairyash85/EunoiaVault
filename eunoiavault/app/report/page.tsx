'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useReports } from '@/hooks/useReports' 

interface GraphDataItem {
  date: string;
  moodScore: number;
}


export default function Report() {
  const { graphData } = useReports()

  // Calculate the average mood score for the summary
  const averageMoodScore = graphData.length > 0
    ? graphData.reduce((sum: number, item: GraphDataItem) => sum + item.moodScore, 0) / graphData.length
    : 0

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Mental Health Report</h1>
      <Card>
        <CardHeader>
          <CardTitle>Mood Trends</CardTitle>
          <CardDescription>Your mood scores over the past Checkins</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="moodScore" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>A brief overview of your mental health</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Based on your check-ins and mood scores, here&apos;s a summary of your mental health:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Your average mood score this week is {averageMoodScore.toFixed(1)} out of 10.</li>
            <li>You&apos;ve been consistently checking in, which is great for tracking your mental health.</li>
            <li>Your responses indicate mild symptoms of anxiety. Consider using some of our suggested coping strategies.</li>
            <li>Your sleep patterns have been irregular. Improving sleep hygiene might help your overall mental state.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
