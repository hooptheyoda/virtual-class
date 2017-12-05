class Classroom < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :classroom_schedules
end
