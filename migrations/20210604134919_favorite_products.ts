import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('favorite_products', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.integer('client_id').unsigned().nullable();
    table.string('product_id').notNullable();
    table.timestamps(true, true);

    table.foreign('client_id')
      .references('client.id')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('favorit_produtcs');
}
