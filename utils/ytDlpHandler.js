import { exec } from "child_process";
import fs from "fs";

export const fetchTranscript = (url) => {
  return new Promise((resolve, reject) => {
    const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    const videoId = match ? match[1] : null;
    if (!videoId) return reject("Invalid YouTube URL format");

    const cmd = `yt-dlp --write-auto-sub --sub-lang en --skip-download -o "%(id)s.%(ext)s" ${url}`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);

      const vttFile = `${videoId}.en.vtt`;
      if (!fs.existsSync(vttFile)) return reject("No captions found for this video");

      const content = fs.readFileSync(vttFile, "utf8");
      fs.unlinkSync(vttFile);

      const lines = content.split("\n");
      const transcript = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.includes("-->")) {
          const timestamp = line.split("-->")[0].trim();
          let text = "";
          let j = i + 1;
          while (j < lines.length && lines[j].trim() !== "") {
            const cleanText = lines[j].replace(/<[^>]*>/g, "").trim();
            text += cleanText + " ";
            j++;
          }
          text = text
            .replace(/\s+/g, " ") // normalize spaces
            .trim();

          if (text) {
            transcript.push({ timestamp, text });
          }
        }
      }

      // Merge consecutive or repeated lines that are similar
      const cleaned = [];
      for (let i = 0; i < transcript.length; i++) {
        const current = transcript[i];
        const prev = cleaned[cleaned.length - 1];
        if (
          prev &&
          (current.text.toLowerCase() === prev.text.toLowerCase() ||
            current.text.toLowerCase().includes(prev.text.toLowerCase()) ||
            prev.text.toLowerCase().includes(current.text.toLowerCase()))
        ) {
          // merge or skip repeated line
          continue;
        } else {
          cleaned.push(current);
        }
      }

      // Format timestamps nicely (e.g., 00:01:23 --> [1:23])
      const formatTime = (ts) => {
        const match = ts.match(/(\d{2}):(\d{2}):(\d{2})/);
        if (!match) return ts;
        const [, hh, mm, ss] = match;
        const h = parseInt(hh, 10);
        const m = parseInt(mm, 10);
        const s = parseInt(ss, 10);
        return h > 0 ? `[${h}:${mm}:${ss}]` : `[${m}:${ss}]`;
      };

      // Build pretty output
      let formatted = "";
      cleaned.forEach(({ timestamp, text }) => {
        formatted += `${formatTime(timestamp)} ${text}\n\n`;
      });

      resolve(formatted.trim());
    });
  });
};
