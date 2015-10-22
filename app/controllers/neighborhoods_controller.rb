class NeighborhoodsController < ApplicationController

  def index
    @neighborhoods = Neighborhood.all
  end

  def show
    @neighborhood = Neighborhood.find_by(name: params[:neighborhood])
    response = Typhoeus.get(@neighborhood.wiki_url)
    data = JSON.parse(response.body)
    data['query']['pages'].each do|key, value|
      @wiki = value['extract']
    end
  end

end
