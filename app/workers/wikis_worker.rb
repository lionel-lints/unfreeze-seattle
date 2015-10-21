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
