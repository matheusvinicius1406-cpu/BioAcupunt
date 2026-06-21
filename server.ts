import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import patientRoutes from "./backend/src/routes/patients";
import appointmentRoutes from "./backend/src/routes/appointments";
import chatRoutes from "./backend/src/routes/chat";
import packageRoutes from "./backend/src/routes/packages";
import financeRoutes from "./backend/src/routes/finance";
import synergyRoutes from "./backend/src/routes/synergy";
import knowledgeRoutes from "./backend/src/routes/knowledge";
import healthRoutes from "./backend/src/routes/health";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.use("/api/patients", patientRoutes);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/packages", packageRoutes);
  app.use("/api/finance", financeRoutes);
  app.use("/api/synergy", synergyRoutes);
  app.use("/api/knowledge", knowledgeRoutes);
  app.use("/api/health", healthRoutes);

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
