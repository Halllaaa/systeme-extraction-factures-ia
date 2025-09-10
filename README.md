# 🧾 OCR Factures IA

**Système intelligent d'extraction automatique de données de factures**

## 🎯 Description

Application web moderne qui automatise l'extraction et la structuration des données de factures en utilisant l'intelligence artificielle. Combine la puissance de Google Cloud Vision pour l'OCR et Gemini 1.5 Flash pour l'analyse intelligente des données.

## ⚡ Fonctionnalités Principales

- 📤 **Upload par glisser-déposer** - Interface intuitive pour charger vos factures
- 👁️ **OCR Avancé** - Extraction de texte via Google Cloud Vision API
- 🤖 **IA Structurée** - Analyse intelligente avec Google Gemini 1.5 Flash
- 📊 **Export JSON** - Données structurées prêtes à l'emploi
- ⚡ **Temps Réel** - Traitement rapide avec feedback visuel

## 🛠️ Stack Technique

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

## 🚀 Installation Rapide

### 1. Frontend
```bash
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