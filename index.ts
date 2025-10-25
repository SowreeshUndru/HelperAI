// index.js
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import reviewCode from "./AI/geminiApi.js";
import path from "path";
import axios from "axios";
import {connectDB,User} from "./database/db.js"
import { fileURLToPath } from "url";
//FIND THIS COMMIT
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

function convertToApiUrl(htmlUrl:any) {
  return htmlUrl
    .replace("https://github.com/", "https://api.github.com/repos/")
    .replace("/commit/", "/commits/");
}


app.post("/addToken", async (req, res) => {
  const {name,token}=req.body;
  await User.create({
    name,
    token
  });
  res.json({message:"successfully stored"});
 
});


app.post("/comment", async (req, res) => {
  try {
    const { commits, repository } = req.body;

    if (!commits?.length) {
      return res.status(400).json({ message: " No commits found in payload" });
    }

    const diffs = [];

    for (const commit of commits) {
      try {
        const apiUrl = convertToApiUrl(commit.url);
        console.log("Fetching commit data from:", apiUrl);

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
            ? data.files.map((f:any) => ({
                filename: f.filename,
                status: f.status,
                patch: (f.patch ? f.patch.substring(0, 500) : "") + "...",
              }))
            : [],
        });
      } catch (err:any) {
        console.error(" GitHub API fetch failed:", err.message);
      }
    }

    
    const diffText = diffs
      .map((d) => {
        const filesChanged = d.files
          .map(
            (f:any) =>
              ` **${f.filename}** (${f.status})\n\`\`\`diff\n${f.patch}\n\`\`\``
          )
          .join("\n");
        return `🔹 Commit: ${d.id}\n Author: ${d.author}\n Message: ${d.message}\n${filesChanged}`;
      })
      .join("\n\n====================\n\n");

    console.log(" Combined diff text ready for Gemini...");
    const aiResponse = await reviewCode(diffText);

    console.log(" Gemini AI Review:", aiResponse);

    
    const latestCommit = commits[commits.length - 1];
    const [owner, repo] = [repository.owner.name, repository.name];
    const sha = latestCommit.id;
      console.log(owner);
    const commentUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${sha}/comments`;

    console.log(` Posting AI review comment to ${commentUrl}`);
      const user= await User.findOne({name:owner});
      var newtoken;
      if(user){
         newtoken=user.token;
      }else{
        res.json({message:"error"});
      }
      console.log("newtoken:",newtoken);
    await axios.post(
      commentUrl,
      {
        body: ` **AI Code Review (SowreeshHelperAI)**\n\n${aiResponse}`,
      },
      {
        headers: {
          Authorization: `token ${newtoken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    console.log("Comment posted successfully on GitHub!");

    return res.status(200).json({
      message: "Code review generated and commented successfully",
    });
  } catch (error:any) {
    console.error("Error in /comment route:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(` Running on port ${process.env.PORT || 3000}`);
});
