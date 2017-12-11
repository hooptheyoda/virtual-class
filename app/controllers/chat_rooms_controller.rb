class ChatRoomsController < ApplicationController
before_action :coerce_json, :authenticate_user!

  def index
    @chat_rooms = ChatRoom.all
  end

  def new
    @chat_room = ChatRoom.new
  end

  def create
    @chat_room = current_user.chat_rooms.build(chat_room_params)
    if @chat_room.save
      flash[:success] = 'Chat room added!'
      redirect_to chat_rooms_path
    else
      render 'new'
    end
  end

  def show
    @chat_room = ChatRoom.includes(:messages).find_by(id: params[:id])
    classroom = Classroom.find(params[:id])
    if(classroom==nil)
      redirect_to root_path
      return
    end

    if(@chat_room == nil)
      if(current_user.schoolrole == 'Student')
        redirect_to root_path, notice: "The class room is not open yet."
        return
      end

      @chat_room = ChatRoom.new
      @chat_room.id = params[:id]
      @chat_room.title = classroom.subject
      @chat_room.user_id = current_user.id
      if(!@chat_room.save)
        redirect_to root_path, notice: "cannot create chat room."
        return
      end
    end
    @message = Message.new
  end

  private

  def coerce_json
      # Rails converts the following header:
      #
      #   Accept: application/json, text/javascript, */*; q=0.01
      #
      # into text/html. Force it back to json.
      if request.headers[ 'HTTP_ACCEPT' ] =~ /^\s*application\/json/
          request.format = 'json'
      end
  end

  def chat_room_params
    params.require(:chat_room).permit(:title)
  end
end
