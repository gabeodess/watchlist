class CreateProductions < ActiveRecord::Migration[7.1]
  def change
    create_table :productions do |t|
      t.string :title, null: false
      t.integer :themoviedb_id, null: false
      t.string :type, null: false
      t.date :released_on, null: false
      t.string :image_url, null: false

      t.timestamps
    end
    add_index :productions, :themoviedb_id, unique: true
    add_index :productions, :type
  end
end
