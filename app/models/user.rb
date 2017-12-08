class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_and_belongs_to_many :classrooms
  has_many :chat_rooms, dependent: :destroy
  has_many :messages, dependent: :destroy

  def name
    email.split('@')[0]
  end
  validates :full_name, presence: true
end
