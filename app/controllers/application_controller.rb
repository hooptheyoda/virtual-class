class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  def err_msg (obj)
    "<p>#{obj.errors.full_messages.join('</p><p>')}</p>"
  end
  
  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:email, :password, :schoolrole, :full_name) }
      devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:email, :password, :current_password, :schoolrole, :full_name) }
    end
end
