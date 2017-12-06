$weekdayname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  helper_method :format_hour_minute, :format_from_to
  def format_hour_minute(tm)
    "#{tm.hour}:#{tm.min}"
  end

  def format_from_to(s)
    "#{format_hour_minute(s.from)} to #{format_hour_minute(s.to)}"
  end


  protected

    def err_msg (obj)
      "<p>#{obj.errors.full_messages.join('</p><p>')}</p>"
    end

    def mt(t)
      t.hour*60+t.min
    end

    def time_conflict?(r1,r2)
      if (r1.weekday != r2.weekday)
        return false
      end

      sf = mt(r1.from)
      st = mt(r1.to)
      df = mt(r2.from)
      dt = mt(r2.to)
      (sf<df && st>df) || (sf<dt && st>dt) || (df<sf && dt>sf) || (df<st && dt>st) || (sf==df && st==dt)
    end

    def configure_permitted_parameters
ewchatroomrh
      devise_parameter_sanitizer.permit(:sign_in) { |u| u.permit(:email, :password, :schoolrole) }
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:email, :password, :schoolrole) }
      devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:email, :password, :current_password, :schoolrole) }
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:email, :password, :schoolrole, :full_name) }
      devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:email, :password, :current_password, :schoolrole, :full_name) }

    end
end
