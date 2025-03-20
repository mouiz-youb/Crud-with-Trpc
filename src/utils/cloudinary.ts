// utils/cloudinary.ts
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image to Cloudinary and returns the secure URL.
 * @param imagePath - The path or base64 string of the image to upload.
 * @returns The secure URL of the uploaded image.
 */
export const uploadImage = async (imagePath: string): Promise<string> => {
  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(imagePath, {
      folder: 'products', // Optional: specify a folder in Cloudinary
    });
    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

export default cloudinary;