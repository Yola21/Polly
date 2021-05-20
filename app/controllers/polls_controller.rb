class PollsController < ApplicationController
  before_action :load_poll, only: %i[show update destroy]
  
  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def show
    render status: :ok, json: { poll: @poll }
  end

  def create
    @poll = Poll.new(poll_params)
    if @poll.save
      render status: :ok, json: { notice: t('successfully_created') }
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  rescue ActiveRecord::RecordNotUnique => e
    render status: :unprocessable_entity, json: { errors: e.message }
  end
  
  def update
    if @poll.update(poll_params)
      render status: :ok, json: { notice: 'Successfully updated poll.' }
    else
      render status: :unprocessable_entity, json: { errors: @poll.errors.full_messages }
    end
  end

  def destroy
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
      render json: {errors: errors}
  end

  private
  
  def poll_params
    params.require(:poll).permit(:title, :user_id)
  end
end
