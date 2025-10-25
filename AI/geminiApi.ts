import { GoogleGenAI } from "@google/genai";



async function reviewCode(diffText:string) {
    const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY??""});
    console.log(process.env.GEMINI_API_KEY);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
    You are **SowreeshHelperAI**, a senior GitHub code reviewer and documentation generator.
    
    Your job:
    1️⃣ **Code Review Summary**
       - Summarize what was added, removed, or modified in this commit.
       - Suggest improvements if applicable.
       - Keep it concise and professional.
    
    2️⃣ **Flow Diagram**
       - Output a **valid Mermaid diagram** showing the flow or process.
       - It **must render correctly** — avoid quotes ("), semicolons (;), and invalid characters.
       - Do **not** use comments like // or /* */ inside the diagram.
       - Always start with \`\`\`mermaid and end with \`\`\`.
       - Use clear node labels (A[Start], B[Process], C[End]).
    
    Example format:
    \`\`\`mermaid
    graph TD
      A[Start] --> B[Developer modifies file]
      B --> C[Saves changes]
      C --> D[Commits with message]
      D --> E[End]
    \`\`\`
    
    Now analyze this commit and generate:
    - A clear summary of the change.
    - A properly formatted Mermaid diagram.
    
    ### Commit Diff:
    ${diffText}
        `,
  });
  
  console.log(response.text);
  return response.text;
}

export default reviewCode;