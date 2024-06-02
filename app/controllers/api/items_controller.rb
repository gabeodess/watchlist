class Api::ItemsController < ApiController
  def index
    render json: {items: current_user.items.includes(:production).order(id: :desc).as_json(:v1)}
  end

  def create
    current_user.items.create(production: production)
    head :ok
  end

  def destroy
    current_user.items.find(params[:id]).destroy!
    head :ok
  end

  private

  def production
    Production.find_or_create_by!(themoviedb_id: production_params[:themoviedb_id]) do |production|
      production.assign_attributes(production_params)
    end
  end

  def production_params
    @production_params ||= params.require(:production).permit(:themoviedb_id, :released_on, :image_url, :title, :type)
  end
end
