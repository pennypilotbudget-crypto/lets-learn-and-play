// ─────────────────────────────────────────────────────────────
//  Let's Learn And Play — settings
//  Paste your Firebase web app settings below (README step 3).
//  While apiKey still says PASTE_..., the site runs in DEMO MODE
//  (everything stays in your own browser — good for trying it out).
// ─────────────────────────────────────────────────────────────
window.LLP_CONFIG = {
  firebase: {
    apiKey: "AIzaSyDwXxZ3IAT-ZAabu7NIlEjHRLZ0tVaKHDo",
    authDomain: "lets-learn-and-play.firebaseapp.com",
    projectId: "lets-learn-and-play",
    storageBucket: "lets-learn-and-play.firebasestorage.app",
    messagingSenderId: "874392766820",
    appId: "1:874392766820:web:352f951836b091d3f2d271"
  },
  // Where the AI question-maker lives. Leave this as it is on Vercel.
  aiEndpoint: "/api/generate"
};
