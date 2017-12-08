class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_and_belongs_to_many :classrooms
  validates :full_name, presence: true
  has_many :chat_rooms, dependent: :destroy
  has_many :messages, dependent: :destroy
end
