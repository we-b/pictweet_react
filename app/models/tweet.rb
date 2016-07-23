class Tweet < ActiveRecord::Base
  scope :newer, -> { order(created_at: :desc) }
end
