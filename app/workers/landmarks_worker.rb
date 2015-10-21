class LandmarksWorker
  include Sidekiq::Worker

  def perform
    neighborhoods = Neighborhood.all
    neighborhoods.each do |hood|
      Typhoeus.get(hood.landmarks, followlocation: true)
      if hood.landmarks !== request.response.body.landmarks
        hood.update_attribute(landmarks, request.response.body.landmarks)
      end
    end
  end
end
