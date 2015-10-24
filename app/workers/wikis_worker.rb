class WikisWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

    def perform(hood_id)
      hood = Neighborhood.find(hood_id)
      response = Typhoeus.get(hood.wiki_url)
      wiki = Wiki.create(data: response.body)
      hood.wiki = wiki
      hood.save
      puts "wiki: #{wiki.id}"
    end
end
