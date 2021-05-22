class AddOptionsToPoll < ActiveRecord::Migration[6.1]
  def change
    add_column :polls, :option1, :text, null: false
    add_column :polls, :option2, :text, null: false
    add_column :polls, :option3, :text, null: false
    add_column :polls, :option4, :text, null: false
  end
end
