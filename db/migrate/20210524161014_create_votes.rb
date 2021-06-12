class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.integer :poll_id, null: false
      t.integer :user_id, null: false
      t.text :option, null: false
      t.timestamps
    end
  end
end
