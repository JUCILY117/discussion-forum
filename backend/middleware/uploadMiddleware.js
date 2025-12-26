import crypto from "crypto";
import fs from "fs";
import multer from "multer";
import path from "path";

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = file.fieldname === "avatar" ? "avatars" : "banners";
        const uploadPath = path.join("uploads", type);
        ensureDir(uploadPath);
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        const userId =
            req.user?.userId ??
            req.user?.id ??
            crypto.randomUUID();

        cb(null, `${userId}-${Date.now()}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 },
});
