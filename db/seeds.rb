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

messages = Message.create([
  { sender: users[0], recipient: users[1], content: "Hey Alice!" },
  { sender: users[1], recipient: users[0], content: "Yo, hi Boteng!" },
  { sender: users[0], recipient: users[2], content: "Hey Bob!" },
  { sender: users[2], recipient: users[1], content: "Hi Alice!" }
])
