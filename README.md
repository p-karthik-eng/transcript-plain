# 🧾 Transcript Generator

A lightweight and efficient **Transcript Generator** service that generates readable transcripts from YouTube videos — built with simplicity and scalability in mind.

## 🚀 Overview

This service allows users to generate and view transcripts from any YouTube video by simply sending its **URL** to the backend service.

## ⚙️ How It Works

1. The user sends a **YouTube video URL** to the service.
2. The request passes through a **dedicated route** that forwards the URL to the **yt-dlp handler**.
3. The handler processes the video and retrieves the **transcript data**.
4. The generated transcript is then served on the **specified port**, ready to be displayed or consumed by other services.

## 🧠 Workflow Summary

```
Client → /generate-transcript → yt-dlp Handler → Generate Transcript → Response on Port
```

## 🧩 Example Usage

### Request

```bash
POST /generate-transcript
Content-Type: application/json

{
  "youtube_url": "https://www.youtube.com/watch?v=abcd1234"
}
```

### Response

```json
{
  "video_id": "abcd1234",
  "transcript": "Welcome to the video..."
}
```

## 🛠️ Tech Stack

- **Node.js / Express** — Backend server
- **yt-dlp** — Transcript and metadata handler
- **REST API** — Standardized communication layer
- **JSON** — Clean and consistent response format

## 💻 How to Run the Project

Follow these simple steps to get the project running locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/p-karthik-eng/transcript-plain.git
```

### 2️⃣ Navigate into the Project Directory

```bash
cd transcript-plain
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Run the Server

```bash
node index.js
```

Once the server starts, it'll be running on port 5000 (by default).

### 5️⃣ Generate a Transcript

Open your browser or use a tool like Postman and hit the following endpoint:

```
http://localhost:5000/api/get-transcript?url=<youtube-url>
```

Replace `<youtube-url>` with the YouTube video link you want to generate a transcript for.

### ✅ Example

```
http://localhost:5000/api/get-transcript?url=https://www.youtube.com/watch?v=abcd1234
```

You'll receive the transcript response in JSON format.

## 📁 Project Structure

```
.
├── index.js
├── package.json
├── package-lock.json
├── routes
│   ├── getTranscriptRoute.js
│   └── proxyRoute.js
├── utils
│   └── ytDlpHandler.js
└── yt-dlp
```

### File Descriptions

- **index.js** — Entry point of the server
- **routes/getTranscriptRoute.js** — Defines the transcript generation route
- **routes/proxyRoute.js** — Handles proxy-related requests
- **utils/ytDlpHandler.js** — Core yt-dlp handler logic for extracting transcripts
- **package.json** — Project dependencies and scripts
- **yt-dlp** — yt-dlp binary executable
