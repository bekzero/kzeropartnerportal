"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-full border border-zinc-700 transition-all text-sm font-medium"
        >
            <LogOut className="w-4 h-4" />
            Sign Out
        </button>
    );
}
