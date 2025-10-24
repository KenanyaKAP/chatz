class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :fullname

  # has_many :sent_messages
  # has_many :received_messages
end
