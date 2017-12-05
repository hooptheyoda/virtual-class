require 'pry'

class ClassroomsController < ApplicationController
  before_action :authenticate_user!

  def new
    @classroom = Classroom.new
  end

  def edit
    @classroom = Classroom.find(params[:id])
  end

  def create
    redirect_to root_path
  end

  def update
    redirect_to root_path
  end

  private
  def classroom_params
  end
  
end
