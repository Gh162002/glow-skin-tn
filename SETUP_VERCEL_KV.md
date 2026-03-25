# 🚀 Configuration Vercel KV pour Glow Skin TN

## Problème résolu
Les produits ajoutés depuis le panel admin disparaissaient après un refresh car ils étaient stockés dans `/tmp` (stockage temporaire). Maintenant, ils sont stockés dans **Vercel KV (Redis)** qui est **permanent et persistant**.

## 📋 Étapes de configuration

### 1. Créer une base de données Vercel KV

1. Va sur ton dashboard Vercel: https://vercel.com/dashboard
2. Sélectionne ton projet **glow-skin-tn**
3. Va dans l'onglet **Storage**
4. Clique sur **Create Database**
5. Sélectionne **KV (Redis)**
6. Donne un nom à ta base: `glow-skin-kv`
7. Sélectionne la région la plus proche (Europe - Frankfurt recommandé)
8. Clique sur **Create**

### 2. Connecter KV à ton projet

1. Une fois la base créée, clique sur **Connect Project**
2. Sélectionne ton projet **glow-skin-tn**
3. Clique sur **Connect**

Vercel va automatiquement ajouter les variables d'environnement nécessaires:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### 3. Déployer les changements

```bash
# Installer les dépendances
npm install

# Déployer sur Vercel
vercel --prod
```

Ou simplement:
```bash
git add .
git commit -m "feat: Add Vercel KV for persistent storage"
git push
```

Vercel va automatiquement redéployer ton site.

## ✅ Vérification

Après le déploiement:

1. Va sur https://glow-skin-tn.vercel.app/#admin
2. Connecte-toi avec le mot de passe: `glow2025`
3. Ajoute un nouveau produit
4. Rafraîchis la page (F5)
5. ✅ Le produit doit toujours être là!
6. Ouvre le site dans un autre navigateur
7. ✅ Le produit doit être visible partout!

## 🎯 Avantages de Vercel KV

✅ **Persistance permanente** - Les données ne disparaissent jamais
✅ **Gratuit** - Jusqu'à 256MB de stockage (largement suffisant)
✅ **Rapide** - Redis est ultra-rapide (< 1ms)
✅ **Partagé** - Tous les utilisateurs voient les mêmes données
✅ **Sécurisé** - Hébergé par Vercel avec encryption
✅ **Scalable** - Peut gérer des milliers de produits

## 📊 Limites du plan gratuit

- **Stockage**: 256 MB
- **Requêtes**: 3,000 par jour
- **Bandwidth**: 100 MB par jour

Pour ce site, c'est largement suffisant! 🎉

## 🔧 Commandes utiles

### Voir les données dans KV (via Vercel CLI)
```bash
vercel env pull
```

### Réinitialiser les produits par défaut
Si tu veux revenir aux 11 produits par défaut, supprime simplement la clé dans le dashboard KV:
1. Va dans Storage > glow-skin-kv
2. Cherche la clé `glow_skin_products`
3. Supprime-la
4. Au prochain chargement, les produits par défaut seront restaurés

## 🆘 Support

Si tu as des problèmes:
1. Vérifie que KV est bien connecté au projet
2. Vérifie les logs Vercel: https://vercel.com/dashboard/deployments
3. Vérifie que les variables d'environnement sont présentes

## 🎉 C'est tout!

Ton site utilise maintenant un stockage permanent et professionnel. Les produits ajoutés par ton client seront **toujours** sauvegardés! 🚀
