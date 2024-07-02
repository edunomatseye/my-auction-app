import fs from "node:fs/promises";

import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export async function POST(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const newUrl = new URL(url);

    console.log(newUrl.searchParams.size);
    const formData = await request.formData();

    const file = formData.get("file")![0] as File;
    const arrayBuffer = await file.arrayBuffer();

    await fs.writeFile(
      `./public/images/${file.name}`,
      Buffer.from(arrayBuffer)
    );

    revalidatePath("/");

    return NextResponse.json({ message: "Successfully uploaded image." });
  } catch (e) {
    console.error("Error uploading Image: " + e.message);

    return NextResponse.json({ message: "Error uploading image." });
  }
}
