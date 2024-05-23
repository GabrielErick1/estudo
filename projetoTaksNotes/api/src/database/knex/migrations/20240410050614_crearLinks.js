const up = (knex) =>
  knex.schema.createTable('links', (table) => {
    table.increments('id');
    table.text('url').notNullable();
    table.timestamp('created_at').default(knex.fn.now());
    table
      .integer('id_note')
      .references('id')
      .inTable('notes')
      .onDelete('CASCADE');
  });

const down = (knex) => knex.schema.dropTable('links');

export { up, down };
