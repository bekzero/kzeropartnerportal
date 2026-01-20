"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError(`Login failed: ${res.error}`);
        } else if (res?.ok) {
            router.push("/dashboard");
        } else {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
            <div className="w-full max-w-md space-y-8 p-10 bg-zinc-900/50 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-md">
                <div className="text-center flex flex-col items-center">
                    <div className="w-full mb-4">
                        <Image
                            src="/logo-login.png"
                            alt="Partner Portal Logo"
                            width={600}
                            height={200}
                            className="w-full h-auto rounded-lg"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Partner Portal</h1>
                    <p className="text-zinc-400">Sign in to access your resources</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            className="w-full px-6 py-4 bg-zinc-800/50 border border-zinc-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full px-6 py-4 bg-zinc-800/50 border border-zinc-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
