import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { LogoutButton } from "@/components/auth/logout-button";
import Image from "next/image";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const resources = await prisma.resource.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-6">
                        <div className="relative w-40 h-12">
                            <Image
                                src="/logo-v2.png"
                                alt="KZero Passwordless Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="h-12 w-px bg-zinc-800"></div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Partner Resources</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {(session.user as any).role === "ADMIN" && (
                            <a
                                href="/admin"
                                className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full border border-zinc-700 transition-all"
                            >
                                Admin Console
                            </a>
                        )}
                        <LogoutButton />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed">
                            <p className="text-zinc-500">No resources available yet.</p>
                        </div>
                    ) : (
                        resources.map((resource) => (
                            <div
                                key={resource.id}
                                className="p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all group"
                            >
                                <div className="text-sm text-blue-400 font-medium mb-2 uppercase tracking-wider">
                                    {resource.category || "General"}
                                </div>
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                                    {resource.title}
                                </h2>
                                <p className="text-zinc-400 text-sm mb-6 line-clamp-2">
                                    {resource.description || "No description provided."}
                                </p>
                                <a
                                    href={resource.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm font-semibold text-white group-hover:underline"
                                >
                                    Download PDF
                                    <svg
                                        className="ml-2 w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
