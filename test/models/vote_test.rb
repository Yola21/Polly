require "test_helper"

class VoteTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: 'Chris',
                    email: 'chris@example.com',
                    password: 'welcome1',
                    password_confirmation: 'welcome1')
    @poll = Poll.new(title: 'This poll is for testing purpose', option1: "demo1", option2: "demo2", option3: "demo3", option4: "demo4", user: @user)
    
    Vote.delete_all

    @vote = Vote.new(user: @user, poll: @poll)
  end

  def test_valid_vote_should_be_saved
    assert_difference 'Vote.count' do
      @vote.save
    end
  end

  def test_vote_should_not_be_valid_without_poll
    @vote.poll = nil
    assert @vote.invalid?
  end

  def test_vote_should_not_be_valid_without_user
    @vote.user = nil
    assert @vote.invalid?
  end
end