class ChangeColumnOfTweets < ActiveRecord::Migration
  def change
    change_column :tweets, :text, :string, null: false
    change_column :tweets, :image, :string, null: false
  end
end
