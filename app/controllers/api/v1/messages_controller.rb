module Api
  module V1
    class MessagesController < ApplicationController
      protect_from_forgery with: :null_session

      def create
        message = Message.new(message_params)

        if !message.valid?
          render json: { error: message.errors.messages }, status: :unprocessable_entity
          return
        end

        if message.save
          render json: MessageSerializer.new(message, options).serialized_json, status: :created
        else
          render json: message.errors.messages, status: :unprocessable_entity
        end
      end

      def show
        message = Message.find(params[:id])
        render json: MessageSerializer.new(message, options).serialized_json
      end

      private

      def message_params
        params.require(:message).permit(:sender_id, :recipient_id, :content)
      end

      def options
        @options ||= { include: %i[sender recipient] }
      end
    end
  end
end
