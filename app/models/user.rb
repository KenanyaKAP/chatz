class User < ApplicationRecord
  validates :username, presence: true
  validates :fullname, presence: true

  has_many :sent_messages, class_name: "Message", foreign_key: "sender_id"
  has_many :received_messages, class_name: "Message", foreign_key: "recipient_id"

  def get_messages_with(other_user)
    Message.where(
      "(sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)",
      id, other_user.id, other_user.id, id
    ).order(:created_at)
  end
end
