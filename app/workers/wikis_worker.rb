class WikisWorker
  include Sidekiq::Worker

  def perform
    neighborhoods = Neighborhood.all
    neighborhoods.each do |hood|
      Typhoeus.get(hood.wiki_url, followlocation: true)
      if hood.wiki_blurb !== request.response.body.extract
        hood.update_attribute(wiki_blurb, request.response.body.extract)
      end
    end
  end
end



  def perform(hood_id)
    hood = Neighborhood.find(hood_id)
    response = Typhoeus.get(hood.wiki_url)
    museums_array = JSON.parse(response.body)
    unless museums_array.size == 0
      museums_array.each do |m|
        museum = Museum.create(data: m)
        hood.museums << museum
        hood.save
      end
    end
