import fs from 'fs';
import path from 'path';
import { UPLOAD_FOLDER, TMP_FOLDER } from '../configs/upload.js';

export class Diskstorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOAD_FOLDER, file),
    );
    return file;
  }
  async deleteFile(file) {
    const filePath = path.resolve(UPLOAD_FOLDER, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
