import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  request.cookies.get("nextjs");

  request.cookies.has("nextjs"); // => true
  request.cookies.delete("nextjs");
  request.cookies.has("nextjs"); // => false

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();

  response.cookies.set("vercel", "fast");
  response.cookies.set("tech", "nex-js");
  response.cookies.set({
    name: "teo",
    value: "technologies",
    path: "/",
  });

  return response;
}
