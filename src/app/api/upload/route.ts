import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file :File |null = data.get("file") as unknown as  File;

    if (!file) {
      return NextResponse.json({
        error: "No file provided",
        success: false,
      }, { status: 400 });
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(bytes);
    // convert buffer to base64 for easy rendering on client side 
    // const base64String = fileBuffer.toString("base64");
    const base64Image = `data:${file.type};base64,${fileBuffer.toString(`base64`)}`
    // Return file details in the response
    return NextResponse.json({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileUrl :base64Image,
      fileContent: fileBuffer.toString("base64"), // Convert buffer to Base64 string
      success: true,
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({
      error: "Internal Server Error",
      success: false,
    }, { status: 500 });
  }
}
