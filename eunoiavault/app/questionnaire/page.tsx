'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useQuestionnaire } from "@/hooks/useQuestionnaire"

export default function Questionnaire() {
  const {
    questions,
    options,
    answers,
    currentQuestion,
    response,
    loading,
    handleAnswer,
    handleSubmit,
    setCurrentQuestion,
  } = useQuestionnaire();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Mental Health Questionnaire</CardTitle>
        <CardDescription>Please answer the following questions about your mental health over the past two weeks</CardDescription>
      </CardHeader>

      <CardContent>
        {response ? (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Thank you for completing the questionnaire</h2>
            <p>{response}</p>
          </div>
        ) : (
          currentQuestion < questions.length && (
            <div key={questions[currentQuestion].id}>
              <h2 className="text-lg font-semibold mb-4">{questions[currentQuestion].text}</h2>
              <RadioGroup onValueChange={handleAnswer} value={answers[questions[currentQuestion].id]}>
                {options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`q${questions[currentQuestion].id}-${option.value}`} />
                    <Label htmlFor={`q${questions[currentQuestion].id}-${option.value}`}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {currentQuestion > 0 && !response && (
          <Button onClick={() => setCurrentQuestion(prev => prev - 1)}>Previous</Button>
        )}
        {currentQuestion < questions.length - 1 && !response ? (
          <Button onClick={() => setCurrentQuestion(prev => prev + 1)} disabled={!answers[questions[currentQuestion].id]}>
            Next
          </Button>
        ) : null}

        {!response && (
          <Button onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length || loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
