# 🧾 Transcript Generator

A lightweight and efficient **Transcript Generator** service that generates readable transcripts from YouTube videos — built with simplicity and scalability in mind.

---

## 🚀 Overview

This service allows users to generate and view transcripts from any YouTube video by simply sending its **URL** to the backend service.

---

## ⚙️ How It Works

1. The user sends a **YouTube video URL** to the service.  
2. The request passes through a **dedicated route** that forwards the URL to the **yt-dlp handler**.  
3. The handler processes the video and retrieves the **transcript data**.  
4. The generated transcript is then served on the **specified port**, ready to be displayed or consumed by other services.

---

## 🧠 Workflow Summary

