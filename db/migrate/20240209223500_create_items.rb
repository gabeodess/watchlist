class CreateItems < ActiveRecord::Migration[7.1]
  def change
    create_table :items do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :production, null: false, foreign_key: true

      t.timestamps
    end

    add_index :items, [:user_id, :production_id], unique: true
  end
end
