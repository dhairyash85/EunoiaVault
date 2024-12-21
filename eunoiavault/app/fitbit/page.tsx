"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import useMeditationStaking from "@/hooks/useMeditationStakingContract";

type FitbitData = {
  activities: Array<{
    name: string;
    calories: number;
    distance: number;
    steps: number;
    duration: number;
  }>;
  summary: {
    caloriesOut: number;
    steps: number;
    distances: Array<{ activity: string; distance: number }>;
    activeMinutes: number;
  };
  goals: {
    caloriesOut: number;
    steps: number;
    distance: number;
    activeMinutes: number;
  };
};

type LifetimeStepsData = {
  lifetime: {
    total: {
      steps: number;
    };
    tracker: {
      steps: number;
    };
  };
};

const FitbitIntegration = () => {
  const [activitySummary, setActivitySummary] = useState<FitbitData | null>(null);
  const [isLinked, setIsLinked] = useState(false);
  const {addRewards} = useMeditationStaking()

  const FITBIT_CLIENT_ID = "23Q35R"; 
  const REDIRECT_URI = "http://localhost:3000/fitbit"; 

  const connectFitbit = () => {
    const scope = "activity";
    const fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=${FITBIT_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${scope}`;
    window.location.href = fitbitAuthUrl;
  };

  // Fetch activity summary using the access token
  const fetchActivitySummary = async (accessToken: string) => {
    try {
      const response = await fetch("https://api.fitbit.com/1/user/-/activities/date/2024-12-21.json", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching activity summary");
      }

      const data = await response.json();
      setActivitySummary(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching activity summary:", error);
    }
  };

  // Fetch lifetime steps data
  const fetchLifetimeSteps = async (accessToken: string) => {
    try {
      const response = await fetch("https://api.fitbit.com/1/user/-/activities.json", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching lifetime steps data");
      }

      const data: LifetimeStepsData = await response.json();
      try{
        addRewards(data.lifetime.total.steps)
      }catch(err){
        console.log(err)
      }


      console.log("Lifetime Steps:", data.lifetime.total.steps);
    } catch (error) {
      console.error("Error fetching lifetime steps data:", error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", ""));
      const accessToken = params.get("access_token");
      if (accessToken) {
        fetchActivitySummary(accessToken);
        setIsLinked(true);
      }
    }
  }, []);

  const calculateReward = (steps: number) => {
    return (steps / 1000) * 0.1;
  };

  // Handle Claim Reward button click
  const handleClaimReward = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const accessToken = params.get("access_token");
    if (accessToken) {
      fetchLifetimeSteps(accessToken); 
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Fitbit Integration</h1>
        <Button onClick={connectFitbit} disabled={isLinked}>
          {isLinked ? "Linked" : "Link Account"}
        </Button>
      </div>

      {isLinked && activitySummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Activity Summary</CardTitle>
              <CardDescription>Here&apos;s a summary of your activity today</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Steps Card */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activitySummary.summary.steps}</div>
                    <Progress
                      value={(activitySummary.summary.steps / activitySummary.goals.steps) * 100}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Goal: {activitySummary.goals.steps}</p>
                  </CardContent>
                </Card>

                {/* Calories Card */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Calories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activitySummary.summary.caloriesOut}</div>
                    <Progress
                      value={(activitySummary.summary.caloriesOut / activitySummary.goals.caloriesOut) * 100}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Goal: {activitySummary.goals.caloriesOut}</p>
                  </CardContent>
                </Card>

                {/* Distance Card */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Distance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {activitySummary.summary.distances.find(d => d.activity === "Walk")?.distance} km
                    </div>
                    <Progress
                      value={(activitySummary.summary.distances.find(d => d.activity === "Walk")?.distance || 0) /
                        activitySummary.goals.distance *
                        100}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Goal: {activitySummary.goals.distance} km</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Minutes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activitySummary.summary.activeMinutes}</div>
                    <Progress
                      value={(activitySummary.summary.activeMinutes / activitySummary.goals.activeMinutes) * 100}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Goal: {activitySummary.goals.activeMinutes}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Claim Reward Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Claim Your Reward</CardTitle>
                  <CardDescription>Earn ETH based on your daily steps</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">
                    You&apos;ve earned {calculateReward(activitySummary.summary.steps).toFixed(3)} ETH
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Based on {activitySummary.summary.steps} steps today
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleClaimReward}>Claim Reward</Button>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default FitbitIntegration;
