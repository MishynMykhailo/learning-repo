import express from "express";
import multer from "multer";
import path from "path";
import uploadFiles from "../controllers/uploadFiles";

const uploadDir = path.join(process.cwd(), "storage/tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const safeBase = base.replace(/[^a-z0-9_-]/gi, "_").toLowerCase();
    const unique = Date.now();
    cb(null, `${safeBase}-${unique}${ext}`);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.post("/", upload.single("filename"), uploadFiles);

export default router;
