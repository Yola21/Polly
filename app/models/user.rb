class User < ApplicationRecord
  validates :name, presence: true, length: { maximum: 50 }
  has_many :polls, dependent: :destroy
end