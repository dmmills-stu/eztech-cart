"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";
import '../../styles/SearchPage.css'

const SearchPage = () => {
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
      <main className="search-page-main">
        <h2>Search Page Coming Soon!</h2>
      </main>
    </AuthGuard>
  );
};

export default SearchPage;