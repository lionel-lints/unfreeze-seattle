class CreateWiki < ActiveRecord::Migration
  def change
    create_table :wikis do |t|
      t.timestamps
      t.string :data
      t.references :neighborhood
    end
  end
end
