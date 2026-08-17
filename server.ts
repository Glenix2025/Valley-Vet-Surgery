import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT, getLocalFallbackResponse } from './src/data/valleyVetData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      // Return smart fallback if API key is not configured
      const fallback = getLocalFallbackResponse(message);
      return res.json({ reply: fallback });
    }

    // Build chat conversation with Gemini
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user' && item.text) {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'assistant' && item.text) {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }
    }

    // Add current user prompt
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.3,
        topP: 0.85,
      },
    });

    const reply = response.text || getLocalFallbackResponse(message);
    return res.json({ reply: reply.trim() });
  } catch (error: any) {
    console.error('Error generating response:', error);
    // Fallback gracefully so client never breaks
    const fallback = getLocalFallbackResponse(req.body.message || '');
    return res.json({ reply: fallback, note: 'Generated with verified clinic fallback' });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Valley Veterinary Surgery Assistant' });
});

// Serve static assets in production
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
