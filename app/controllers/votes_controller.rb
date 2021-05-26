class VotesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: %i[create]
  before_action :check_vote_existance, only: %i[create]

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

  def check_vote_existance
    vote = Vote.where(
      poll_id: vote_params[:poll_id],
      user_id: @current_user.id
    )
    if vote.length > 0
      render status: :unprocessable_entity, json: {
        errors: 'Vote already existed!'
      }
    end
  end
end