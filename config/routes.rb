Rails.application.routes.draw do
  devise_for :users
  resources :classrooms, only: [:show, :new, :edit, :create, :update, :destroy]
  resources :classroom_schedules, only: [:create, :destroy]
  resources :chat_rooms, only: [:new, :create, :show, :index]
  mount ActionCable.server => '/cable'

  get 'welcome/index'
	root to: 'welcome#index'
  post '/check_conflicts', to: 'welcome#check_conflicts'
  get 'classrooms/:id/play', to: 'classrooms#play'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
