# 🛠️ Installation et Configuration

## Prérequis

- Node.js (v16 ou supérieur)
- Python 3.8 ou supérieur
- Compte Google Cloud Platform avec l'API Vision AI activée
- Clé API Google Gemini 1.5 Flash

## 🚀 Configuration du Backend

1. **Créer un environnement virtuel**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Windows: .\venv\Scripts\activate
   ```

2. **Installer les dépendances Python**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configuration (Optionnel)**
   Le projet est déjà configuré avec des clés API par défaut. Si vous souhaitez utiliser vos propres clés, créez un fichier `.env` dans le dossier `backend` :
   ```
   # Uniquement nécessaire pour utiliser vos propres clés
   GOOGLE_APPLICATION_CREDENTIALS="chemin/vers/votre/clef.json"
   GEMINI_API_KEY="votre_clef_api_gemini"
   ```

4. **Démarrer le serveur backend**
   ```bash
   python src/app.py
   ```
   Le serveur démarrera sur `http://localhost:5000`

## 💻 Configuration du Frontend

1. **Installer les dépendances Node.js**
   ```bash
   cd frontend
   npm install
   ```

2. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```
   L'application sera disponible sur `http://localhost:8080`

## 🔑 Configuration des clés API

1. **Google Cloud Vision**
   - Activer l'API Vision AI
   - Créer un compte de service et télécharger le fichier JSON des identifiants

2. **Google Gemini**
   - Activer l'API Gemini
   - Générer une clé API dans Google AI Studio

## 🐛 Dépannage

- **Erreurs CORS** : Vérifiez que le backend tourne et que l'URL est correcte
- **Problèmes d'authentification** : Vérifiez le fichier de credentials Google Cloud
- **Erreurs de dépendances** : Exécutez `npm install` ou `pip install` à nouveau


