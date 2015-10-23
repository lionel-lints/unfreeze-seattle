class LandmarksWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(hood_id)
    hood = Neighborhood.find(hood_id)
    add_on = '&city_feature=Landmarks'
    base_uri = URI.encode(hood.seattle_url)
    response = Typhoeus::Request.get(
      base_uri + add_on,
      headers: { 'X-App-Token' => ENV['SOCRATA_TOKEN'] }
    )
    landmarks_array = JSON.parse(response.body)
    unless landmarks_array.size == 0
      landmarks_array.each do |l|
        landmark = Landmark.create(data: JSON.generate(l))
        hood.landmarks << landmark
        hood.save
      end
    end
  end
end



