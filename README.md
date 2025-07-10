

---

# 💬 AI Chat Support – Full Stack Website

This project is a full-stack AI-powered chat support platform built using the MERN stack. It enables real-time chat interaction between users and an AI assistant with login/signup authentication, conversation history, and a clean UI.

---

## 🗂 Project Structure

```
.
├── client/               # React frontend
│   ├── public/           # Static files
│   ├── src/              # React source code
│   │   ├── components/   # Reusable components (ChatWindow, Sidebar, etc.)
│   │   ├── pages/        # Login and Signup pages
│   │   ├── styles/       # CSS and styling
│   │   ├── App.js
│   │   └── index.js
│   ├── .env              # Frontend environment variables
│   ├── package.json
│
├── server/               # Node.js + Express backend
│   ├── models/           # Mongoose models (User, Conversation, Message)
│   ├── routes/           # API routes (auth, chat, upload)
│   ├── controllers/      # Route logic
│   ├── .env              # Backend environment variables
│   ├── server.js         # Express app entry point
│   └── package.json
```

---

## 🚀 Features

* 🔐 User authentication (Signup/Login with JWT)
* 🤖 AI-powered responses GEMINI
* 💬 Real-time styled chat interface
* 📁 Persistent chat history stored in MongoDB
* 🎨 Responsive and modern UI

---

## 🛠️ Installation & Run

### 1. Clone the repository

```bash
git clone https://github.com/prem1kr/Ai-Chat-Support-Full-Stack-website-.git
cd Ai-Chat-Support-Full-Stack-website-
```

---

### 2. Backend Setup (Node.js + Express)

```bash
cd server
npm install
```

**Create a `.env` file inside `/server`**:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gimnia_api_key (if using)
```

Start the backend server:

```bash
npm run start
```

---

### 3. Frontend Setup (React)

```bash
cd ../client
npm install
```

**Create a `.env` file inside `/client`**:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm start
```

---

## 🌐 Deployment (Render + GitHub)

### 🖥️ Frontend (React)

1. Push your code to a GitHub repository.

2. Go to [Render](https://render.com/), create a new **Static Site**.

3. Connect your repo and set:

   * **Build Command:** `npm run build`
   * **Publish Directory:** `client/build`
   * **Environment Variable:** (Optional) `REACT_APP_API_URL=https://your-backend-url`

4. Deploy.

---

### 🖥️ Backend (Node.js/Express)

1. On Render, create a **Web Service**.

2. Connect to GitHub repo.

3. Set:

   * **Build Command:** `npm install`
   * **Start Command:** `node server.js`
   * **Root Directory:** `server`

4. Add environment variables: `PORT`, `MONGO_URI`, `JWT_SECRET`, etc.

5. Deploy.

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/01a7a994-a39b-4e82-9a0e-df12feff1eac)
![Screenshot 2025-07-03 150116](https://github.com/user-attachments/assets/98601b1a-2f6d-4c81-ab7a-0d25fb38846c)
![Screenshot 2025-07-03 150055](https://github.com/user-attachments/assets/3867c479-d9a6-477f-bc3f-a095897d6bfa)



---

## 📚 Tech Stack

* **Frontend:** React, Axios, CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **Auth:** JWT
* **AI Integration:** google gimnia / LLM APIs
* **Deployment:** Render + GitHub

---

## 🧠 Future Improvements

* Upload PDF/FAQ and generate contextual replies
* Typing indicator animation
* Admin dashboard for viewing all chats
* Role-based access control

---

## 🧑‍💻 Author

* **👤 Prem Kumar**
* GitHub: [@prem1kr](https://github.com/prem1kr)

---
