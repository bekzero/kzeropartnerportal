"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [category, setCategory] = useState("General");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleAddResource = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("fileUrl", fileUrl);
            formData.append("category", category);

            // Dynamically import the action to avoid bundling issues in client components if needed,
            // but direct import is fine here since it's a server action.
            const { createResource } = await import("@/actions/resources");
            const result = await createResource(formData);

            if (result.error) {
                setError(result.error);
            } else {
                setTitle("");
                setDescription("");
                setFileUrl("");
                alert("Resource published successfully!");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">Admin Console</h1>
                        <p className="text-zinc-400 mt-2">Manage partner resources</p>
                    </div>
                    <a
                        href="/dashboard"
                        className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full border border-zinc-700 transition-all"
                    >
                        Back to Dashboard
                    </a>
                </header>

                <section className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6">Add New Resource</h2>
                    {error && (
                        <div className="p-3 mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleAddResource} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400 ml-2">Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Q1 Marketing Guide"
                                    className="w-full px-6 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400 ml-2">Category</label>
                                <select
                                    className="w-full px-6 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option>General</option>
                                    <option>Marketing</option>
                                    <option>Sales Enablement</option>
                                    <option>Technical</option>
                                    <option>Road Map/Release Notes</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400 ml-2">PDF URL (Mock)</label>
                            <input
                                type="text"
                                required
                                placeholder="https://example.com/resource.pdf"
                                className="w-full px-6 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={fileUrl}
                                onChange={(e) => setFileUrl(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400 ml-2">Description</label>
                            <textarea
                                rows={3}
                                placeholder="Short description for partners..."
                                className="w-full px-6 py-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/10 transition-all active:scale-[0.98]"
                        >
                            {loading ? "Adding..." : "Publish Resource"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}
