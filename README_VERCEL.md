# Déploiement sur Vercel - Glow Skin TN

## 📦 Fichiers créés pour Vercel

- `vercel.json` - Configuration Vercel
- `package.json` - Dépendances Node.js
- `api/newsletter.js` - API serverless pour la newsletter
- `README_VERCEL.md` - Ce fichier

## 🚀 Étapes de déploiement

### 1. Créer un compte Vercel
1. Aller sur https://vercel.com
2. S'inscrire avec GitHub, GitLab ou email

### 2. Installer Vercel CLI (optionnel)
```bash
npm install -g vercel
```

### 3. Déployer le site

#### Option A: Via le site web Vercel (Recommandé)
1. Aller sur https://vercel.com/new
2. Importer votre projet depuis GitHub/GitLab
3. Ou glisser-déposer le dossier du projet
4. Cliquer sur "Deploy"

#### Option B: Via CLI
```bash
# Dans le dossier du projet
vercel

# Pour déployer en production
vercel --prod
```

### 4. Configurer les variables d'environnement

Dans le dashboard Vercel, aller dans:
**Settings → Environment Variables**

Ajouter ces variables:

```
EMAIL_USER = votre-email@gmail.com
EMAIL_PASS = votre-mot-de-passe-app
```

**Note:** Pour Gmail, créer un "App Password":
1. Aller sur https://myaccount.google.com/security
2. Activer la validation en 2 étapes
3. Créer un mot de passe d'application

### 5. Structure du projet

```
glow-skin-tn/
├── index.html              # Page principale
├── logo1.png              # Logo
├── SkinCare/              # Dossier images produits
│   └── *.jpg
├── api/
│   └── newsletter.js      # API serverless
├── vercel.json            # Config Vercel
├── package.json           # Dépendances
└── README_VERCEL.md       # Ce fichier
```

## 🔧 Configuration email

### Option 1: Gmail (Simple)
Utiliser les variables d'environnement ci-dessus.

### Option 2: SendGrid (Recommandé pour production)
1. Créer un compte sur https://sendgrid.com
2. Obtenir une API key
3. Modifier `api/newsletter.js` pour utiliser SendGrid

### Option 3: Mailgun
1. Créer un compte sur https://mailgun.com
2. Obtenir les credentials
3. Modifier `api/newsletter.js`

## 📝 Fonctionnalités

✅ Site statique hébergé sur Vercel CDN (ultra rapide)
✅ API serverless pour la newsletter
✅ Emails automatiques de bienvenue
✅ Notifications admin pour nouveaux abonnés
✅ HTTPS automatique
✅ Domaine personnalisé gratuit (.vercel.app)

## 🌐 Domaine personnalisé

Pour utiliser votre propre domaine (ex: glowskintn.com):

1. Dans Vercel Dashboard → Settings → Domains
2. Ajouter votre domaine
3. Configurer les DNS selon les instructions Vercel

## 🔄 Mises à jour

Pour mettre à jour le site:

1. Modifier les fichiers localement
2. Redéployer:
   - Via Git: push vers GitHub (déploiement automatique)
   - Via CLI: `vercel --prod`
   - Via web: glisser-déposer le nouveau dossier

## 📊 Monitoring

Vercel fournit:
- Analytics gratuits
- Logs des fonctions serverless
- Métriques de performance
- Alertes d'erreur

Accès: Dashboard Vercel → votre projet → Analytics

## ⚠️ Limitations

- **Stockage des abonnés**: Actuellement en mémoire (perdu au redémarrage)
- **Solution**: Utiliser une base de données (voir ci-dessous)

## 🗄️ Ajouter une base de données (optionnel)

### Option 1: Vercel KV (Redis)
```bash
vercel link
vercel env pull
```

### Option 2: MongoDB Atlas
1. Créer un cluster gratuit sur https://mongodb.com/atlas
2. Ajouter la connection string dans les variables d'environnement
3. Modifier `api/newsletter.js` pour utiliser MongoDB

### Option 3: Supabase
1. Créer un projet sur https://supabase.com
2. Créer une table `subscribers`
3. Utiliser l'API Supabase dans `api/newsletter.js`

## 🆘 Support

En cas de problème:
1. Vérifier les logs dans Vercel Dashboard
2. Tester localement: `vercel dev`
3. Vérifier les variables d'environnement

## 🎉 C'est tout!

Votre site sera accessible sur:
- https://votre-projet.vercel.app
- Ou votre domaine personnalisé

Le déploiement prend environ 30 secondes! 🚀
