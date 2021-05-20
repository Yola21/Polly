class Poll < ApplicationRecord
  validates :title, presence: true, length: { maximum: 100 }
  validates :slug, uniqueness: true
  validate :slug_not_changed
  belongs_to :user
  before_create :set_slug

  private

  def set_slug
    itr = 1
    loop do
      title_slug = title.parameterize
      slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
      break self.slug = slug_candidate unless Poll.exists?(slug: slug_candidate)
      itr += 1
    end
  end

  def slug_not_changed
    if slug_changed? && self.persisted?
      errors.add(:slug, t('poll.slug.immutable'))
    end
  end
end