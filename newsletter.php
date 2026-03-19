<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$admin_email = 'Salma.mh0@icloud.com'; // Email de la propriétaire
$subscribers_file = 'subscribers.json';

// Fonction pour charger les abonnés
function getSubscribers() {
    global $subscribers_file;
    if (!file_exists($subscribers_file)) {
        return [];
    }
    $content = file_get_contents($subscribers_file);
    return json_decode($content, true) ?: [];
}

// Fonction pour sauvegarder les abonnés
function saveSubscribers($subscribers) {
    global $subscribers_file;
    file_put_contents($subscribers_file, json_encode($subscribers, JSON_PRETTY_PRINT));
}

// Fonction pour envoyer un email
function sendEmail($to, $subject, $message) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Glow Skin TN <noreply@glowskintn.com>" . "\r\n";
    
    return mail($to, $subject, $message, $headers);
}

// Traiter la requête POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'] ?? '';
    
    if ($action === 'subscribe') {
        $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
        
        if (!$email) {
            echo json_encode(['success' => false, 'message' => 'Email invalide']);
            exit;
        }
        
        $subscribers = getSubscribers();
        
        // Vérifier si l'email existe déjà
        if (in_array($email, $subscribers)) {
            echo json_encode(['success' => false, 'message' => 'Cet email est déjà inscrit']);
            exit;
        }
        
        // Ajouter l'abonné
        $subscribers[] = $email;
        saveSubscribers($subscribers);
        
        // Envoyer email de bienvenue au client
        $subject = "🌟 مرحباً بك في Glow Skin TN!";
        $message = "
        <html dir='rtl'>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #8b45ff, #ff69b4); padding: 40px; text-align: center; color: white; }
                .header h1 { margin: 0; font-size: 28px; }
                .content { padding: 40px; text-align: right; }
                .content h2 { color: #333; font-size: 22px; margin-bottom: 20px; }
                .content p { color: #666; line-height: 1.8; font-size: 16px; }
                .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 14px; }
                .btn { display: inline-block; background: #000; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>✨ مرحباً بك في Glow Skin TN! ✨</h1>
                </div>
                <div class='content'>
                    <h2>شكراً لانضمامك إلى مجتمعنا! 🖤</h2>
                    <p>نحن سعداء جداً بانضمامك إلى عائلة Glow Skin TN!</p>
                    <p>ستكونين أول من يعرف عن:</p>
                    <ul style='text-align: right; color: #666; line-height: 2;'>
                        <li>المنتجات الجديدة من أفضل العلامات العالمية</li>
                        <li>العروض والخصومات الحصرية</li>
                        <li>نصائح العناية بالبشرة</li>
                        <li>الهدايا المجانية والمسابقات</li>
                    </ul>
                    <p style='text-align: center;'>
                        <a href='https://www.instagram.com/glow_skin_tn' class='btn'>تابعينا على Instagram</a>
                    </p>
                </div>
                <div class='footer'>
                    <p>© 2025 Glow Skin TN — صُنع بـ 🖤 في تونس</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        sendEmail($email, $subject, $message);
        
        // Notifier l'admin qu'un nouveau client s'est inscrit
        $admin_subject = "🎉 Nouvel abonné à la newsletter!";
        $admin_message = "
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
                <div class='email'>📧 {$email}</div>
                <div class='stats'>
                    <div class='number'>" . count($subscribers) . "</div>
                    <div class='label'>Total d'abonnés</div>
                </div>
                <p style='color: #666; font-size: 14px; margin-top: 20px;'>
                    Date: " . date('d/m/Y H:i') . "
                </p>
            </div>
        </body>
        </html>
        ";
        
        sendEmail($admin_email, $admin_subject, $admin_message);
        
        echo json_encode(['success' => true, 'message' => 'Inscription réussie!']);
        
    } elseif ($action === 'notify_new_product') {
        // Cette action sera appelée depuis l'admin quand un nouveau produit est ajouté
        $product = $data['product'] ?? null;
        
        if (!$product) {
            echo json_encode(['success' => false, 'message' => 'Produit manquant']);
            exit;
        }
        
        $subscribers = getSubscribers();
        
        if (empty($subscribers)) {
            echo json_encode(['success' => true, 'message' => 'Aucun abonné']);
            exit;
        }
        
        $subject = "🆕 منتج جديد في Glow Skin TN!";
        $message = "
        <html dir='rtl'>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #8b45ff, #ff69b4); padding: 40px; text-align: center; color: white; }
                .product { padding: 40px; text-align: center; }
                .product img { max-width: 300px; border-radius: 20px; margin-bottom: 20px; }
                .product h2 { color: #333; font-size: 24px; margin-bottom: 10px; }
                .product .brand { color: #999; font-size: 14px; margin-bottom: 15px; }
                .product .desc { color: #666; line-height: 1.8; margin-bottom: 20px; }
                .product .price { font-size: 28px; font-weight: bold; color: #000; margin-bottom: 20px; }
                .btn { display: inline-block; background: #000; color: white; padding: 15px 40px; text-decoration: none; border-radius: 50px; }
                .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>🆕 منتج جديد وصل للتو!</h1>
                </div>
                <div class='product'>
                    <img src='{$product['image']}' alt='{$product['name']}'>
                    <div class='brand'>{$product['brand']}</div>
                    <h2>{$product['name']}</h2>
                    <p class='desc'>{$product['desc']}</p>
                    <div class='price'>{$product['price']} دت</div>
                    <a href='https://wa.me/21626207466?text=أريد طلب: {$product['name']}' class='btn'>اطلبي الآن عبر WhatsApp</a>
                </div>
                <div class='footer'>
                    <p>© 2025 Glow Skin TN</p>
                    <p style='font-size: 12px; margin-top: 10px;'>
                        <a href='#' style='color: #999;'>إلغاء الاشتراك</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        $sent_count = 0;
        foreach ($subscribers as $subscriber) {
            if (sendEmail($subscriber, $subject, $message)) {
                $sent_count++;
            }
        }
        
        echo json_encode([
            'success' => true, 
            'message' => "Email envoyé à $sent_count abonnés"
        ]);
        
    } else {
        echo json_encode(['success' => false, 'message' => 'Action invalide']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
}
?>
