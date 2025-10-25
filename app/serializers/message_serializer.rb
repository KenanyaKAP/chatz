class MessageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :user_id, :chatroom_id

  attribute :time do |object|
    object.time
  end
end
