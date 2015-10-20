class CreateMuseums < ActiveRecord::Migration
  def change
    create_table :museums do |t|
      t.timestamps
      t.string :data
      t.references :neighborhood
    end
  end
end
