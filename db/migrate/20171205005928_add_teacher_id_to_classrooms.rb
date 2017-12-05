class AddTeacherIdToClassrooms < ActiveRecord::Migration[5.1]
  def change
    add_column :classrooms, :teacher_id, :integer
  end
end
