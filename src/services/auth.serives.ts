"use server";


import { cookies } from "next/headers";
import { setTokenInCookies } from "../lib/tokenUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if(!BASE_API_URL){
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getNewTokensWithRefreshToken(refreshToken  : string) : Promise<boolean> {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Cookie : `refreshToken=${refreshToken}`
            }
        });

        if(!res.ok){
            return false;
        }

        const {data} = await res.json();

        const { accessToken, refreshToken: newRefreshToken, token } = data;

        if(accessToken){
            await setTokenInCookies("accessToken", accessToken);
        }

        if(newRefreshToken){
            await setTokenInCookies("refreshToken", newRefreshToken);
        }

        if(token){
            await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60); // 1 day in seconds
        }

        return true;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return false;
    }
}

// export async function getUserInfo() {
//     try {
//         const cookieStore = await cookies();
//         const accessToken = cookieStore.get("accessToken")?.value;

// console.log("ACCESS TOKEN EXISTS:", !!accessToken);
// console.log("ACCESS TOKEN:", accessToken);

//         if (!accessToken) {
//             return null;
//         }

//         const res = await fetch(`${BASE_API_URL}/auth/me`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Cookie: `accessToken=${accessToken}`
//             }
//         });

//         console.log(res,"userinfo");
        

//         // if (!res.ok) {
//         //     console.error("Failed to fetch user info:", res.status, res.statusText);
//         //     return null;
//         // }

//         if (!res.ok) {
//     const errorBody = await res.text();

//     console.error("Failed to fetch user info:", {
//         status: res.status,
//         statusText: res.statusText,
//         body: errorBody,
//     });

//     return null;
// }

//         const { data } = await res.json();

//         return data;
//     } catch (error) {
//         console.error("Error fetching user info:", error);
//         return null;
//     }
// }

export async function getUserInfo() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken || !sessionToken) {
      console.error("Missing authentication cookies", {
        hasAccessToken: !!accessToken,
        hasSessionToken: !!sessionToken,
      });

      return null;
    }

    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: [
          `accessToken=${accessToken}`,
          `better-auth.session_token=${sessionToken}`,
        ].join("; "),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);

      console.error("Failed to fetch user info:", {
        status: res.status,
        statusText: res.statusText,
        error: errorData,
      });

      return null;
    }

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}