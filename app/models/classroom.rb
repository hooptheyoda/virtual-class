class Classroom < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :classroom_schedules, dependent: :destroy
  validates :subject, :teacher_id, presence: true
end
