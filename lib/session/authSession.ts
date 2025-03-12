"use server";

import { jwtVerify, SignJWT, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { SessionSecretKey } from "@/utils/envSettings";

const encodedKey = new TextEncoder().encode(SessionSecretKey);

interface AuthPayload extends JWTPayload {
    user: any;
    accessToken: any;
}

export async function createAuthSession(payload: AuthPayload): Promise<void> {
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);

    (await cookies()).set("authSession", session, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function getAuthSession(): Promise<AuthPayload | null> {
    const cookie = (await cookies()).get("authSession")?.value;
    if (!cookie) return null;

    try {
        const { payload } = await jwtVerify<AuthPayload>(cookie, encodedKey, {
            algorithms: ["HS256"],
        });

        return payload;
    } catch (error) {
        if (error instanceof Error && error.name === "JWTExpired") {
            console.error("Token expired:", error);
            return null;
        }
        console.error("JWT verification failed:", error);
        return null;
    }
}

export async function deleteAuthSession(): Promise<boolean> {
    const cookieStore = await cookies();
    cookieStore.delete("authSession");
    return true;
}
