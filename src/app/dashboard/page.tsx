"use client";
import { useSession } from "next-auth/react";

import useSWR from "swr";
import LoginForm from "@/components/ui/LoginForm";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Bestsellers from "@/components/Bestsellers";


export default function Page() {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (session) {
      fetch('https://freddy.codesubmit.io/dashboard', {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setDashboardData(data.dashboard); // update state with fetched data
      })
    }
  }, [session])

  console.log('dashboardData', dashboardData);

  return (
    <main className="dashboard flex-grow">
    <h1 className="text-2xl font-semibold">Dashboard</h1>
    
    
    <Bestsellers data={dashboardData?.bestsellers} />

    </main>
  );
}
