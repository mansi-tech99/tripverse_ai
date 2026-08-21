"use client";

import React, { useContext, useEffect, useState } from "react";
import Header from "./_components/Header";
import Footer from "@/components/ui/Footer";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";
import { TripDetailContext } from "@/context/TripDetailContext";
import { TripInfo } from "./create-new-trip/_components/types";
import { ThemeProvider } from "next-themes";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);
  const createUserMutation = useMutation(api.user.CreateNewUser);

  const CreateNewUser = async () => {
    if (!user) return;

    try {
      const createdUser = await createUserMutation({
        email: user.emailAddresses[0]?.emailAddress ?? "",
        imageUrl: user.imageUrl,
        name: user.fullName ?? "",
      });

      setUserDetail(createdUser);
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UserDetailContext.Provider value={[userDetail, setUserDetail]}>
        <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
          <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#060913]">
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </TripDetailContext.Provider>
      </UserDetailContext.Provider>
    </ThemeProvider>
  );
}

export const useUserDetail = () => {
  return useContext(UserDetailContext);
}

export const useTripDetail = () => {
  const context = useContext(TripDetailContext);
  if (context === undefined) {
    throw new Error("useTripDetail must be used within a TripDetailProvider");
  }
  return context;
}
