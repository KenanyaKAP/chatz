# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

users = User.create([
  { username: "boteng", fullname: "Boteng Z" },
  { username: "alice", fullname: "Alice Wonderland" },
  { username: "bob", fullname: "Bob Builder" }
])

chatrooms = Chatroom.create([
  { userone: users[0], usertwo: users[1] },
  { userone: users[1], usertwo: users[2] },
  { userone: users[0], usertwo: users[2] }
])

messages = Message.create([
  { chatroom: chatrooms[0], user: users[0], content: "Hey Alice!" },
  { chatroom: chatrooms[0], user: users[1], content: "Yo, hi Boteng!" },
  { chatroom: chatrooms[1], user: users[1], content: "Hey Bob!" },
  { chatroom: chatrooms[1], user: users[2], content: "Hi Alice!" },
  { chatroom: chatrooms[2], user: users[2], content: "Hello there Boteng, Im Bob!" }
])
