import fs from "node:fs/promises";

import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();

    await fs.writeFile(
      `./public/images/${file.name}`,
      Buffer.from(arrayBuffer),
    );

    revalidatePath("/");

    return NextResponse.json(
      { message: "Successfully uploaded image." },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    );
  } catch (_e) {
    return NextResponse.json({ message: "Error uploading image." });
  }
}
