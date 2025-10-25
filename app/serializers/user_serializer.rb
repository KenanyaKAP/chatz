class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :fullname
end
