"use client";

// libraries
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// widgets
import Calculator from "@/components/calculator";
import QRCodeModal from "@/components/qr_code";
import Side from "@/components/side";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [toggleQR, setToggleQR] = useState(false);

  return (
    <main className="flex min-h-screen flex-row items-center justify-between bg-green-50 text-slate-900">
      <div className="min-h-screen flex-grow flex flex-col justify-center items-center">
        <Calculator />
      </div>

      <Side />
    </main>
  );
}
