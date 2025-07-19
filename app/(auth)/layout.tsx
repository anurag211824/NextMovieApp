"use client";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Theme } from "@radix-ui/themes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useContext(AppContext);
  const theme = context?.theme || "light";

  return (
    <Theme appearance={theme === "light" ? "light" : "dark"}>
      <div className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-white"}`}>
        {children}
      </div>
    </Theme>
  );
}
