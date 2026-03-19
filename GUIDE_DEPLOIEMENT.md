# 🚀 Guide Complet: GitHub + Vercel

## Étape 1: Préparer Git localement

### 1.1 Installer Git (si pas déjà fait)
- **Windows**: Télécharger sur https://git-scm.com/download/win
- **Mac**: `brew install git` ou télécharger sur https://git-scm.com
- **Linux**: `sudo apt install git`

### 1.2 Vérifier l'installation
Ouvrir le terminal (ou Git Bash sur Windows) et taper:
```bash
git --version
```
Vous devriez voir: `git version 2.x.x`

### 1.3 Configurer Git (première fois seulement)
```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

## Étape 2: Créer un dépôt GitHub

### 2.1 Créer un compte GitHub
1. Aller sur https://github.com
2. Cliquer sur "Sign up"
3. Suivre les instructions

### 2.2 Créer un nouveau repository
1. Une fois connecté, cliquer sur le **+** en haut à droite
2. Sélectionner **"New repository"**
3. Remplir:
   - **Repository name**: `glow-skin-tn` (ou autre nom)
   - **Description**: "Site e-commerce Glow Skin TN"
   - **Public** ou **Private** (au choix)
   - ❌ **NE PAS** cocher "Add a README file"
   - ❌ **NE PAS** ajouter .gitignore
   - ❌ **NE PAS** choisir de licence
4. Cliquer sur **"Create repository"**

### 2.3 Copier l'URL du repository
Vous verrez une URL comme:
```
https://github.com/votre-username/glow-skin-tn.git
```
**Gardez cette page ouverte!**

## Étape 3: Mettre votre projet sur GitHub

### 3.1 Ouvrir le terminal dans votre dossier projet
- **Windows**: Clic droit dans le dossier → "Git Bash Here"
- **Mac/Linux**: Ouvrir Terminal et naviguer: `cd /chemin/vers/votre/projet`

### 3.2 Initialiser Git
```bash
git init
```

### 3.3 Ajouter tous les fichiers
```bash
git add .
```

### 3.4 Faire le premier commit
```bash
git commit -m "Premier commit - Site Glow Skin TN"
```

### 3.5 Lier au repository GitHub
Remplacer `votre-username` par votre nom d'utilisateur GitHub:
```bash
git remote add origin https://github.com/votre-username/glow-skin-tn.git
```

### 3.6 Pousser le code sur GitHub
```bash
git branch -M main
git push -u origin main
```

**Si demandé, entrer vos identifiants GitHub**

### 3.7 Vérifier
Rafraîchir la page GitHub - vous devriez voir tous vos fichiers! ✅

## Étape 4: Déployer sur Vercel

### 4.1 Créer un compte Vercel
1. Aller sur https://vercel.com
2. Cliquer sur **"Sign Up"**
3. Choisir **"Continue with GitHub"** (recommandé)
4. Autoriser Vercel à accéder à GitHub

### 4.2 Importer le projet
1. Sur le dashboard Vercel, cliquer sur **"Add New..."**
2. Sélectionner **"Project"**
3. Vous verrez la liste de vos repositories GitHub
4. Trouver **"glow-skin-tn"** et cliquer sur **"Import"**

### 4.3 Configurer le projet
1. **Project Name**: Laisser `glow-skin-tn` ou modifier
2. **Framework Preset**: Laisser "Other"
3. **Root Directory**: Laisser `./`
4. **Build Command**: Laisser vide ou `npm run build`
5. **Output Directory**: Laisser vide

### 4.4 Ajouter les variables d'environnement (optionnel)
Cliquer sur **"Environment Variables"** et ajouter:

| Name | Value |
|------|-------|
| `EMAIL_USER` | votre-email@gmail.com |
| `EMAIL_PASS` | votre-mot-de-passe-app |

**Pour créer un mot de passe d'application Gmail:**
1. Aller sur https://myaccount.google.com/security
2. Activer la validation en 2 étapes
3. Rechercher "Mots de passe des applications"
4. Créer un nouveau mot de passe pour "Mail"
5. Copier le mot de passe généré

### 4.5 Déployer!
1. Cliquer sur **"Deploy"**
2. Attendre 30-60 secondes ⏳
3. 🎉 **Votre site est en ligne!**

### 4.6 Accéder à votre site
Vous verrez:
```
https://glow-skin-tn.vercel.app
```
ou
```
https://glow-skin-tn-votre-username.vercel.app
```

## Étape 5: Ajouter un domaine personnalisé (optionnel)

### 5.1 Dans Vercel Dashboard
1. Aller dans votre projet
2. Cliquer sur **"Settings"**
3. Cliquer sur **"Domains"**
4. Entrer votre domaine: `glowskintn.com`
5. Cliquer sur **"Add"**

### 5.2 Configurer les DNS
Vercel vous donnera des instructions pour configurer:
- **Type A** ou **CNAME** records
- Aller chez votre registrar de domaine (ex: Namecheap, GoDaddy)
- Ajouter les DNS records fournis par Vercel

### 5.3 Attendre la propagation
- Peut prendre 24-48h
- Vercel vérifiera automatiquement
- HTTPS sera configuré automatiquement

## Étape 6: Mettre à jour le site

### Méthode 1: Via GitHub (Automatique)
Chaque fois que vous modifiez le code:

```bash
# 1. Ajouter les modifications
git add .

# 2. Créer un commit
git commit -m "Description des modifications"

# 3. Pousser sur GitHub
git push
```

**Vercel déploiera automatiquement!** 🚀

### Méthode 2: Via Vercel Dashboard
1. Aller dans votre projet Vercel
2. Cliquer sur **"Deployments"**
3. Cliquer sur **"Redeploy"**

## 📋 Résumé des commandes Git essentielles

```bash
# Voir le statut des fichiers
git status

# Ajouter tous les fichiers modifiés
git add .

# Créer un commit
git commit -m "Message descriptif"

# Pousser sur GitHub
git push

# Voir l'historique
git log

# Annuler les modifications locales
git checkout -- .

# Mettre à jour depuis GitHub
git pull
```

## 🆘 Problèmes courants

### Erreur: "Permission denied"
**Solution**: Configurer SSH ou utiliser HTTPS avec token
```bash
git remote set-url origin https://github.com/username/repo.git
```

### Erreur: "Updates were rejected"
**Solution**: Récupérer les changements d'abord
```bash
git pull origin main --rebase
git push
```

### Le site ne se met pas à jour
**Solution**: 
1. Vérifier que le push GitHub a réussi
2. Aller dans Vercel → Deployments
3. Vérifier les logs d'erreur

### Les emails ne fonctionnent pas
**Solution**:
1. Vérifier les variables d'environnement dans Vercel
2. Utiliser un mot de passe d'application Gmail
3. Vérifier les logs dans Vercel → Functions

## 🎯 Checklist finale

- [ ] Git installé et configuré
- [ ] Repository GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Compte Vercel créé et lié à GitHub
- [ ] Projet importé dans Vercel
- [ ] Variables d'environnement configurées
- [ ] Site déployé avec succès
- [ ] Site accessible via l'URL Vercel
- [ ] (Optionnel) Domaine personnalisé configuré

## 📞 Liens utiles

- **GitHub**: https://github.com
- **Vercel**: https://vercel.com
- **Documentation Vercel**: https://vercel.com/docs
- **Git Documentation**: https://git-scm.com/doc
- **Votre site**: https://glow-skin-tn.vercel.app

## 🎉 Félicitations!

Votre site est maintenant en ligne et accessible partout dans le monde! 🌍

Chaque modification que vous pousserez sur GitHub sera automatiquement déployée sur Vercel.
