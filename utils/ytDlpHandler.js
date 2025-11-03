import { exec } from "child_process";
import fs from "fs";

export const fetchTranscript = (url) => {
  return new Promise((resolve, reject) => {
    // ✅ Improved regex to support both YouTube formats
    const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    const videoId = match ? match[1] : null;
    if (!videoId) return reject("Invalid YouTube URL format");

    // ✅ Windows-friendly yt-dlp command
    const cmd = `yt-dlp --write-auto-sub --sub-lang en --skip-download -o "%(id)s.%(ext)s" ${url}`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);

      const vttFile = `${videoId}.en.vtt`;
      if (!fs.existsSync(vttFile)) return reject("No captions found for this video");

      const content = fs.readFileSync(vttFile, "utf8");
      fs.unlinkSync(vttFile);
      resolve(content);
    });
  });
};
