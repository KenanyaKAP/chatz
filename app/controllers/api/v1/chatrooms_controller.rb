module Api
  module V1
    class ChatroomsController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        id = params[:id]

        if id.present?
          get_chatroom_by_id(id)
        else
          user1_id = params[:userone_id]
          user2_id = params[:usertwo_id]
          get_chatroom_by_users(user1_id, user2_id)
        end
      end

      private

      def find_or_create_chatroom(user1_id, user2_id)
        # Find chatroom
        chatroom = Chatroom.where(
          "(userone_id = ? AND usertwo_id = ?) OR (userone_id = ? AND usertwo_id = ?)",
          user1_id, user2_id, user2_id, user1_id
        ).first

        # Create if none
        chatroom ||= Chatroom.create(userone_id: [ user1_id, user2_id ].min, usertwo_id: [ user1_id, user2_id ].max)

        if chatroom.save
          chatroom
        end
      end

      # Get chatroom by ID
      def get_chatroom_by_id(id)
        chatroom = Chatroom.find_by(id: id)

        unless chatroom
          render json: { error: "Chatroom not found" }, status: :not_found
          return
        end

        render json: ChatroomSerializer.new(chatroom, include: [ :messages ]).serialized_json, status: :ok
      end

      # Get or create chatroom by user IDs
      def get_chatroom_by_users(user1_id, user2_id)
        if user1_id.blank? || user2_id.blank?
          render json: { error: "userone_id and usertwo_id are required" }, status: :unprocessable_entity
          return
        end

        if user1_id == user2_id
          render json: { error: "userone_id and usertwo_id cannot be the same" }, status: :unprocessable_entity
          return
        end

        chatroom = find_or_create_chatroom(user1_id, user2_id)

        unless chatroom
          render json: { error: "Unable to find chatroom" }, status: :unprocessable_entity
        end

        render json: ChatroomSerializer.new(chatroom, include: [ :messages ]).serialized_json, status: :ok
      end
    end
  end
end
