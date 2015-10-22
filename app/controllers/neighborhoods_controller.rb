class NeighborhoodsController < ApplicationController

  def index
    @neighborhoods = Neighborhood.all
  end

  def show
   @neighborhood = Neighborhood.find_by(name: params[:neighborhood])
   data = @neighborhood.wikis[0].data
    if data != ""
      data = JSON.parse(data)
      data['query']['pages'].each do|key, value|
      @wiki = value['extract']
      end
    else
      @wiki = "Olympic Manor is a gated community in Seattle."
    end
  end

end
