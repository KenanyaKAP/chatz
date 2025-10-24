class MessageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :sender_id, :recipient_id

  belongs_to :sender, serializer: :user
  belongs_to :recipient, serializer: :user
end
