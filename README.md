# 🎮 Let's Learn And Play

A classroom game website: teachers sign in with Google, turn a lesson (PowerPoint, PDF or text) into a game with AI, post it, and share a code, link or QR code. Students join with **just the code and their name — no account**. Teachers watch every answer live, with places (1st, 2nd, 3rd…) and a full report.

**What's inside**

| File | What it is |
|---|---|
| `public/index.html` | The whole website (teacher + student screens, 12 game modes, Arabic) |
| `public/config.js` | **Your Firebase settings go here** |
| `api/generate.js` | The AI question-maker (runs on Vercel, keeps your API key secret) |
| `firestore.rules` | Security rules: who can read and change what |
| `vercel.json`, `package.json` | Hosting settings |

---

## Try it first (2 minutes, no setup)

Double-click `public/index.html` to open it in Chrome. It runs in **demo mode** (a yellow bar says so), and all data stays in your browser.

1. Click **Continue with Google** (in demo mode this signs you in as "Demo Teacher").
2. **Topic library** → pick a topic → **▶ Host** → pick a mode → **🚀 Post game**.
3. Copy the link and open it in a **second window**: that's a student. Type a name, join, play.

The AI question-maker only works once the site is online (steps below).

---

## Put it online (about 15 minutes)

You need three free accounts: **Firebase** (sign-in + database), **Vercel** (hosting) and **Anthropic** (the AI, pay-as-you-go).

### Step 1 — Create a Firebase project
1. Go to <https://console.firebase.google.com> → **Create a project** → give it a name (e.g. `lets-learn-and-play`) → you can turn Google Analytics off → **Create**.

### Step 2 — Turn on sign-in
1. In the left menu: **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable **Google** (choose your email as the support email) → Save.
3. Click **Add new provider**, enable **Anonymous** → Save. *(This is what lets students join without an account.)*

### Step 3 — Create the database and copy your settings
1. **Build → Firestore Database → Create database** → pick a location near you (e.g. `me-central1` for the UAE/Gulf, or `eur3`) → **Start in production mode** → Create.
2. Open the **Rules** tab, delete what's there, paste everything from `firestore.rules` → **Publish**.
3. Click the ⚙️ gear → **Project settings** → scroll to **Your apps** → click the **`</>`** (Web) icon → name it → **Register app**.
4. You'll see `const firebaseConfig = { apiKey: "...", authDomain: "...", ... }`. Copy those values into **`public/config.js`**, replacing the `PASTE_...` placeholders. Save the file.

> These web settings are **not secret**: they're meant to be in the website. Your data is protected by the rules from step 3.2.

### Step 4 — Put the website on Vercel
**Option A: with GitHub (easiest to update later)**
1. Create a new repository on <https://github.com> and upload this whole folder (drag the files into "uploading an existing file").
2. Go to <https://vercel.com> → sign in with GitHub → **Add New → Project** → import your repository → **Deploy**. No build settings needed.

**Option B: from your computer**
1. Install Node.js (<https://nodejs.org>), then in a terminal inside this folder run: `npx vercel` and answer the questions, then `npx vercel --prod`.

Vercel gives you an address like `https://lets-learn-and-play.vercel.app`.

Then **tell Firebase about your address:** Firebase → **Authentication → Settings → Authorized domains → Add domain** → paste your Vercel address *without* `https://` (e.g. `lets-learn-and-play.vercel.app`).

### Step 5 — Get an AI key
1. Go to <https://console.anthropic.com> → sign up → **Billing**: add a few dollars of credit.
2. **API Keys → Create Key** → copy it (starts with `sk-ant-`). Keep it private.

### Step 6 — Add your secrets to Vercel
Vercel → your project → **Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | your key from step 5 |
| `FIREBASE_PROJECT_ID` | your Firebase project ID (it's the `projectId` in config.js) |
| `ANTHROPIC_MODEL` *(optional)* | defaults to `claude-sonnet-5-5`; set `claude-haiku-5-5` for cheaper and faster games |

Then **Deployments → ⋯ → Redeploy** so the new settings are used.

🎉 **Done!** Open your Vercel address, click **Continue with Google**, and make your first game.

---

## Using it in class

- **Make a game:** ✨ Make a game with AI → upload your PowerPoint (.pptx) or PDF (or type a topic) → **Make my game**. In about 30 seconds you get questions at 3 levels (🌱 Warm-Up, 🔥 Core, 🚀 Challenge), each with a fun emoji picture. Pictures from your slides are added to the questions they belong to.
- **Edit:** change any emoji, add your own picture (🖼️), delete or add questions.
- **🚀 Post game** gives you a 6-digit **code**, a **link** and a **QR code** right away. **⚙️ More options** lets you set game length, seconds per question, the level for each student, shuffled answers, showing the right answer, late joining and sounds.
- **Students:** open the website (or the link / QR), type the code, **type their name**, pick a buddy and play. No login.
- **While playing:** 🏆 Leaderboard (places), 📡 Live answers (every answer as it happens), 📊 Report (each student's answers, accuracy and the hardest questions). **📋 Copy results** pastes into Excel or Google Sheets.
- **📊 My games:** every game you hosted (report, link, **🔁 Host again**) and every game you made (host, edit).
- **🌐 عربي** switches the whole site to Arabic (right-to-left). AI games can be written in Arabic, and any game can be translated with **🌐 Translate to Arabic**.

## Good to know
- **Free limits:** Firebase's free plan allows about 50,000 database reads a day. A 30-student, 10-minute game uses roughly 5,000–10,000, so several games a day fit for free. For a whole school, switch Firebase to the **Blaze** (pay-as-you-go) plan: it's very cheap at this size, and you can set a budget alert.
- **AI cost:** each "Make my game" is 3 AI requests (one per level). It usually costs a few cents; check your usage at console.anthropic.com.
- **Files you can upload:** PowerPoint (.pptx), PDF, Word (.docx), Excel (.xlsx), pictures (JPG, PNG, WebP, GIF, screenshots), and text (.txt, .md, .csv, .html) — several at once, or paste a screenshot with Ctrl+V. iPhone HEIC photos need to be JPG.
- **Old .ppt files:** re-save as **.pptx** (File → Save As) or export to PDF first. Google Slides / Keynote: download as .pptx or PDF.
- **Privacy:** students only enter a first name or nickname. Lesson files are read in the teacher's browser and only their text and a few pictures are sent to the AI. The files themselves aren't stored.
- **If sign-in says "unauthorized domain":** redo the last part of step 4.
- **If "Make my game" says the server is missing a key:** redo step 6, including the redeploy.
