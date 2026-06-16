# 🛡️ Smart Email Cleaner Bot

An automated, intelligent, and secure full-stack Gmail management system. This application allows users to authenticate securely via Google OAuth 2.0, scan their inboxes in live batches, instantly filter out junk messages using dynamic custom keywords, and wipe them out en masse via the Gmail API.

⚡ **Live Production URL:** [https://smart-email-cleaner-bot.onrender.com/](https://smart-email-cleaner-bot.onrender.com/)

---

## 🔒 Security, Trust & Google Notice (⚠️ Read First)

When logging into this app for the first time, Google will display a warning screen saying **"Google hasn't verified this app"** or that the app is **"Unsafe"**. 

### Why does Google show this warning?
*   **Developer Status:** This is an open-source tool developed for personal and community utility. To remove this screen, Google requires an expensive and lengthy official enterprise verification process.
*   **Sensitive Scopes:** Because this bot has the power to manage and move spam emails to the trash folder on your command, Google triggers an automated guardrail warning to ensure you trust the developer.

### Why is this app 100% Safe to use?
1.  **Open Source & Transparent:** Every single line of code running this bot is published right here in this repository. There are no hidden backdoors.
2.  **Zero Data Retention:** This app does **NOT** use any database. Your access tokens, profile metrics, and email subject lines exist purely in-memory during your active session and vanish completely the moment you close the tab.
3.  **Complete Privacy:** No one, including the developer, can see or access your inbox data. All API calls happen directly between your browser, this node instance, and official Google servers.

### 💡 How to bypass the warning screen to use the app:
1.  Click on the **"Advanced"** button/link on the left side of the Google warning screen.
2.  Click on the link that says **"Go to smart-email-cleaner-bot.onrender.com (unsafe)"** at the bottom.
3.  Grant permissions, and you are ready to clean your inbox safely!

---

## 🚀 Key Features

*   **Secure Google OAuth 2.0 Integration:** Multi-user secure login pipeline fetching live verified Google profile cards (Name, Email, Profile Picture).
*   **Sequential Typewriter Animation:** High-end terminal-style animated loading sequence (`.` ➔ `..` ➔ `...`) baked natively with Tailwind CSS utilities.
*   **Live Batch Scanner Architecture:** Real-time data processing streaming inside segmented view grids parsing 100 emails concurrently.
*   **Dynamic Custom Keywords Engine:** Real-time user input query targets separated by commas to clean mass newsletters or targeted marketing campaigns instantly.
*   **One-Tap Remote Trashing:** Integrated with direct structural hook controls allowing users to move targeted safe emails to the remote Gmail trash folder instantly.
*   **Dark-Mode Fluid UI:** Responsive dashboard design structured beautifully using standard styling protocols for modern visual balance.

---

## 🎨 System Architecture Dashboard Preview

```text
+-----------------------------------------------------------------------+
|  [🛡️ Smart Email Cleaner...]  [Profile Image] Atik Ahmed (User Email)  |
+-----------------------------------------------------------------------+
|  [Custom Filter Input Box]                     [Bulk Filter & Delete] |
+-----------------------------------------------------------------------+
|  Scanned Counter: 100  |  Deleted Junk: 42  |  Kept Safe Inbox: 58     |
+-----------------------------------------------------------------------+
|  [❌ Deleted Junk Emails Display List] | [[✓ Verified Safe Display List] |
+-----------------------------------------------------------------------+