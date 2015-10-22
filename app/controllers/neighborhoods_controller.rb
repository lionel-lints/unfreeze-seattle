class NeighborhoodsController < ApplicationController

  def index
    @neighborhoods = Neighborhood.all
  end

  def show
   @neighborhood = Neighborhood.find_by(name: params[:neighborhood])
   @wiki = Wil
  end

end
