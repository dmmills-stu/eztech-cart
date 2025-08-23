"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import '../../styles/AboutPage.css'
import AuthGuard from "@/components/AuthGuard";

const AboutPage = () => {
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
      <main className="about-page-main">
        <h2>About Us Page Coming Soon!</h2>
      </main>
    </AuthGuard>
  );
};

export default AboutPage;