import { createClient } from '@vercel/kv';

// Créer un client KV avec les variables STORAGE
const kv = createClient({
  url: process.env.STORAGE_URL,
  token: process.env.STORAGE_REST_API_TOKEN,
});

const PRODUCTS_KEY = 'glow_skin_products';

// Produits par défaut
const DEFAULT_PRODUCTS = [
  { id:1, name:'AHA 30% + BHA 2% Peeling Solution', brand:'The Ordinary', price:59, cat:'skincare', badge:'hot', image:'skincare/637246050_1572964257307337_6734684983051977838_n.jpg', desc:'Solution de peeling puissante avec acides AHA et BHA pour un nettoyage en profondeur' },
  { id:2, name:'PDRN Pink Collagen Gel Mask', brand:'Medicube', price:22, cat:'skincare', badge:'new', image:'skincare/642315884_1247216656852650_4547872675447306778_n.jpg', desc:'Masque gel au collagène rose pour hydrater et régénérer la peau en profondeur' },
  { id:3, name:'Reedle Shot Lip Plumper Expert', brand:'VT Cosmetics', price:45, cat:'makeup', badge:'new', image:'skincare/648463065_1624128732203430_2281091334461407872_n.jpg', desc:'Repulpeur de lèvres professionnel pour des lèvres pleines et attirantes' },
  { id:4, name:'Zero Pore Pad 2.0 – 70 Pads', brand:'Medicube', price:75, cat:'skincare', badge:'', image:'skincare/648544957_4513558702247314_1744780586883829449_n.jpg', desc:'70 pads pour nettoyer les pores et réduire leur taille efficacement' },
  { id:5, name:'Deep Vitamin C Capsule Cream', brand:'Medicube', price:88, cat:'skincare', badge:'', image:'skincare/649597852_1608125620231451_4021083995144548899_n.jpg', desc:'Crème capsules vitamine C pour éclat et fraîcheur de la peau' },
  { id:6, name:'Niacinamide 10% + TXA 4% Serum', brand:'Anua', price:45, cat:'skincare', badge:'hot', image:'skincare/649974219_1623663625552031_3973925636444598711_n.jpg', desc:'Sérum niacinamide pour éclaircir la peau et unifier le teint' },
  { id:7, name:'Revive Eye Serum – Ginseng+Retinal', brand:'Beauty of Joseon', price:45, cat:'skincare', badge:'', image:'skincare/651011475_4593912767554178_5291142997938421966_n.jpg', desc:'Sérum contour des yeux au ginseng et rétinal anti-rides' },
  { id:8, name:'Lip Sleeping Mask Berry', brand:'Laneige', price:62, cat:'makeup', badge:'sold', image:'skincare/651043893_1241433904864950_8363386263614142313_n.jpg', desc:'Masque lèvres de nuit saveur baies pour hydratation intense' },
  { id:9, name:'345NA Relief Cream 50ml', brand:'Dr.Althea', price:75, cat:'skincare', badge:'', image:'skincare/651134952_26313810134971886_5027674305683333692_n.jpg', desc:'Crème apaisante pour peaux sensibles et irritées' },
  { id:10, name:'Milk Skin Toner 150ml', brand:'TIRTIR', price:72, cat:'skincare', badge:'new', image:'skincare/651872097_4322658884728612_8959572420296975456_n.jpg', desc:'Tonique au lait pour hydrater et adoucir la peau' },
  { id:11, name:'Liquid Matte Lipstick', brand:'Huda Beauty', price:89, cat:'makeup', badge:'', image:'skincare/655157815_1593449145099991_169289055395646886_n.jpg', desc:'Rouge à lèvres liquide mat longue tenue' },
];

// Récupérer les produits depuis KV
async function getProducts() {
  try {
    const products = await kv.get(PRODUCTS_KEY);
    if (products && Array.isArray(products)) {
      return products;
    }
    // Si pas de produits en KV, initialiser avec les produits par défaut
    await kv.set(PRODUCTS_KEY, DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  } catch (error) {
    console.error('Error reading products from KV:', error);
    return DEFAULT_PRODUCTS;
  }
}

// Sauvegarder les produits dans KV
async function saveProducts(products) {
  try {
    await kv.set(PRODUCTS_KEY, products);
    return true;
  } catch (error) {
    console.error('Error saving products to KV:', error);
    return false;
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const products = await getProducts();

    // GET - Récupérer tous les produits
    if (req.method === 'GET') {
      return res.status(200).json({ success: true, products });
    }

    // POST - Ajouter un nouveau produit
    if (req.method === 'POST') {
      const newProduct = req.body;
      newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      products.push(newProduct);
      
      if (await saveProducts(products)) {
        return res.status(201).json({ success: true, product: newProduct });
      } else {
        return res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
      }
    }

    // PUT - Modifier un produit existant
    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const index = products.findIndex(p => p.id === id);
      
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Produit non trouvé' });
      }

      products[index] = { ...products[index], ...updates };
      
      if (await saveProducts(products)) {
        return res.status(200).json({ success: true, product: products[index] });
      } else {
        return res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
      }
    }

    // DELETE - Supprimer un produit
    if (req.method === 'DELETE') {
      const { id } = req.query;
      const index = products.findIndex(p => p.id === parseInt(id));
      
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Produit non trouvé' });
      }

      products.splice(index, 1);
      
      if (await saveProducts(products)) {
        return res.status(200).json({ success: true, message: 'Produit supprimé' });
      } else {
        return res.status(500).json({ success: false, message: 'Erreur lors de la sauvegarde' });
      }
    }

    return res.status(405).json({ success: false, message: 'Méthode non autorisée' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
