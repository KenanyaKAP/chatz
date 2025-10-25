class Chatroom < ApplicationRecord
  belongs_to :userone, class_name: "User"
  belongs_to :usertwo, class_name: "User"

  has_many :messages, dependent: :destroy
end
