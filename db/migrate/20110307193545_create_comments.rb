class CreateComments < ActiveRecord::Migration
  def self.up
    create_table :comments do |t|
      t.string :name, :limit => '300'
      t.string :author, :limit => '300'
      t.string :url, :limit => '300'
      t.text :content

      t.timestamps
    end
  end

  def self.down
    drop_table :comments
  end
end
