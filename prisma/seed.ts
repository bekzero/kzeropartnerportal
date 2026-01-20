import { prisma } from "../src/lib/prisma.js";

async function main() {
    console.log("Starting seed...");
    try {
        const admin = await prisma.user.upsert({
            where: { username: "admin" },
            update: {},
            create: {
                username: "admin",
                password: "password123",
                role: "ADMIN",
            },
        });

        const partner = await prisma.user.upsert({
            where: { username: "partner" },
            update: {},
            create: {
                username: "partner",
                password: "password123",
                role: "PARTNER",
            },
        });

        console.log("Seeding complete:", { admin, partner });
    } catch (error) {
        console.error("Seeding error:", error);
        throw error;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
