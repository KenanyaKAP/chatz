module Api
  module V1
    class UsersController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        users = User.all
        render json: UserSerializer.new(users).serialized_json
      end

      def create
        user = User.new(user_params)
        if user.save
          render json: UserSerializer.new(user).serialized_json, status: :created
        else
          render json: { error: user.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        user = User.find_by(username: params[:username])
        if user.destroy
          head :no_content, status: :ok
        else
          render json: { error: user.errors.messages }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:username, :fullname)
      end
    end
  end
end
