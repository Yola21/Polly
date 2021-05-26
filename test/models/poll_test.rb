require "test_helper"

class PollTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: 'Chris',
                    email: 'chris@example.com',
                    password: 'welcome1',
                    password_confirmation: 'welcome1')
    Poll.delete_all

    @poll = Poll.new(title: 'This poll is for testing purpose', option1: "demo1", option2: "demo2", option3: "demo3", option4: "demo4", user: @user)
  end

  def test_instance_of_poll
    assert_instance_of Poll, @poll
  end

  def test_instance_of_poll
    assert_not_instance_of User, @poll
  end

  def test_value_of_title_assigned
    assert_equal "This poll is for testing purpose", @poll.title
  end

  def test_value_created_at
    assert_nil @poll.created_at
  
    @poll.save!
    assert_not_nil @poll.created_at
  end

  test "error raised" do
    assert_raises ActiveRecord::RecordNotFound do
      Poll.find(SecureRandom.uuid)
    end
  end
  
  def test_count_of_number_of_polls
    assert_difference ['Poll.count'], 2 do
      Poll.create!(title: 'Creating a Poll through test', option1: 'test1', option2: 'test2', option3: 'test3', option4: 'test4', user: @user)
      Poll.create!(title: 'Creating another Poll through test', option1: 'another1', option2: 'another2', option3: 'another3', option4: 'another4',  user: @user)
    end
  end

  def test_poll_should_not_be_valid_without_title
    @poll.title = ''
    assert @poll.invalid?
  end

  def test_poll_should_not_be_valid_without_options
    @poll.option1 = ''
    @poll.option2 = ''
    @poll.option2 = ''
    @poll.option4 = ''
    assert @poll.invalid?
  end

  def test_poll_slug_is_parameterized_title
    title = @poll.title
    @poll.save!
    assert_equal title.parameterize, @poll.slug
  end

  def test_incremental_slug_generation_for_polls_with_same_title
    first_poll = Poll.create!(title: 'test poll', option1: 'test1', option2: 'test2', option3: 'test3', option4: 'test4', user: @user)
    second_poll = Poll.create!(title: 'test poll', option1: 'test1', option2: 'test2', option3: 'test3', option4: 'test4',  user: @user)
  
    assert_equal 'test-poll', first_poll.slug
    assert_equal 'test-poll-2', second_poll.slug
  end

  # def test_error_raised_for_duplicate_slug
  #   test_poll = Poll.create!(title: 'test poll', option1: 'test1', option2: 'test2', option3: 'test3', option4: 'test4', user: @user)
  #   another_test_poll = Poll.create!(title: 'anoter test poll', option1: 'test1', option2: 'test2', option3: 'test3', option4: 'test4', user: @user)
  
  #   test_poll_title = test_poll.title
  #   assert_raises ActiveRecord::RecordInvalid do
  #     another_test_poll.update!(slug: test_poll_title.parameterize)
  #   end
  
  #   assert_match t('poll.slug.immutable'),
  #                 another_test_poll.errors.full_messages.to_sentence
  # end

  def test_updating_title_does_not_update_slug
    @poll.save!
    poll_slug = @poll.slug
  
    updated_poll_title = 'updated poll tile'
    @poll.update!(title: updated_poll_title)
  
    assert_equal updated_poll_title, @poll.title
  
    assert_equal poll_slug, @poll.slug
  end

  def test_slug_to_be_reused_after_getting_deleted
    first_poll = Poll.create!(title: 'test poll', option1: 'test1', option2: 'test2', option3: 'test3', option4: 'test4', user: @user)
    second_poll = Poll.create!(title: 'test poll', option1: 'test1', option2: 'test2', option3: 'test3', option4: 'test4', user: @user)
  
    second_poll_slug = second_poll.slug
    second_poll.destroy
    new_poll_with_same_title = Poll.create!(title: 'test poll', option1: 'test1', option2: 'test2', option3: 'test3', option4: 'test4', user: @user)
  
    assert_equal second_poll_slug, new_poll_with_same_title.slug
  end
end