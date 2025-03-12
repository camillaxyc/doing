"use client";

import { useState } from "react";

export default function Activities() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-12 p-8 border-2 border-transparent rounded-2xl bg-gray-300/20">
        <div>Generate Activity</div>
      </div>
    </div>
  );
}
