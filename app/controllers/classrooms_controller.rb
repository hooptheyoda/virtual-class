require 'pry'

class ClassroomsController < ApplicationController
  before_action :authenticate_user!

  def show
    @classroom = Classroom.find(params[:id])
  end

  def new
    @classroom = Classroom.new
  end

  def edit
    @classroom = Classroom.find(params[:id])
  end

  def create
    @classroom = Classroom.new(classroom_params)
    if @classroom.save
      redirect_to root_path
    else
      redirect_to new_classroom_path, notice: err_msg(@classroom)
    end
  end

  def update
    @classroom = Classroom.find(params[:id])
    if(@classroom.update(classroom_params))
      redirect_to root_path
    else
      redirect_to edit_classroom_path, notice: err_msg(@classroom)
    end
  end

  def destroy
    @classroom = Classroom.find(params[:id])
    @classroom.destroy
    redirect_to root_path
  end

  def play
  end
  
  private
  def classroom_params
    params.require(:classroom).permit(:subject, :teacher_id, user_ids:[])
  end

end
