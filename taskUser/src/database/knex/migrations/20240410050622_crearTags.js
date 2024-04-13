const up = (knex) =>
  knex.schema.createTable('tags', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table
      .integer('id_note')
      .references('id')
      .inTable('notes')
      .onDelete('CASCADE');
    table.integer('id_usuario').references('id').inTable('users');
  });

const down = (knex) => knex.schema.dropTable('tags');

export { up, down };
