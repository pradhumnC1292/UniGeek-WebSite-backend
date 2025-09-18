// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { dbConnection } from "./config/db.js";
// import formRoutes from "./routes/formRoutes.js";
// import mentorRoutes from "./routes/mentorRoutes.js";
// import faqRoutes from "./routes/faqRoutes.js";
// import curriculumRoutes from "./routes/curriculumRoutes.js";
// import mentorFormRoutes from "./routes/MentorFormRoutes.js";
// import hiringRoutes from "./routes/hiringRoutes.js";

// dotenv.config({ path: "./config.env" });

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to the database
// dbConnection();

// // Use routes
// app.use("/api", formRoutes);
// app.use("/api", mentorRoutes);
// app.use("/api", faqRoutes);
// app.use("/api", curriculumRoutes);
// app.use("/api/mentorform", mentorFormRoutes);
// app.use("/api/hiring", hiringRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js  — Hardened for production + AWS/S3

// ============ [ 1) Imports ] ============
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";

// Your existing routes (unchanged paths/names)
import formRoutes from "./routes/formRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import curriculumRoutes from "./routes/curriculumRoutes.js";
import mentorFormRoutes from "./routes/MentorFormRoutes.js";
import hiringRoutes from "./routes/hiringRoutes.js";

// Temp admin lock for write endpoints
import adminAuth from "./middleware/adminAuth.js";

// ============ [ 2) App bootstrap ] ============

dotenv.config({ path: "./config.env" }); // optional fallback

const app = express();
app.set("trust proxy", 1); // needed when behind AWS ALB/ELB/NGINX
app.disable("x-powered-by");

// Body parsing with a safe limit
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ============ [ 3) Security middleware ] ============
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
); // secure headers
app.use(mongoSanitize()); // prevent NoSQL injection
app.use(hpp()); // prevent HTTP param pollution
app.use(compression()); // gzip responses

// CORS (allow prod + dev origins; safe fallback for non-browser requests)
const allowlist = [
  process.env.FRONTEND_URL, // e.g., https://app.your-domain.com
  process.env.FRONTEND_URL_2, // optional: preview domain
  "http://localhost:5173", // Vite dev
  "http://localhost:3000", // CRA/Next dev (if you use it)
].filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // no Origin header (e.g., curl, server-to-server) => allow
      if (!origin) return cb(null, true);
      if (allowlist.includes(origin)) return cb(null, true);
      return cb(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Admin-Token"],
  })
);

// Handle preflight for all routes
app.options("*", cors());

// Optional request logging (quiet in production)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Basic rate limit for all API routes
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ============ [ 4) Health check ] ============
app.get("/healthz", (_req, res) => res.status(200).json({ ok: true }));

// ============ [ 5) DB connect ] ============
dbConnection(); // uses process.env.MONGODB_URI

// ============ [ 6) Temp write-guards ] ============
// Only protect write methods; allow public GETs for reading.
app.use("/api/curriculum", (req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method))
    return adminAuth(req, res, next);
  return next();
});
app.use("/api/mentors", (req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method))
    return adminAuth(req, res, next);
  return next();
});
// (Repeat the same pattern for any other write endpoints you expose.)

// ============ [ 7) Mount routes ] ============
app.use("/api", formRoutes);
app.use("/api", mentorRoutes);
app.use("/api", faqRoutes);
app.use("/api", curriculumRoutes);
app.use("/api/mentorform", mentorFormRoutes);
app.use("/api/hiring", hiringRoutes);

// ============ [ 8) Central error handler ] ============
app.use((err, _req, res, _next) => {
  // Avoid leaking stack traces in prod; log server-side only
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

// ============ [ 9) Start server ] ============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
