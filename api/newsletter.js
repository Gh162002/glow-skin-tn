// Vercel Serverless Function pour la newsletter
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Configuration email
const ADMIN_EMAIL = 'Salma.mh0@icloud.com';

// Fichier pour stocker les abonnés
const SUBSCRIBERS_FILE = path.join(os.tmpdir(), 'subscribers.json');

// Lire les abonnés
function getSubscribers() {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading subscribers:', error);
  }
  return [];
}

// Sauvegarder les abonnés
function saveSubscribers(subscribers) {
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving subscribers:', error);
    return false;
  }
}

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

  const { action, email, product } = req.body;

  try {
    // Créer le transporteur email pour Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    if (action === 'subscribe') {
      // Valider l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Email invalide' });
      }

      // Lire les abonnés
      let subscribers = getSubscribers();

      // Vérifier si l'email existe déjà
      if (subscribers.includes(email)) {
        return res.status(400).json({ success: false, message: 'Cet email est déjà inscrit' });
      }

      // Ajouter l'abonné
      subscribers.push(email);
      saveSubscribers(subscribers);

      // Email de bienvenue au client
      const welcomeEmail = {
        from: '"Glow Skin TN" <noreply@glowskintn.com>',
        to: email,
        subject: '🌟 Bienvenue chez Glow Skin TN!',
        html: `
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #8b45ff, #ff69b4); padding: 40px; text-align: center; color: white; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { padding: 40px; }
              .content h2 { color: #333; font-size: 22px; margin-bottom: 20px; }
              .content p { color: #666; line-height: 1.8; font-size: 16px; }
              .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 14px; }
              .btn { display: inline-block; background: #000; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class='container'>
              <div class='header'>
                <h1>✨ Bienvenue chez Glow Skin TN! ✨</h1>
              </div>
              <div class='content'>
                <h2>Merci de rejoindre notre communauté! 🖤</h2>
                <p>Nous sommes ravis de vous compter parmi la famille Glow Skin TN!</p>
                <p>Vous serez la première à découvrir:</p>
                <ul style='color: #666; line-height: 2;'>
                  <li>Les nouveaux produits des meilleures marques mondiales</li>
                  <li>Les offres et réductions exclusives</li>
                  <li>Les conseils de soins de la peau</li>
                  <li>Les cadeaux gratuits et concours</li>
                </ul>
                <p style='text-align: center;'>
                  <a href='https://glow-skin-tn.vercel.app' class='btn' style='margin-right: 10px;'>Visitez notre site</a>
                  <a href='https://www.instagram.com/glow_skin_tn' class='btn'>Suivez-nous sur Instagram</a>
                </p>
              </div>
              <div class='footer'>
                <p>© 2025 Glow Skin TN — Fait avec 🖤 en Tunisie</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      // Email de notification à l'admin
      const adminEmail = {
        from: '"Glow Skin TN" <noreply@glowskintn.com>',
        to: ADMIN_EMAIL,
        subject: '🎉 Nouvel abonné à la newsletter!',
        html: `
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .container { max-width: 500px; margin: 0 auto; background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
              h2 { color: #333; margin-bottom: 20px; }
              .email { background: #f5f5f5; padding: 15px; border-radius: 10px; font-size: 18px; font-weight: bold; color: #000; margin: 20px 0; }
              .stats { background: linear-gradient(135deg, #8b45ff, #ff69b4); color: white; padding: 20px; border-radius: 10px; text-align: center; }
              .stats .number { font-size: 36px; font-weight: bold; }
              .stats .label { font-size: 14px; opacity: 0.9; }
            </style>
          </head>
          <body>
            <div class='container'>
              <h2>🎉 Nouveau client inscrit!</h2>
              <p>Un nouveau client vient de s'inscrire à votre newsletter:</p>
              <div class='email'>📧 ${email}</div>
              <div class='stats'>
                <div class='number'>${subscribers.length}</div>
                <div class='label'>Total d'abonnés</div>
              </div>
              <p style='color: #666; font-size: 14px; margin-top: 20px;'>
                Date: ${new Date().toLocaleString('fr-FR')}
              </p>
            </div>
          </body>
          </html>
        `
      };

      // Envoyer les emails (si configuré)
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          await transporter.sendMail(welcomeEmail);
          await transporter.sendMail(adminEmail);
        } catch (emailError) {
          console.error('Erreur envoi email:', emailError);
          // Continue même si l'email échoue
        }
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Inscription réussie!'
      });

    } else if (action === 'notify_new_product') {
      // Notification de nouveau produit
      if (!product) {
        return res.status(400).json({ success: false, message: 'Produit manquant' });
      }

      // Lire les abonnés
      let subscribers = getSubscribers();

      if (subscribers.length === 0) {
        return res.status(200).json({ 
          success: true, 
          message: 'Aucun abonné à notifier' 
        });
      }

      // Créer l'email de notification
      const productEmail = {
        from: '"Glow Skin TN" <noreply@glowskintn.com>',
        bcc: subscribers, // Envoyer à tous les abonnés en copie cachée
        subject: `🆕 Nouveau produit : ${product.name}`,
        html: `
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #8b45ff, #ff69b4); padding: 40px; text-align: center; color: white; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { padding: 40px; }
              .product-card { background: #f9f9f9; border-radius: 15px; padding: 20px; margin: 20px 0; }
              .product-img { width: 100%; max-width: 300px; height: 300px; object-fit: cover; border-radius: 10px; margin: 0 auto; display: block; }
              .product-name { font-size: 22px; font-weight: bold; color: #333; margin: 15px 0 5px; }
              .product-brand { color: #8b45ff; font-size: 16px; margin-bottom: 10px; }
              .product-desc { color: #666; line-height: 1.6; margin: 10px 0; }
              .product-price { font-size: 24px; color: #ff69b4; font-weight: bold; margin: 15px 0; }
              .badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; margin: 10px 0; }
              .badge-new { background: #ede9fe; color: #7c3aed; }
              .badge-hot { background: #fee2e2; color: #dc2626; }
              .btn { display: inline-block; background: #000; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; margin: 20px 0; }
              .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class='container'>
              <div class='header'>
                <h1>🆕 Nouveau Produit Disponible!</h1>
              </div>
              <div class='content'>
                <div class='product-card'>
                  ${product.image && !product.image.startsWith('data:') ? `<img src='https://glow-skin-tn.vercel.app/${product.image}' alt='${product.name}' class='product-img'>` : `<div style='width: 100%; max-width: 300px; height: 300px; background: linear-gradient(135deg, #8b45ff, #ff69b4); border-radius: 10px; margin: 0 auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px;'>✨</div>`}
                  <div class='product-brand'>${product.brand}</div>
                  <div class='product-name'>${product.name}</div>
                  ${product.badge ? `<span class='badge badge-${product.badge}'>${product.badge === 'new' ? 'Nouveau' : product.badge === 'hot' ? 'Populaire' : product.badge}</span>` : ''}
                  <div class='product-desc'>${product.desc || ''}</div>
                  <div class='product-price'>À partir de ${product.price} DT</div>
                </div>
                <p style='text-align: center; color: #666;'>
                  Découvrez ce nouveau produit dès maintenant sur notre site!
                </p>
                <p style='text-align: center;'>
                  <a href='https://glow-skin-tn.vercel.app' class='btn'>Voir le produit</a>
                </p>
              </div>
              <div class='footer'>
                <p>© 2025 Glow Skin TN — Fait avec 🖤 en Tunisie</p>
                <p style='font-size: 12px; margin-top: 10px;'>
                  Vous recevez cet email car vous êtes abonné à notre newsletter.
                </p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      // Envoyer l'email
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          await transporter.sendMail(productEmail);
          return res.status(200).json({ 
            success: true, 
            message: `Email envoyé à ${subscribers.length} abonné(s)` 
          });
        } catch (emailError) {
          console.error('Erreur envoi email produit:', emailError);
          return res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de l\'envoi des emails' 
          });
        }
      } else {
        return res.status(500).json({ 
          success: false, 
          message: 'Configuration email manquante' 
        });
      }

    } else {
      return res.status(400).json({ success: false, message: 'Action invalide' });
    }

  } catch (error) {
    console.error('Erreur:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur',
      error: error.message 
    });
  }
}
