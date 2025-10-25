module Api
  module V1
    class MessagesController < ApplicationController
      # protect_from_forgery with: :null_session

      # ========================= OLD METHOD =========================
      # def create
      #   sender_id = params[:sender_id]
      #   recipient_id = params[:recipient_id]
      #   content = params[:content]

      #   # Validate required parameters
      #   if sender_id.blank? || recipient_id.blank? || content.blank?
      #     render json: { error: "sender_id, recipient_id, and content are required" }, status: :unprocessable_entity
      #     return
      #   end

      #   chatroom = find_or_create_chatroom(sender_id, recipient_id)

      #   unless chatroom
      #     render json: { error: "Unable to create or find chatroom" }, status: :unprocessable_entity
      #     return
      #   end

      #   message = Message.new(
      #     user_id: sender_id,
      #     chatroom_id: chatroom.id,
      #     content: content
      #   )

      #   if message.save
      #     render json: { status: "Message created", message: MessageSerializer.new(message) }, status: :created
      #   else
      #     render json: { error: message.errors.full_messages }, status: :unprocessable_entity
      #   end
      # end

      # private

      # def find_or_create_chatroom(user1_id, user2_id)
      #   chatroom = Chatroom.where(
      #     "(userone_id = ? AND usertwo_id = ?) OR (userone_id = ? AND usertwo_id = ?)",
      #     user1_id, user2_id, user2_id, user1_id
      #   ).first

      #   # Create if none
      #   chatroom ||= Chatroom.create(userone_id: [ user1_id, user2_id ].min, usertwo_id: [ user1_id, user2_id ].max)

      #   chatroom
      # end

      # ========================= NEW METHOD, using chatroom_id =========================
      def create
        message = Message.new(message_params)

        # Is chatroom exist and user is part of the chatroom
        chatroom = Chatroom.find_by(id: message.chatroom_id)
        if !(chatroom && (chatroom.userone_id == message.user_id || chatroom.usertwo_id == message.user_id))
          render json: { error: "Invalid chatroom_id or user_id" }, status: :unprocessable_entity
          return
        end

        if message.save
            # Broadcast the new message to the chatroom channel
            serialized_message = MessageSerializer.new(message).serializable_hash
            ActionCable.server.broadcast(
              "chatroom_#{message.chatroom_id}",
              {
                type: 'new_message',
                message: serialized_message
              }
            )
            
            render json: { status: "Message created", message: serialized_message }, status: :created
        else
            render json: { error: message.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def message_params
        params.permit(:chatroom_id, :user_id, :content)
      end
    end
  end
end
