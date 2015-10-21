class MuseumsWorker
  include Sidekiq::Worker

  def perform
    neighborhoods = Neighborhood.all
    neighborhoods.each do |hood|
      Typhoeus.get(hood.museum, followlocation: true)
      if hood.museum !== request.response.body.museum
        hood.update_attribute(museum, request.response.body.museum)
      end
    end
  end
end
