class ParksWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(hood_id)
    hood = Neighborhood.find(hood_id)
    add_on = '&city_feature=Parks'
    base_uri = URI.encode(hood.seattle_url)
    response = Typhoeus::Request.get(
      base_uri + add_on,
      headers: { 'X-App-Token' => ENV['SOCRATA_TOKEN'] }
    )
    parks_array = JSON.parse(response.body)
    unless parks_array.size == 0
      parks_array.each do |p|
        park = Park.create(data: JSON.generate(p))
        hood.parks << park
        hood.save
        puts "park: #{park.id}"
      end
    end
  end

end
