class PollPolicy
  attr_reader :user, :poll

  def initialize(user, poll)
    @user = user
    @poll = poll
  end

  def show?
    true
  end
  
  def update?
    poll.user_id == user.id
  end
  
  def create?
    true
  end
  
  def destroy?
    update?
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.all
    end
  end
end