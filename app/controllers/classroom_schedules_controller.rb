require 'pry'
class ClassroomSchedulesController < ApplicationController
  before_action :authenticate_user!

  def create
    binding.pry
    classroom = Classroom.find(params[:classroom_id])
    classroom.classroom_schedules.create(cs_params)
    redirect_to classroom_path
  end

  def destroy
    classroom_schedule = ClassroomSchedule.find(params[:id])
    classroom_schedule.destroy
    redirect_to classroom_path
  end

  private
  def cs_params
    params.require(:classroom_schedule).permit(:weekday, :from, :to)
  end

end
