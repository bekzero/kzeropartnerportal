"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createResource(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const fileUrl = formData.get("fileUrl") as string;
    const category = formData.get("category") as string;

    if (!title || !fileUrl || !category) {
        return { error: "Missing required fields" };
    }

    try {
        await prisma.resource.create({
            data: {
                title,
                description,
                fileUrl,
                category,
            },
        });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to create resource:", error);
        return { error: "Failed to create resource" };
    }
}
