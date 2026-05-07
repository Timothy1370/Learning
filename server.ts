import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // AirQo Grids Proxy
  app.get("/api/airqo/grids", async (req, res) => {
    try {
      const AIRQO_API_KEY = process.env.AIRQO_API_KEY || 'ZZ1NZ31FFCTEUBFS';
      const url = `https://api.airqo.net/api/v2/devices/grids?tenant=airqo&token=${AIRQO_API_KEY}`;
      
      console.log(`Server: Fetching AirQo Grids...`);
      const response = await fetch(url);
      
      if (!response.ok) {
        return res.status(response.status).json({ error: "AirQo Grids API error" });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // AirQo Proxy Route (Measurements)
  app.get("/api/airqo/recent", async (req, res) => {
    try {
      const AIRQO_API_KEY = process.env.AIRQO_API_KEY || 'ZZ1NZ31FFCTEUBFS';
      // Targeted Grid ID for Kampala environment
      const gridId = '67c9681471c7b0001383d7a';
      
      // We try the grid endpoint first as it's more specific to Kampala
      const url = `https://api.airqo.net/api/v2/devices/measurements/grids/${gridId}?token=${AIRQO_API_KEY}`;
      
      console.log(`Server: Fetching AirQo Kampala Grid data...`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AIRQO_API_KEY}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.error(`Server: AirQo API error (${response.status}) at grid endpoint.`);
        
        // Fallback to general recent measurements if grid fails
        console.log(`Server: Trying fallback endpoint...`);
        const fallbackUrl = `https://api.airqo.net/api/v2/devices/measurements/recent?tenant=airqo&token=${AIRQO_API_KEY}`;
        const fallbackResponse = await fetch(fallbackUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${AIRQO_API_KEY}`,
            'Accept': 'application/json'
          }
        });
        
        if (!fallbackResponse.ok) {
           return res.status(fallbackResponse.status).json({ error: "AirQo API error fallback" });
        }
        
        const fallbackData = await fallbackResponse.json();
        return res.json(fallbackData);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Server: Proxy Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
