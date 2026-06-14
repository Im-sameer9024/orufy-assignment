import { cloudinary } from '../../config/cloudinary.js';

export const UploadImageToCloudinary = async (file) => {
  try {
    if (!file) {
      throw new Error('Image is required');
    }

    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error('Only image files are allowed');
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

    if (file.size > MAX_SIZE) {
      throw new Error('Image size exceeds 5MB');
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'products',

          resource_type: 'image',

          transformation: [
            {
              width: 1200,
              crop: 'limit',
            },
            {
              quality: 'auto',
            },
            {
              fetch_format: 'auto',
            },
          ],
        },
        (error, result) => {
          if (error) return reject(error);

          resolve(result);
        }
      );

      stream.end(file.buffer);
    });

    return result;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};

export const DeleteImageFromCloudinary = async (public_id) => {
  try {
    if (!public_id) {
      throw new Error('Public ID is required to delete image');
    }
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.error('Cloudinary Delete Error:', error);
    throw error;
  }
};
