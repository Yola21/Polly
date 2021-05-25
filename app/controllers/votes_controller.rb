class VotesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: %i[create]

  def create
    @vote = Vote.new(vote_params.merge(user_id: @current_user.id))
    if @vote.save
      render status: :ok, json: { notice: t('successfully_created', entity: 'Vote') }
    else
      render status: :unprocessable_entity, json: {
        errors: @vote.errors.full_messages.to_sentence
      }
    end
  end

  private

  def vote_params
    params.require(:vote).permit(:poll_id, :option)
  end
end