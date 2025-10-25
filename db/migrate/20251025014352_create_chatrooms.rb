class CreateChatrooms < ActiveRecord::Migration[8.1]
  def change
    create_table :chatrooms do |t|
      t.references :userone, null: false, foreign_key: { to_table: :users }
      t.references :usertwo, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
