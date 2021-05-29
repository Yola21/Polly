class PollsController < ApplicationController
  # after_action :verify_authorized, only: %i[update destroy]
  before_action :authenticate_user_using_x_auth_token, except: [:index]
  before_action :load_poll, only: %i[show update destroy]
  before_action :load_votes, only: %i[show]

  def index
    polls = policy_scope(Poll)
    render status: :ok, json: { polls: polls }
  end

  def show
    authorize @poll
    render status: :ok, json: { poll: @poll, votes: @votes }
  end

  def create
    @poll = Poll.new(poll_params.merge(user_id: @current_user.id))
    authorize @poll
    if @poll.save
      render status: :ok, json: { notice: t('successfully_created', entity: 'Poll') }
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  rescue ActiveRecord::RecordNotUnique => e
    render status: :unprocessable_entity, json: { errors: e.message }
  end
  
  def update
    authorize @poll
    is_not_owner = @poll.user_id != current_user.id

    if poll_params[:authorize_owner] && is_not_owner
      render status: :forbidden, json: { error: t('authorization.denied') }
    end

    if @poll.update(poll_params.except(:authorize_owner))
      render status: :ok, json: { notice: 'Successfully updated poll.' }
    else
      render status: :unprocessable_entity, json: { errors: @poll.errors.full_messages }
    end
  end

  def destroy
    authorize @poll
    if @poll.destroy
      render status: :ok, json: { notice: 'Successfully deleted poll.' }
    else
      render status: :unprocessable_entity, json: { errors:
      @poll.errors.full_messages }
    end
  end

  private
  
  def load_poll
    @poll = Poll.find_by_slug!(params[:slug])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}, status: :not_found
  end

  def poll_params
    params.require(:poll).permit(:title, :user_id, :option1, :option2, :option3, :option4, :authorize_owner)
  end

  def load_votes
    @votes = Vote.where(poll_id: @poll.id); 
    rescue ActiveRecord::RecordNotFound => errors
    render json: {errors: errors}
  end
end
