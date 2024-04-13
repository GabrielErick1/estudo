import config from '../../../knexfile.js';
import knax from 'knex';

const coneccao = knax(config.development);
export default coneccao;
