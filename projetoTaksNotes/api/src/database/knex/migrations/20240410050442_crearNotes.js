const up = (knex) =>
  knex.schema.createTable('notes', (table) => {
    table.increments('id').primary();
    table.text('title');
    table.text('description');
    table.integer('id_usuario').unsigned().references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

const down = (knex) => knex.schema.dropTableIfExists('notes');

export { up, down };
