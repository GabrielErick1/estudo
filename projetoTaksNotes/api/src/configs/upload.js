import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { randomBytes } from 'crypto';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp');
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, 'uploads');

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename: (req, file, cb) => {
      const filehash = randomBytes(10).toString('hex');
      const filename = `${filehash}-${file.originalname}`;
      return cb(null, filename);
    },
  }),
};

export { TMP_FOLDER, UPLOAD_FOLDER, MULTER };
