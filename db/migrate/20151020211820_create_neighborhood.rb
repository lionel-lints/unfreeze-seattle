class CreateNeighborhood < ActiveRecord::Migration
  def change
    create_table :neighborhoods do |t|
      t.timestamps
      t.string :name
      t.string :polygon_url
      t.string :seattle_url
      t.string :wiki_url
      t.string :display_name
    end
  end
end
