class CreateClassroomSchedules < ActiveRecord::Migration[5.1]
  def change
    create_table :classroom_schedules do |t|
      t.integer :classroom_id
      t.integer :weekday
      t.datetime :from
      t.datetime :to

      t.timestamps
    end
  end
end
