# Backend API - Glow Skin TN

## Changements importants

Le site utilise maintenant un backend pour gérer les produits au lieu de localStorage. Cela signifie que :

✅ Les produits ajoutés par l'admin sont visibles par tous les visiteurs
✅ Les produits persistent même après fermeture du navigateur
✅ Tous les utilisateurs voient les mêmes produits

## APIs disponibles

### 1. API Produits (`/api/products`)

**GET** - Récupérer tous les produits
```javascript
fetch('/api/products')
  .then(res => res.json())
  .then(data => console.log(data.products));
```

**POST** - Ajouter un nouveau produit
```javascript
fetch('/api/products', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Nom du produit',
    brand: 'Marque',
    price: 50,
    cat: 'skincare',
    badge: 'new',
    desc: 'Description',
    image: 'data:image/jpeg;base64,...'
  })
});
```

**PUT** - Modifier un produit existant
```javascript
fetch('/api/products', {
  method: 'PUT',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    id: 1,
    name: 'Nouveau nom',
    price: 60,
    // ... autres champs
  })
});
```

**DELETE** - Supprimer un produit
```javascript
fetch('/api/products?id=1', {
  method: 'DELETE'
});
```

### 2. API Newsletter (`/api/newsletter`)

Déjà existante - gère les inscriptions newsletter.

## Stockage des données

Les produits sont stockés dans `/tmp/products.json` sur le serveur Vercel.

**Note importante** : Vercel utilise un système de fichiers éphémère. Les données peuvent être perdues lors des redéploiements. Pour une solution permanente, il faudrait utiliser une vraie base de données (MongoDB, PostgreSQL, etc.).

## Produits par défaut

Les 11 produits initiaux sont définis dans `api/products.js` et seront chargés automatiquement si aucun produit n'existe.

## Déploiement

1. Pousser les changements sur GitHub :
```bash
git add .
git commit -m "Add backend API for products"
git push
```

2. Vercel redéploiera automatiquement

## Test local

Pour tester localement :
```bash
npm install
vercel dev
```

Le site sera disponible sur `http://localhost:3000`
