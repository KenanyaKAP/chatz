class ChatroomSerializer
  include FastJsonapi::ObjectSerializer
  attributes :userone_id, :usertwo_id

  has_many :messages, serializer: MessageSerializer
end
