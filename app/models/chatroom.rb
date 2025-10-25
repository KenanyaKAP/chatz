class Chatroom < ApplicationRecord
  belongs_to :userone, class_name: "User"
  belongs_to :usertwo, class_name: "User"
end
