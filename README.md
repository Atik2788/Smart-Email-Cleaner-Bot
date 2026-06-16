# 🛡️ Smart Email Cleaner Bot

An automated, intelligent, and secure full-stack Gmail management system. This application allows users to authenticate securely via Google OAuth 2.0, scan their inboxes in live batches, instantly filter out junk messages using dynamic custom keywords, and wipe them out en masse via the Gmail API.

⚡ **Live Production URL:** [https://smart-email-cleaner-bot.onrender.com/](https://smart-email-cleaner-bot.onrender.com/)

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