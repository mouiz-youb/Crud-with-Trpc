import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utils/cloudinary";
import { db } from "@/server/db";
export async function POST(req: NextRequest) {
  try {
    // **Ensure Content-Type is correct**
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid Content-Type" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // **Upload image to Cloudinary**
    const imageUrl = await uploadImage(file);

    // **Store in database using Prisma**
    const newProduct = await db.product.create({
      data: {
        name,
        price: parseFloat(price),
        image: imageUrl,
      },
    });

    return NextResponse.json({ imageUrl, product: newProduct }, { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
