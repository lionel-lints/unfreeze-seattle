class WikisWorker
  include Sidekiq::Worker
    def perform(hood_id)
      hood = Neighborhood.find(hood_id)
      response = Typhoeus.get(hood.wiki_url)
      wiki = Wiki.create(data: response.body)
      hood.wikis << wiki
      hood.save
    end
end
