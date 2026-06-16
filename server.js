import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = [
  "http://localhost:5000",
  "https://smart-email-cleaner-bot.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

const PORT = process.env.PORT || 5000;

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/gmail.modify' 
];

let savedTokens = null;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/auth/google", (req, res) => {
  savedTokens = null; 
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "select_account"
  });
  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  res.redirect("/dashboard.html?code=" + code);
});

// User Profile Endpoint to fetch login details
app.get("/api/user-profile", async (req, res) => {
  if (!savedTokens) return res.status(401).json({ error: "Unauthorized" });
  
  try {
    oauth2Client.setCredentials(savedTokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    
    res.json({
      name: userInfo.data.name,
      email: userInfo.data.email,
      picture: userInfo.data.picture
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Main Batch Scanning API
app.post("/api/scan", async (req, res) => {
  const { code, pageToken, customKeywords } = req.body; 
  if (!code) return res.status(400).json({ error: "Code missing" });

  try {
    if (!savedTokens) {
      const { tokens } = await oauth2Client.getToken(code);
      savedTokens = tokens;
    }
    
    oauth2Client.setCredentials(savedTokens);
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    let deletedCount = 0;
    let totalScanned = 0;
    let deletedEmails = [];
    let keptEmails = [];

    const finalKeywords = (customKeywords && customKeywords.length > 0) 
      ? customKeywords.map(k => k.replace(/\s+/g, ' ').trim().toLowerCase())
      : ["promo", "sale", "discount", "newsletter"];

    const listResponse = await gmail.users.messages.list({
      userId: "me",
      maxResults: 100, 
      q: "label:INBOX",
      pageToken: pageToken || null 
    });

    const messages = listResponse.data.messages || [];
    const nextPageToken = listResponse.data.nextPageToken || null; 

    if (messages.length > 0) {
      totalScanned = messages.length;
      
      await Promise.all(messages.map(async (msg) => {
        try {
          const messageData = await gmail.users.messages.get({ userId: "me", id: msg.id });
          const headers = messageData.data.payload.headers;
          
          const subject = headers.find(h => h.name.toLowerCase() === "subject")?.value || "No Subject";
          const from = headers.find(h => h.name.toLowerCase() === "from")?.value || "Unknown Sender";

          const cleanSubject = subject.replace(/\s+/g, ' ').trim().toLowerCase();
          const cleanFrom = from.replace(/\s+/g, ' ').trim().toLowerCase();

          const isSpam = finalKeywords.some(keyword => 
            cleanSubject.includes(keyword) || cleanFrom.includes(keyword)
          );

          if (isSpam) {
            await gmail.users.messages.trash({ userId: "me", id: msg.id });
            deletedEmails.push({ id: msg.id, subject, from });
            deletedCount++;
          } else {
            keptEmails.push({ id: msg.id, subject, from });
          }
        } catch (msgErr) {
          console.error("Skipped single message error:", msgErr.message);
        }
      }));
    }

    res.json({ status: "success", totalScanned, deletedCount, deletedEmails, keptEmails, nextPageToken });

  } catch (error) {
    console.error("API Main Error:", error);
    if (error.message.includes("invalid_grant")) savedTokens = null;
    res.status(500).json({ error: error.message });
  }
});

// Single Message Trash Endpoint via Gmail ID
app.post("/api/delete-single", async (req, res) => {
  const { id } = req.body;
  if (!savedTokens) return res.status(401).json({ error: "Unauthorized" });
  if (!id) return res.status(400).json({ error: "Message ID missing" });

  try {
    oauth2Client.setCredentials(savedTokens);
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    await gmail.users.messages.trash({
      userId: "me",
      id: id
    });

    res.json({ status: "success" });
  } catch (error) {
    console.error("Single Delete Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Bot server running on http://localhost:${PORT}`);
});