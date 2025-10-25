class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom

  def time
    created_at&.strftime("%H:%M")
  end
end
