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
    @parks = []
    @museums = []
    @landmarks = []
    @neighborhood.parks.each { |park| @parks << create_hash(park) }
    @neighborhood.museums.each { |museum| @museums << create_hash(museum) }
    @neighborhood.landmarks.each { |landmark| @landmarks << create_hash(landmark) }
  end

  private
  def create_hash(feature)
    feature_data = JSON.parse(feature.data)
    feature_hash = {}
    feature_hash[:name] = feature_data['common_name']
    feature_hash[:lat] = feature_data['latitude']
    feature_hash[:long] = feature_data['longitude']
    feature_hash[:website] = feature_data['website']
    feature_hash[:address] = feature_data['address']
    feature_hash
  end

end
