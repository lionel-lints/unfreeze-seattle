class CreateParks < ActiveRecord::Migration
  def change
    create_table :parks do |t|
      t.timestamps
      t.string :data
      t.references :neighborhood
    end
  end
end
