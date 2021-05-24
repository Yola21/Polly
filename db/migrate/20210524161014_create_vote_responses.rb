class CreateVoteResponses < ActiveRecord::Migration[6.1]
  def change
    create_table :vote_responses do |t|
      t.integer :poll_id, null: false
      t.integer :user_id, null: false
      t.text :option, null: false
      t.timestamps
    end
  end
end
