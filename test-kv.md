# 🧪 Test de Vercel KV - Checklist

## ✅ Tests à effectuer après déploiement

### Test 1: Vérifier que les produits par défaut sont chargés
1. Ouvrir https://glow-skin-tn.vercel.app
2. Vérifier que les 11 produits par défaut s'affichent
3. ✅ Si oui, KV fonctionne!

### Test 2: Ajouter un nouveau produit
1. Aller sur https://glow-skin-tn.vercel.app/#admin
2. Se connecter avec le mot de passe: `glow2025`
3. Ajouter un nouveau produit de test:
   - Nom: "Test Product KV"
   - Marque: "Test Brand"
   - Prix: 99
   - Catégorie: Skincare
   - Badge: Nouveau
   - Description: "Produit de test pour vérifier KV"
   - Image: Choisir n'importe quelle image
4. Cliquer sur "Ajouter le produit"
5. ✅ Le produit doit apparaître dans la liste

### Test 3: Vérifier la persistance (CRITIQUE)
1. Rafraîchir la page (F5)
2. ✅ Le produit "Test Product KV" doit toujours être là
3. Fermer le navigateur
4. Rouvrir https://glow-skin-tn.vercel.app/#admin
5. ✅ Le produit doit toujours être là

### Test 4: Vérifier la visibilité multi-utilisateurs
1. Ouvrir le site dans un autre navigateur (ou mode incognito)
2. Aller sur https://glow-skin-tn.vercel.app
3. ✅ Le produit "Test Product KV" doit être visible

### Test 5: Modifier un produit
1. Dans le panel admin, cliquer sur "Modifier" sur le produit de test
2. Changer le prix à 150
3. Cliquer sur "Sauvegarder"
4. Rafraîchir la page
5. ✅ Le prix doit être 150

### Test 6: Supprimer un produit
1. Cliquer sur "Supprimer" sur le produit de test
2. Confirmer la suppression
3. Rafraîchir la page
4. ✅ Le produit ne doit plus être là

### Test 7: Vérifier après redéploiement
1. Faire un changement mineur dans le code (ex: ajouter un commentaire)
2. Commit et push
3. Attendre le redéploiement Vercel
4. Ouvrir le site
5. ✅ Tous les produits doivent toujours être là

## 🔴 Si un test échoue

### Problème: Les produits disparaissent après refresh

**Solution:**
1. Vérifier que Vercel KV est bien créé et connecté
2. Aller sur https://vercel.com/dashboard
3. Storage > Vérifier que `glow-skin-kv` existe
4. Project Settings > Environment Variables
5. Vérifier que ces variables existent:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

### Problème: Erreur 500 lors de l'ajout de produit

**Solution:**
1. Vérifier les logs Vercel:
   - https://vercel.com/dashboard/deployments
   - Cliquer sur le dernier déploiement
   - Onglet "Functions" > Cliquer sur `/api/products`
   - Voir les logs d'erreur
2. Vérifier que `@vercel/kv` est bien installé:
   ```bash
   npm list @vercel/kv
   ```

### Problème: "Cannot find module '@vercel/kv'"

**Solution:**
```bash
npm install @vercel/kv
git add package.json package-lock.json
git commit -m "fix: Add @vercel/kv dependency"
git push
```

## 📊 Résultats attendus

| Test | Avant (fs/tmp) | Après (KV) |
|------|---------------|------------|
| Persistance après refresh | ❌ Échoue | ✅ Réussit |
| Visible par tous | ❌ Non | ✅ Oui |
| Survit au redéploiement | ❌ Non | ✅ Oui |
| Performance | ~10ms | ~1ms |

## 🎉 Succès!

Si tous les tests passent, félicitations! 🎊

Ton site utilise maintenant une base de données professionnelle et fiable. Les produits sont stockés de manière permanente et sécurisée dans Vercel KV (Redis).

**Ton client peut maintenant:**
- ✅ Ajouter des produits qui restent définitivement
- ✅ Modifier des produits sans crainte de perte
- ✅ Supprimer des produits en toute sécurité
- ✅ Voir les changements immédiatement sur tous les appareils

## 📞 Support

Si tu as besoin d'aide:
1. Vérifie les logs Vercel
2. Vérifie la configuration KV
3. Vérifie que les variables d'environnement sont présentes
4. Redéploie le site si nécessaire
