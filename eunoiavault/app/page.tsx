import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Heart, Smile } from "lucide-react";
import Image from "next/image";

import GradientBlinds from "@/components/GradientBlinds";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <GradientBlinds
          gradientColors={["#FF9FFC", "#5227FF"]}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="right"
          mixBlendMode="lighten"
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center space-y-12">
        <div className="text-center space-y-4 flex flex-col items-center">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="eunoiavault Logo"
          />
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to EunoiaVault
          </h1>
          <p className="text-xl text-muted-foreground">
            Your AI-powered mental health companion
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Brain className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                Get personalized mental health support based on your daily
                check-ins.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Heart className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Coping Strategies</CardTitle>
              <CardDescription>
                Discover effective techniques to manage your mental well-being.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Smile className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Daily Check-Ins</CardTitle>
              <CardDescription>
                Track your mood and thoughts to gain insights into your mental
                health patterns.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Button asChild size="lg">
          <Link href="/input">Start Your Check-In</Link>
        </Button>
      </div>
    </div>
  );
}
