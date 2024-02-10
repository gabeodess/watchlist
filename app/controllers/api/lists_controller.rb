class Api::ListsController < ApiController
  def show
    render json: current_user.list
  end
end
