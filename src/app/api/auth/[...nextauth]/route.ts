import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

// In a real app, you'd use bcrypt to compare passwords. 
// For this local portal, we'll keep it simple or implement a basic check.
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    console.log("Missing credentials");
                    return null;
                }

                console.log("Looking up user:", credentials.username);
                console.log("Password provided:", credentials.password);
                const user = await prisma.user.findUnique({
                    where: { username: credentials.username },
                });

                console.log("Found user:", user?.username, "with password:", user?.password);
                console.log("Password match:", user?.password === credentials.password);
                console.log("Password types - DB:", typeof user?.password, "Input:", typeof credentials.password);

                if (user && user.password === credentials.password) {
                    return {
                        id: user.id,
                        name: user.username,
                        email: user.username,
                        role: user.role,
                    };
                }
                console.log("Auth failed - user:", !!user, "password match:", user?.password === credentials.password);
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
