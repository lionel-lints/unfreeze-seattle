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


#Lionel and Rachel to build out Wiki show
#then start working on the show map


# def perform(hood_id)
#      hood = Neighborhood.find(hood_id)
#      response = Typhoeus.get(hood.wiki_url)
#      wiki = Wiki.create(data: response.body)
#      hood.wikis << wiki
#      hood.save
#      puts "wiki: #{wiki.id}"
#    end

# supplies = []

# holiday_supplies.each do |key, value|
#   value.each do |key2, value2|
#     supplies << value2
#   end
# end

# puts supplies.flatten.uniq