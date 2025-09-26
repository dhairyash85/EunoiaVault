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
import { ThemedThreads } from "@/components/ui/ThemedThreads";
import GradientBlinds from "@/components/GradientBlinds";

export default function Home() {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden">

      {/* Background Threads */}
      <div className="absolute inset-0 -z-10">
        <ThemedThreads
          amplitude={1.2}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center space-y-6 px-4">
        <div className="text-center space-y-4 flex flex-col items-center">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="Eunoia Vault Logo"
            />
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to
          </h2>
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Eunoia Vault
          </h2>
          <p className="text-xl text-muted-foreground">
            Your AI-powered mental health companion
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl px-4">
          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <Brain className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                Get personalized mental health support based on your daily
                check-ins.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <Heart className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Coping Strategies</CardTitle>
              <CardDescription>
                Discover effective techniques to manage your mental well-being.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
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