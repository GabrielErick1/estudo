import sqliteConection from '../../sqlite/index.js';
import { createUsers } from './createUsers.js';

export default async function migration() {
  const schemas = [createUsers].join('');
  sqliteConection()
    .then((db) => db.exec(schemas))
    .catch((err) => console.error(err));
}
