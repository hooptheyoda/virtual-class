Rails.application.routes.draw do
  get 'classroom_schedules/new'

  get 'classroom_schedules/edit'

  get 'classrooms/new'

  get 'classrooms/edit'

  devise_for :users
  get 'welcome/index'
	root to: 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
