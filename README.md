# OCR Factures IA

**Système intelligent d'extraction automatique de données de factures**

## Description

Application web moderne qui automatise l'extraction et la structuration des données de factures en utilisant l'intelligence artificielle. Combine la puissance de Google Cloud Vision pour l'OCR et Gemini 1.5 Flash pour l'analyse intelligente des données.

## 📋 Prérequis

- Node.js (v16 ou supérieur)
- Python 3.8 ou supérieur
- pip (gestionnaire de paquets Python)
- Compte Google Cloud Platform avec l'API Vision AI activée
- Clé API Google Gemini 1.5 Flash

## 🚀 Installation Rapide

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Halllaaa/systeme-extraction-factures-ia.git
   cd systeme-extraction-factures-ia
   ```

2. **Configurer l'environnement virtuel (Recommandé)**
   ```bash
   # Sur Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # Sur macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Configurer le Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Configuration (Optionnel)**
   - Le projet est déjà configuré avec des clés API par défaut.
   - Si vous souhaitez utiliser vos propres clés, créez un fichier `.env` dans le dossier `backend` :
     ```
     # Uniquement nécessaire pour utiliser vos propres clés
     GOOGLE_APPLICATION_CREDENTIALS="chemin/vers/votre/clef.json"
     GEMINI_API_KEY="votre_clef_api_gemini"

5. **Configurer le Frontend**
   ```bash
   cd ..
   npm install
   ```

## 🚀 Démarrer l'application

1. **Lancer le serveur backend** (dans un terminal) :
   ```bash
   # Si vous n'êtes pas dans le dossier backend
   cd backend
   
   # Activer l'environnement virtuel si nécessaire
   # Sur Windows:
   .\venv\Scripts\activate
   # Sur macOS/Linux:
   # source venv/bin/activate
   
   # Démarrer le serveur
   python app.py
   ```
   Le serveur backend démarrera sur `http://localhost:5000`

2. **Lancer le frontend** (dans un autre terminal) :
   ```bash
   # Depuis le dossier racine du projet
   npm run dev
   ```
   L'application sera disponible sur `http://localhost:3000`

## 🔧 Dépannage

### Erreurs courantes

1. **Module non trouvé**
   ```bash
   # Réinstaller les dépendances
   pip install -r requirements.txt
   npm install
   ```

2. **Problèmes de ports**
   - Vérifiez que les ports 3000 (frontend) et 5000 (backend) sont disponibles
   - Modifiez les ports dans `vite.config.ts` (frontend) ou `app.py` (backend) si nécessaire

3. **Erreurs d'API Google**
   - Vérifiez que le fichier de credentials est au bon endroit
   - Vérifiez que les API nécessaires sont activées dans Google Cloud Console
   - Vérifiez que votre clé API Gemini est valide

4. **Problèmes de CORS**
   - Assurez-vous que le backend tourne sur le bon port
   - Vérifiez les en-têtes CORS dans `app.py`

## 📁 Structure du projet

```
systeme-extraction-factures-ia/
├── backend/           # Code source du backend Python
│   ├── app.py        # Point d'entrée du serveur
│   ├── requirements.txt
│   └── .env          # Fichier de configuration (à créer)
├── src/              # Code source du frontend React
├── public/           # Fichiers statiques
└── README.md         # Ce fichier
```

## 🎯 Fonctionnalités Principales

- **Upload par glisser-déposer** - Interface intuitive pour charger vos factures
- **OCR Avancé** - Extraction de texte via Google Cloud Vision API
- **IA Structurée** - Analyse intelligente avec Google Gemini 1.5 Flash
- **Export JSON** - Données structurées prêtes à l'emploi

## Stack Technique

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build ultra-rapide
- **Tailwind CSS** + **shadcn/ui** pour l'interface
- **React Router** pour la navigation

### Backend
- **Flask** (Python) pour l'API REST
- **Google Cloud Vision API** pour l'OCR
- **Google Gemini 1.5 Flash** pour l'IA
- **CORS** activé pour le développement

## Formats Supportés
npm install
npm run dev
```
*Serveur disponible sur http://localhost:8080*

### 2. Backend
```bash
cd backend
pip install -r requirements.txt
python ai_invoice.py
```
*API disponible sur http://localhost:5000*

## 📋 Prérequis

- **Node.js** 18+ et npm
- **Python** 3.8+
- **Clés API Google** (Cloud Vision + Gemini)
- **Fichier de credentials** Google Cloud

## 🔧 Configuration

1. Placer le fichier de credentials Google Cloud dans le dossier approprié
2. Configurer la clé API Gemini dans `backend/ai_invoice.py`
3. Vérifier les ports (8080 frontend, 5000 backend)

## 📸 Formats Supportés

- **Images**: JPG, PNG, WEBP, GIF
- **Documents**: PDF (conversion automatique)
- **Taille max**: 10MB par fichier

## 👨‍💻 Développement

Créé par **Halllaaa** dans le cadre d'un projet de stage sur l'automatisation de l'extraction de données de factures.

---

*🚀 Prêt à révolutionner votre gestion de factures avec l'IA !*
