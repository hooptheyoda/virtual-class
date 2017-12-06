class WelcomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
  end

  def check_conflicts
    conflicts = []

    User.all.each do |user|
      cf = []
      if user.schoolrole == 'Teacher'
        crs = Classroom.where("teacher_id=#{user.id}");
        cf = check_classroom(crs)
      elsif user.schoolrole == 'Student'
        cf = check_classroom(user.classrooms)
      end
      if(!cf.empty?)
        conflicts.push [user,cf]
        break
      end
    end

    if conflicts.empty?
      conflicts = 'No conflicts.'
    else
      str=''
      conflicts.each do |uc|
        str += "#{uc[0].full_name}, #{uc[0].schoolrole},"
        uc[1].each do |rc|
          rc[2].each do |sc|
            str += "#{rc[0].subject}: #{format_from_to(sc[0])} conflicts to #{rc[1].subject}: #{format_from_to(sc[1])}"
          end
        end
      end
      conflicts = str
    end

    redirect_to root_path, alert: conflicts
  end

  private
  def check_schedule(cr1,cr2)
    cf = []
    cr1.classroom_schedules.each do |s1|
      cr2.classroom_schedules.each do |s2|
        if(time_conflict?(s1,s2))
          cf.push [s1,s2]
          return cf
        end
      end
    end
    cf
  end

  def check_classroom(crs)
    cf = []
    crs.each do |cr1|
      crs.each do |cr2|
        if(cr1.id != cr2.id)
          scf = check_schedule(cr1,cr2)
          if(!scf.empty?)
            cf.push [cr1,cr2,scf]
            return cf
          end
        end
      end
    end
    cf
  end

end
