"use client";

// libraries
import { createContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// widgets
import Calculator from "@/components/calculator";
import QRCodeModal from "@/components/qr_code";
import Side from "@/components/side";

export const HomeContext = createContext();

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [toggleQR, setToggleQR] = useState(false);
  const [items, setItems] = useState([]);

  return (
    <HomeContext.Provider value={{ items, setItems }}>
      <main className="flex min-h-screen flex-row items-center justify-between bg-green-50 text-slate-900">
        <div className="min-h-screen flex-grow flex flex-col justify-center items-center">
          <Calculator />
        </div>

        <Side />
      </main>
    </HomeContext.Provider>
  );
}
