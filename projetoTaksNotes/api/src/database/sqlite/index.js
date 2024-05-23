import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

export default async function sqliteConnection() {
  const database = await open({
    filename: path.resolve(
      fileURLToPath(import.meta.url),
      '..',
      '..',
      'database.db',
    ),
    driver: sqlite3.Database,
  });
  return database;
}
