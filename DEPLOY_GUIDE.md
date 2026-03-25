# 🚀 Guide de déploiement - Vercel KV

## 📋 Checklist avant déploiement

- [x] Code modifié: `api/products.js` utilise maintenant Vercel KV
- [x] Dépendance ajoutée: `@vercel/kv` dans `package.json`
- [x] Documentation créée: `SETUP_VERCEL_KV.md`, `CHANGELOG_KV.md`, `test-kv.md`

## 🎯 Étapes de déploiement

### Étape 1: Installer les dépendances

```bash
npm install
```

Cela va installer `@vercel/kv` et toutes les autres dépendances.

### Étape 2: Créer Vercel KV Database

1. Va sur https://vercel.com/dashboard
2. Sélectionne ton projet **glow-skin-tn**
3. Clique sur l'onglet **Storage**
4. Clique sur **Create Database**
5. Sélectionne **KV (Redis)**
6. Nom: `glow-skin-kv`
7. Région: **Europe - Frankfurt** (ou la plus proche)
8. Clique sur **Create**

### Étape 3: Connecter KV au projet

1. Une fois la base créée, clique sur **Connect Project**
2. Sélectionne **glow-skin-tn**
3. Clique sur **Connect**

✅ Vercel va automatiquement ajouter les variables d'environnement nécessaires!

### Étape 4: Commit et Push

```bash
# Ajouter tous les fichiers modifiés
git add .

# Commit avec un message descriptif
git commit -m "feat: Migrate to Vercel KV for persistent product storage

- Replace /tmp file storage with Vercel KV (Redis)
- Add @vercel/kv dependency
- Products now persist permanently across deployments
- All users see the same products in real-time
- Fixes issue where products disappeared after refresh"

# Push vers GitHub
git push origin main
```

### Étape 5: Vérifier le déploiement

1. Vercel va automatiquement détecter le push et déployer
2. Attends que le déploiement soit terminé (1-2 minutes)
3. Va sur https://vercel.com/dashboard/deployments
4. Vérifie que le déploiement est **Ready** ✅

### Étape 6: Tester le site

1. Ouvre https://glow-skin-tn.vercel.app
2. Vérifie que les 11 produits par défaut s'affichent
3. Va sur https://glow-skin-tn.vercel.app/#admin
4. Connecte-toi avec: `glow2025`
5. Ajoute un produit de test
6. Rafraîchis la page (F5)
7. ✅ Le produit doit toujours être là!

## 🎉 C'est fait!

Si tous les tests passent, félicitations! Le site utilise maintenant Vercel KV et les produits sont stockés de manière permanente.

## 🔍 Vérifications supplémentaires

### Vérifier les variables d'environnement

1. Va sur https://vercel.com/dashboard
2. Sélectionne **glow-skin-tn**
3. Settings > Environment Variables
4. Vérifie que ces variables existent:
   - ✅ `KV_URL`
   - ✅ `KV_REST_API_URL`
   - ✅ `KV_REST_API_TOKEN`
   - ✅ `KV_REST_API_READ_ONLY_TOKEN`
   - ✅ `EMAIL_USER` (déjà existant)
   - ✅ `EMAIL_PASS` (déjà existant)

### Vérifier les logs

Si quelque chose ne fonctionne pas:

1. Va sur https://vercel.com/dashboard/deployments
2. Clique sur le dernier déploiement
3. Onglet **Functions**
4. Clique sur `/api/products`
5. Regarde les logs pour voir les erreurs

## 🆘 Problèmes courants

### Erreur: "Cannot find module '@vercel/kv'"

**Solution:**
```bash
npm install @vercel/kv
git add package.json package-lock.json
git commit -m "fix: Add @vercel/kv dependency"
git push
```

### Erreur: "KV_URL is not defined"

**Solution:**
1. Vérifie que Vercel KV est bien créé
2. Vérifie que KV est connecté au projet
3. Redéploie le site:
   ```bash
   vercel --prod
   ```

### Les produits disparaissent toujours

**Solution:**
1. Vérifie que le code utilise bien `@vercel/kv` et non `fs`
2. Vérifie les logs Vercel pour voir les erreurs
3. Vérifie que les variables d'environnement KV sont présentes

## 📞 Support

Si tu as besoin d'aide:
1. Lis `SETUP_VERCEL_KV.md` pour plus de détails
2. Lis `test-kv.md` pour la checklist complète
3. Vérifie les logs Vercel
4. Vérifie la configuration KV dans le dashboard

## 🎊 Résultat final

Après ce déploiement:

✅ Les produits sont stockés dans Vercel KV (Redis)
✅ Les données persistent **définitivement**
✅ Tous les utilisateurs voient les mêmes produits
✅ Les produits survivent aux redéploiements
✅ Performance améliorée (< 1ms)
✅ Gratuit jusqu'à 256MB de stockage

Ton client peut maintenant gérer son catalogue de produits en toute confiance! 🚀
