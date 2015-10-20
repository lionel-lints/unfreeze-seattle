class CreateLandmarks < ActiveRecord::Migration
  def change
    create_table :landmarks do |t|
      t.timestamps
      t.string :data
      t.references :neighborhood
    end
  end
end
