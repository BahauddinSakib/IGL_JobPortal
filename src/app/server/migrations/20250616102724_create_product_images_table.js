/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('pro_images', function(table) {
    table.increments('id').unsigned().primary(); // Auto-increment ID
    table.string('pro_img_name', 50).collate('utf8mb4_unicode_ci').nullable(); // Image name
    table.integer('pro_product_id').unsigned().notNullable().index(); // FK to products table
    table.boolean('pro_img_status').notNullable().defaultTo(1); // Active/inactive
    table.integer('pro_img_position').nullable(); // Optional order
    table.timestamp('created_at').nullable();
    table.timestamp('updated_at').nullable();

    // Optional: Add foreign key constraint (if products table exists)
    // table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
