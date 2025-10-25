// index.js
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import reviewCode from "./AI/geminiApi.js";
import axios from "axios";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// 🧠 Convert GitHub HTML commit URL → API URL
function convertToApiUrl(htmlUrl) {
    return htmlUrl
        .replace("https://github.com/", "https://api.github.com/repos/")
        .replace("/commit/", "/commits/");
}
// ✅ Test route
app.post("/testAI", async (req, res) => {
    const result = await reviewCode("Hello Sowreesh! Testing AI integration ✅");
    console.log(result);
    return res.json({ response: result });
});
// 🧩 Webhook route — Triggered by GitHub
app.post("/comment", async (req, res) => {
    try {
        const { commits, repository } = req.body;
        if (!commits?.length) {
            return res.status(400).json({ message: "❌ No commits found in payload" });
        }
        const diffs = [];
        for (const commit of commits) {
            try {
                const apiUrl = convertToApiUrl(commit.url);
                console.log("📡 Fetching commit data from:", apiUrl);
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `token ${process.env.GITHUB_API_KEY}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                });
                const data = response.data;
                diffs.push({
                    id: data.sha,
                    author: data.commit.author.name,
                    message: data.commit.message,
                    files: data.files
                        ? data.files.map((f) => ({
                            filename: f.filename,
                            status: f.status,
                            patch: (f.patch ? f.patch.substring(0, 500) : "") + "...",
                        }))
                        : [],
                });
            }
            catch (err) {
                console.error("⚠️ GitHub API fetch failed:", err.message);
            }
        }
        // 🧠 Prepare diff text for Gemini
        const diffText = diffs
            .map((d) => {
            const filesChanged = d.files
                .map((f) => `📄 **${f.filename}** (${f.status})\n\`\`\`diff\n${f.patch}\n\`\`\``)
                .join("\n");
            return `🔹 Commit: ${d.id}\n👤 Author: ${d.author}\n💬 Message: ${d.message}\n${filesChanged}`;
        })
            .join("\n\n====================\n\n");
        console.log("🧩 Combined diff text ready for Gemini...");
        const aiResponse = await reviewCode(diffText);
        console.log("🤖 Gemini AI Review:", aiResponse);
        // 📝 Add a comment to the latest commit on GitHub
        const latestCommit = commits[commits.length - 1];
        const [owner, repo] = [repository.owner.name, repository.name];
        const sha = latestCommit.id;
        const commentUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${sha}/comments`;
        console.log(`💬 Posting AI review comment to ${commentUrl}`);
        await axios.post(commentUrl, {
            body: `🤖 **AI Code Review (SowreeshHelperAI)**\n\n${aiResponse}`,
        }, {
            headers: {
                Authorization: `token ${process.env.GITHUB_API_KEY}`,
                Accept: "application/vnd.github.v3+json",
            },
        });
        console.log("✅ Comment posted successfully on GitHub!");
        return res.status(200).json({
            message: "✅ Code review generated and commented successfully",
        });
    }
    catch (error) {
        console.error("❌ Error in /comment route:", error.message);
        return res.status(500).json({ error: error.message });
    }
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Running on port ${process.env.PORT || 3000}`);
});
//# sourceMappingURL=index.js.map