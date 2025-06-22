import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../libs/cloudinary';
import formidable, { Fields, Files } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) return res.status(500).json({ message: 'Error parsing file' });

    const fileData = files.file;
    if (!fileData) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const file = Array.isArray(fileData) ? fileData[0] : fileData;

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: 'uploads', // optional
      });
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: 'Upload failed', error });
    }
  });
}