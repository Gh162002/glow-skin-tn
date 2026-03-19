import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
  }

  try {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB max
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Upload error:', err);
        return res.status(500).json({ success: false, message: 'Erreur lors de l\'upload' });
      }

      const file = files.image;
      if (!file) {
        return res.status(400).json({ success: false, message: 'Aucun fichier fourni' });
      }

      // Lire le fichier et le convertir en base64
      const fileData = fs.readFileSync(file.filepath);
      const base64Image = `data:${file.mimetype};base64,${fileData.toString('base64')}`;

      // Nettoyer le fichier temporaire
      fs.unlinkSync(file.filepath);

      return res.status(200).json({ 
        success: true, 
        imageUrl: base64Image 
      });
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
