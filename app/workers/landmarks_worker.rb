class LandmarksWorker
  include Sidekiq::Worker

  def perform
    neighborhoods = Neighborhood.all
    neighborhoods.each do |hood|
      add_on = '&city_feature=Landmarks'
      app_token = '&$$app_token=' + ENV['SOCRATA_TOKEN']
      response = Typhoeus.get(hood.seattle_url + add_on + app_token)
      response_array = response.body
      p response_array
      # or response.response_body
    end
  end
end
