class CreatJoinTableUserClassroom < ActiveRecord::Migration[5.1]
  def change
    create_join_table :users, :classrooms do |t|
      # t.index [:user_id, :classroom_id]
      # t.index [:classroom_id, :user_id]
    end
  end
end
