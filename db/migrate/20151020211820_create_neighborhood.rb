class CreateNeighborhood < ActiveRecord::Migration
  def change
    create_table :neighborhoods do |t|
      t.timestamps
      t.string :name
      t.string :polygon (url to relative path?)
      t.string :quadrant
      t.string :seattle_url
    end
  end
end
