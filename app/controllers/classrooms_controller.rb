class ClassroomsController < ApplicationController
  before_action :authenticate_user!

  def show
    @classroom = Classroom.find(params[:id])
    if(@classroom==nil)
      redirect_to root_path
      return
    end
  end

  def new
    @classroom = Classroom.new
  end

  def edit
    @classroom = Classroom.find(params[:id])
    if(@classroom==nil)
      redirect_to root_path
      return
    end
  end

  def create
    @classroom = Classroom.new(classroom_params)
    if(@classroom!=nil)
      if @classroom.save
        redirect_to root_path
      else
        redirect_to new_classroom_path, notice: err_msg(@classroom)
      end
    else
      redirect_to root_path
    end
  end

  def update
    @classroom = Classroom.find(params[:id])
    if(@classroom!=nil)
      if(@classroom.update(classroom_params))
        redirect_to root_path
      else
        redirect_to edit_classroom_path, notice: err_msg(@classroom)
      end
    else
      redirect_to root_path
    end
  end

  def destroy
    @classroom = Classroom.find(params[:id])
    if(@classroom!=nil)
      @classroom.destroy
    end
    redirect_to root_path
  end

  def play
  end

  private
  def classroom_params
    params.require(:classroom).permit(:subject, :teacher_id, user_ids:[])
  end

end
