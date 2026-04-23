# 💬 ChatApp — Application de chat en temps réel

Une application de chat full-stack avec conversations privées et groupes, construite avec **React**, **Express**, **Socket.IO** et **MongoDB**.

---

## ✨ Fonctionnalités

- Authentification (inscription / connexion) avec JWT
- Conversations privées entre deux utilisateurs
- Création de groupes avec nom et membres
- Messagerie en temps réel via Socket.IO
- Historique des messages chargé au démarrage
- Photo de profil hébergée sur Cloudinary
- Accusés de lecture (readBy)
- Indicateur "en train d'écrire..."

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│              Frontend React              │
│  <Sidebar> <MessageList> <MessageInput>  │
└───────────────┬─────────────────────────┘
                │ HTTP (REST) + WebSocket
┌───────────────▼─────────────────────────┐
│           Serveur Node.js                │
│     Express (routes) + Socket.IO         │
└───────────────┬─────────────────────────┘
                │ Mongoose
┌───────────────▼─────────────────────────┐
│              MongoDB Atlas               │
│   users · conversations · messages      │
└─────────────────────────────────────────┘
```
---

## 🚀 Installation

### Prérequis

- Node.js v18+
- MongoDB Atlas (ou instance locale)
- Compte Cloudinary (gratuit)

### Backend

```bash
cd backend
npm install
```

Créer le fichier `.env` :

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/chatapp
JWT_SECRET=ton_secret_jwt_ici
CLOUDINARY_CLOUD_NAME=ton_cloud_name
CLOUDINARY_API_KEY=ta_api_key
CLOUDINARY_API_SECRET=ton_api_secret
CLIENT_URL=http://localhost:5173
```

Lancer le serveur :

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Créer le fichier `.env` :

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

Lancer le frontend :

```bash
npm run dev
```

---

## 🛡️ Sécurité

- Les mots de passe sont hashés avec **bcrypt** avant stockage
- Chaque requête HTTP protégée est vérifiée via un **middleware JWT**
- La connexion Socket.IO vérifie également le token JWT au moment du handshake
- Les variables sensibles (clés API, secrets) sont dans `.env` — **ne jamais committer ce fichier**

---

## 📄 Licence

MIT — libre d'utilisation et de modification.