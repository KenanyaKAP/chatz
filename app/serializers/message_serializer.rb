class MessageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :sender_id, :recipient_id
end
