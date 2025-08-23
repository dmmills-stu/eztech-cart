"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import '../../styles/ProfilePage.css';
import AuthGuard from "@/components/AuthGuard";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login"); // Redirect to login automatically
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <AuthGuard>
      <main className="profile-main">
        <h1 className="profile-header">Current Profile</h1>
        <div className="profile-card">
          <img
            src={session?.user?.image || "/icons/default-avatar.png"}
            alt="User avatar"
            className="profile-avatar"
          />
          <div className="profile-info">
            <div className="profile-name">
              {session?.user?.name || "User"}
            </div>
            <div className="profile-email">
              {session?.user?.email || "No email available"}
            </div>
          </div>
          <button
            className="logout-button"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>
        </div>
      </main>
    </AuthGuard>
  );
};

export default ProfilePage;