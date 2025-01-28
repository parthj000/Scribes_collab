import multer from "multer";
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

export { uploads };
