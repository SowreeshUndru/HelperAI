#  AIHelper

AIHelper is a backend automation tool that reviews each GitHub commit, generates AI-based feedback, and posts comments with detailed flow diagrams.  
Built using **Node.js**, **TypeScript**, **Gemini API**, and **GitHub Webhooks**, it automates intelligent code review and visualization.

---

## ⚙️ Local Development Setup

### 1️ Clone the Repository     
```bash
git clone https://github.com/SowreeshUndru/HelperAI.git
cd HelperAI
```

### 2️ Install Dependencies
```bash
npm install
```

### 3️ Configure Environment Variables
Create a `.env` file in the project root with the following content:

```env
PORT=3000
GEMINI_API_KEY=
GITHUB_API_KEY=
MONGODB_URI=
NGROK_AUTHTOKEN=
```

>  Replace the above values with your own API keys and credentials.

---

### 4️ Setup a Constant Ngrok Domain
1. Visit [https://ngrok.com](https://ngrok.com)
2. Get a **static domain**
3. Add that domain (e.g., `https://malpighiaceous-stuffed-l.ngrok-free.dev`) inside your `.env` file.

---

### 5️ Run the Application Locally
Use **two terminals**:

####  Terminal 1 – Start Webhook
```bash
npm run webhook
```

####  Terminal 2 – Start Server
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


**Author:** [Undru Sowreesh](https://github.com/SowreeshUndru)  
📧 sowreeshundru@gmail.com


 How to use it (step by step):
1)Generate a GitHub Personal Access Token (PAT) with the required repository permissions.
2)Copy the generated token and submit your GitHub username and PAT at: https://helperai.onrender.com/addToken.html
3)Open your GitHub repository → Settings → Webhooks.
4)Add the AIHelper webhook URL: https://helperai.onrender.com/comment and set the Content-Type to application/json.
5)Enable the Push event (or the required repository events) and save the webhook.
6)Setup is complete! You can now enjoy AI-powered code review and commit summarization.
7)Push a new commit to your repository to automatically trigger AIHelper and receive AI-generated review feedback.



