class NeighborhoodsController < ApplicationController

  def index
    @neighborhoods = Neighborhood.all
  end

  def show
    n = Neighborhood.find_by(name: params[:neighborhood])
    @neighborhood = {name: n.name, display_name: n.display_name, seattle_url: n.seattle_url,
                   polygon_url: n.polygon_url, wiki_url: n.wiki_url}

    data = n.wiki.data
    handle_wiki_exceptions data, @neighborhood

    @parks = []
    @museums = []
    @landmarks = []
    n.parks.each { |park| @parks << create_hash(park) }
    n.museums.each { |museum| @museums << create_hash(museum) }
    n.landmarks.each { |landmark| @landmarks << create_hash(landmark) }
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

  def handle_wiki_exceptions(data, hood)
    if (hood[:name] == 'north_beach' || hood[:name] == 'olympic_manor')
      @wiki = wiki_maker(hood, "Blue Ridge", "Blue_Ridge,_Seattle")
    elsif (hood[:name] == 'whittier_heights' || hood[:name] == 'loyal_heights')
      @wiki = wiki_maker(hood, 'Ballard', 'Ballard,_Seattle')
    else
      data = JSON.parse(data)
      data['query']['pages'].each do|key, value|
        @wiki = value['extract']
      end
    end
  end

  def wiki_maker(hood, parent_hood, wiki_parent_pc)
    return "<p><b>#{hood[:display_name]}</b> is a sub-neighborhood of <b>
    <a href='https://en.wikipedia.org/wiki/#{wiki_parent_pc}'
    target='_blank'>#{parent_hood}</a></b>. It doesn't have a Wikipedia page yet.</p><br/>
    <p>Is this your neighborhood?
    <a href='https://en.wikipedia.org/wiki/Wikipedia:How_to_create_a_page' target='_blank'>
    Create a page for it!</a></p>"
  end

end
