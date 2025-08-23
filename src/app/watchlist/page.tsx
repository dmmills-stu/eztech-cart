"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import '../../styles/WatchlistPage.css'
import AuthGuard from "@/components/AuthGuard";

const WatchlistPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login"); // Redirect to login automatically
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return(
    <AuthGuard>
      <main className="watchlist-page-main">
        <h2>Watch List Page Coming Soon!</h2>
      </main>
    </AuthGuard>
  );
};

export default WatchlistPage;