# 🧠 AIHelper

AIHelper is a backend automation tool that reviews each GitHub commit, generates AI-based feedback, and posts comments with detailed flow diagrams.  
Built using **Node.js**, **TypeScript**, **Gemini API**, and **GitHub Webhooks**, it automates intelligent code review and visualization.

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SowreeshUndru/HelperAI.git
cd HelperAI
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the project root with the following content:

```env
PORT=3000
GEMINI_API_KEY=
GITHUB_API_KEY=
MONGODB_URI=
NGROK_AUTHTOKEN=
```

> ⚠️ Replace the above values with your own API keys and credentials.

---

### 4️⃣ Setup a Constant Ngrok Domain
1. Visit [https://ngrok.com](https://ngrok.com)
2. Get a **static domain**
3. Add that domain (e.g., `https://malpighiaceous-stuffed-l.ngrok-free.dev`) inside your `.env` file.

---

### 5️⃣ Run the Application Locally
Use **two terminals**:

#### 🖥️ Terminal 1 – Start Webhook
```bash
npm run webhook
```

#### 🖥️ Terminal 2 – Start Server
```bash
npm run dev
```

Expected output:
```
Running on port 3000
✅ MongoDB Connected
```

---

## 🐳 Docker Deployment

### 🧱 Build Docker Image
```bash
docker build -t aihelper:0.1.0 .
```

### ▶️ Run Container
```bash
docker run -p 3000:3000 --env-file .env aihelper:0.1.0
```

This loads all environment variables automatically from your `.env` file.

---

## 🧩 Docker Compose Deployment (Recommended)

For an instant setup with a single command:

```bash
docker compose up
```

Example output:
```
Running on port 3000
✅ MongoDB Connected
```

Stop with `Ctrl + C` — it will gracefully exit.  
Compose automatically uses the `.env` file.

---

## ☁️ CI/CD Deployment on AWS EC2

This project supports **continuous deployment** via **GitHub Actions**:
- Builds Docker image
- Connects to AWS EC2 via SSH
- Deploys and restarts the container automatically

Trigger: pushing code to the `main` branch 🚀

---

## 🧠 Tech Stack
- **Backend:** Node.js, TypeScript, Express.js  
- **AI & Visualization:** Gemini API  
- **Database:** MongoDB  
- **Automation:** GitHub Webhooks  
- **Deployment:** Docker, Docker Compose, GitHub Actions, AWS EC2  

---

**Author:** [Undru Sowreesh](https://github.com/SowreeshUndru)  
📧 sowreeshundru@gmail.com
