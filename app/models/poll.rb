class Poll < ApplicationRecord
  validates :title, presence: true, length: { maximun: 100 }
end