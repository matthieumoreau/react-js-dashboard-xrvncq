"use client";
import { useSession } from "next-auth/react";

import useSWR, { SWRConfig } from "swr";
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

const fetcher = (url, token) => {
  console.log("fetcher", url, token);
  return axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export default function Page() {
  const { data: session, status } = useSession();
  const { data: dashboard } = useSWR(
    status === "authenticated" && session
      ? [`https://freddy.codesubmit.io/dashboard`, session.accessToken]
      : null,
    ([url, token]) => fetcher(url, token)
  );

  const { data: orders } = useSWR(
    status === "authenticated" && session
      ? [`https://freddy.codesubmit.io/orders`, session.accessToken]
      : null,
    ([url, token]) => fetcher(url, token)
  );

  console.log("orders", orders);
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
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

        <Bestsellers data={dashboard?.dashboard?.bestsellers} />
      </main>
    </SWRConfig>
  );
}
