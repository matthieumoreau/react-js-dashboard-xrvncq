"use client";
import { useSession } from "next-auth/react";

import useSWR from "swr";
import LoginForm from "@/components/ui/LoginForm";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Bestsellers from "@/components/Bestsellers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (session) {
      fetch("https://freddy.codesubmit.io/dashboard", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDashboardData(data.dashboard); // update state with fetched data
        });
    }
  }, [session]);

  console.log("dashboardData", dashboardData);

  return (
    <main className="dashboard ">
      <h1 className="text-4xl font-semibold">Dashboard</h1>

      <div className="flex justify-between py-5">
        <Card>
          <CardHeader>
            <CardTitle>Today</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last week</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription></CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last month</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription></CardDescription>
          </CardContent>
        </Card>
      </div>

      <Bestsellers data={dashboardData?.bestsellers} />
    </main>
  );
}
