class MuseumsWorker
  include Sidekiq::Worker

  def perform(hood_id)
    hood = Neighborhood.find(hood_id)
    add_on = URI.encode('&city_feature=Museums and Galleries')
    base_uri = URI.encode(hood.seattle_url)
    response = Typhoeus::Request.get(
      base_uri + add_on,
      headers: { 'X-App-Token' => ENV['SOCRATA_TOKEN'] }
    )
    museums_array = JSON.parse(response.body)
    unless museums_array.size == 0
      museums_array.each do |m|
        museum = Museum.create(data: JSON.generate(m))
        hood.museums << museum
        hood.save
        puts "museum: #{museum.id}"
      end
    end
  end
end
