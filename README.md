🧾 Transcript Generator

A lightweight and efficient Transcript Generator service that generates readable transcripts from YouTube videos — built with simplicity and scalability in mind.

🚀 Overview

This service allows users to generate and view transcripts from any YouTube video by simply sending its URL to the backend service.

⚙️ How It Works

The user sends a YouTube video URL to the service.

The request passes through a dedicated route that forwards the URL to the yt-dlp handler.

The handler processes the video and retrieves the transcript data.

The generated transcript is then served on the specified port, ready to be displayed or consumed by other services.

🧠 Workflow Summary
Client → /generate-transcript → yt-dlp Handler → Generate Transcript → Response on Port

🧩 Example Usage
POST /generate-transcript
{
  "youtube_url": "https://www.youtube.com/watch?v=abcd1234"
}


Response:

{
  "video_id": "abcd1234",
  "transcript": "Welcome to the video..."
}

🛠️ Tech Stack

Node.js / Express — Backend server

yt-dlp — Transcript and metadata handler

REST API — Standardized communication layer

JSON — Clean and consistent response format
