class PollsController < ApplicationController
  before_action :load_poll, only: [:show]
  
  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
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

  def show
    render status: :ok, json: { poll: @poll }
  end

  private
  
  def load_poll
    @poll = Poll.find_by_slug!(params[:slug])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end

  def poll_params
    params.require(:poll).permit(:title)
  end
end
