class Message < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"

  validates :content, presence: true
  validate :sender_and_recipient_are_different

  private

  def sender_and_recipient_are_different
    if sender_id == recipient_id
      errors.add(:recipient, "cannot be the same as sender")
    end
  end
end
