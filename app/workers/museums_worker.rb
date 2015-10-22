class MuseumsWorker
  include Sidekiq::Worker

  def perform(hood_id)
    hood = Neighborhood.find(hood_id)
    add_on = '&city_feature=Museums and Galleries'
    base_uri = URI.encode(hood.seattle_url)
    response = Typhoeus::Request.get(
      url + add_on,
      headers: { 'X-App-Token' => "BaCM5K6CYxW0AGrn56SOgqmL1" }
    )
    #ENV['SOCRATA_TOKEN']
    museums_array = JSON.parse(response.body)
    unless museums_array.size == 0
      museums_array.each do |m|
        museum = Museum.create(data: m)
        hood.museums << museum
        hood.save
      end
    end
  end
end
