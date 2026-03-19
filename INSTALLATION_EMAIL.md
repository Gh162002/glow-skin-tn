# Configuration du système d'emails Newsletter

## 📧 Fonctionnalités

1. **Email de bienvenue automatique** quand quelqu'un s'inscrit
2. **Notification automatique** aux abonnés quand un nouveau produit est ajouté
3. **Gestion des abonnés** dans un fichier JSON

## 🔧 Installation

### Étape 1: Configuration du fichier PHP

1. Ouvrir le fichier `newsletter.php`
2. Remplacer cette ligne:
   ```php
   $admin_email = 'votre-email@example.com';
   ```
   Par l'email de la cliente:
   ```php
   $admin_email = 'contact@glowskintn.com';
   ```

### Étape 2: Télécharger sur le serveur

Télécharger ces fichiers sur votre hébergement web:
- `index.html`
- `newsletter.php`
- Dossier `SkinCare/`
- `logo1.png`

### Étape 3: Permissions

Le fichier `newsletter.php` va créer automatiquement `subscribers.json` pour stocker les emails.

Assurez-vous que le dossier a les permissions d'écriture (chmod 755 ou 777).

### Étape 4: Tester

1. Aller sur votre site
2. Descendre à la section Newsletter
3. Entrer un email de test
4. Vérifier la boîte de réception

## 📱 Utilisation

### Pour les visiteurs:
1. Entrer leur email dans le formulaire newsletter
2. Recevoir un email de bienvenue automatiquement

### Pour l'administrateur:
1. Se connecter à l'admin (#admin)
2. Ajouter un nouveau produit
3. Une popup demande si vous voulez notifier les abonnés
4. Cliquer "OK" pour envoyer l'email à tous les abonnés

## ⚠️ Important

### Configuration email du serveur

La fonction PHP `mail()` doit être activée sur votre hébergement.

**Si les emails ne fonctionnent pas:**

Option 1: Utiliser un service SMTP (recommandé)
- Installer PHPMailer
- Configurer avec Gmail, SendGrid, ou Mailgun

Option 2: Utiliser un service d'emailing
- Mailchimp
- SendinBlue
- EmailJS (JavaScript, pas besoin de PHP)

### Alternative sans serveur (EmailJS)

Si vous n'avez pas de serveur PHP, vous pouvez utiliser EmailJS:

1. Créer un compte sur https://www.emailjs.com/
2. Configurer un service email
3. Remplacer le code dans `index.html`

## 📊 Voir les abonnés

Les emails sont stockés dans `subscribers.json`

Pour voir la liste:
1. Télécharger le fichier depuis le serveur
2. Ouvrir avec un éditeur de texte
3. Vous verrez tous les emails inscrits

## 🔒 Sécurité

- Le fichier `subscribers.json` ne doit pas être accessible publiquement
- Ajouter dans `.htaccess`:
  ```
  <Files "subscribers.json">
    Order Allow,Deny
    Deny from all
  </Files>
  ```

## 💡 Améliorations futures

- Ajouter un lien de désinscription
- Créer un tableau de bord pour voir les statistiques
- Segmenter les abonnés par intérêts
- Programmer des emails automatiques
