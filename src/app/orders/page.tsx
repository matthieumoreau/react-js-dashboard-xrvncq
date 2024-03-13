"use client";
import { useSession } from "next-auth/react";
import useSWR, { SWRConfig } from "swr";
import axios from "axios";
import Orders from "@/components/Orders";
import { useState } from "react";

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
  const [pageIndex, setPageIndex] = useState(1);
  const [search_term, setSearchTerm] = useState("");

  const { data: orders } = useSWR(
    status === "authenticated" && session
      ? [`https://freddy.codesubmit.io/orders?page=${pageIndex}&q=${search_term}`, session.accessToken]
      : null,
    ([url, token]) => fetcher(url, token)
  );

  console.log("orders", orders);
  return (
      <main className="orders">
        <h1 className="text-4xl font-semibold mb-5">Orders</h1>
        <Orders data={orders?.orders} pageIndex={pageIndex} setPageIndex={setPageIndex}/>
      </main>
  );
}
