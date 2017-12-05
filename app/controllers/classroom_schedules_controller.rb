require 'pry'
class ClassroomSchedulesController < ApplicationController
  before_action :authenticate_user!

  def create
    classroom = Classroom.find(params[:classroom_id])
    begin
      prm = cs_params
      cs = ClassroomSchedule.new(prm)

      sf=mt(cs.from)
      st=mt(cs.to)
      if sf >= st
        raise "from time must less than to time"
      end

      classroom.classroom_schedules.each do |s|
        if (s.weekday == cs.weekday)
          df=mt(s.from)
          dt=mt(s.to)

          if((sf<df && st>df) || (sf<dt && st>dt) || (df<sf && dt>sf) || (df<st && dt>st) || (sf==df && st==dt))
            raise "There is a time conflict in the schedule"
          end
        end
      end

      classroom.classroom_schedules.create(prm)
      redirect_to classroom_path(classroom)
    rescue  Exception => e
      redirect_to classroom_path(classroom), notice: e.message
    end
  end

  def destroy
    classroom_schedule = ClassroomSchedule.find(params[:id])
    classroom_schedule.destroy
    redirect_to classroom_path(Classroom.find(classroom_schedule.classroom_id))
  end

  private
  def cs_params
    params.require(:classroom_schedule).permit(:weekday, :from, :to)
  end

  def mt(t)
    t.hour*60+t.min
  end
end
