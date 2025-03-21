import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file") as File;

    if (!file) {
      return NextResponse.json({
        error: "No file provided",
        success: false,
      }, { status: 400 });
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(bytes);

    // Return file details in the response
    return NextResponse.json({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
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
