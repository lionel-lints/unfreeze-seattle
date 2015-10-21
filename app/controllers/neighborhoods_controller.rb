class NeighborhoodsController < ApplicationController

  def index
  end

  def show
   @neighborhood = Neighborhood.find_by(name: params[:neighborhood])
   @wiki = Wil
  end

end
