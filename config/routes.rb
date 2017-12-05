Rails.application.routes.draw do
  resources :classrooms, only: [:new, :edit, :create, :update, :destroy] do
    resources :classroom_schedules, only: [:new, :edit, :create, :update, :destroy]
  end

  devise_for :users
  get 'welcome/index'
	root to: 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
