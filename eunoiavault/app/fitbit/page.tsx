"use client";

import React, { useState, useEffect } from "react";

const FitbitConnect: React.FC = () => {
  const [activitySummary, setActivitySummary] = useState<any>(null);

  const FITBIT_CLIENT_ID = "23Q35R"; 
  const REDIRECT_URI = "http://localhost:3000/fitbit";

  const connectFitbit = () => {
    const scope = "activity";
    const fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=${FITBIT_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${scope}`;
    window.location.href = fitbitAuthUrl;
  };

  const fetchActivitySummary = async (accessToken: string) => {
    try {
      const response = await fetch("https://api.fitbit.com/1/user/-/activities/date/2024-12-21.json", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setActivitySummary(data);
      } else {
        console.error("Failed to fetch activity summary");
      }
    } catch (error) {
      console.error("Error fetching activity summary:", error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", ""));
      const accessToken = params.get("access_token");
      if (accessToken) {
        fetchActivitySummary(accessToken);
      }
    }
  }, []);

  return (
    <div className="fitbit-connect">
      <h1>Connect Your Fitbit Account</h1>
      {!activitySummary ? (
        <button
          onClick={connectFitbit}
          className="btn-connect"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Connect Fitbit Account
        </button>
      ) : (
        <div className="activity-summary">
          <h2>Activity Summary</h2>
          <pre>{JSON.stringify(activitySummary, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FitbitConnect;
