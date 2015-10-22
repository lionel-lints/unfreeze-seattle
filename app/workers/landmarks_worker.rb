class LandmarksWorker
  include Sidekiq::Worker

  def perform(hood_id)
    hood = Neighborhood.find(hood_id)
    add_on = '&city_feature=Landmarks'
    base_uri = URI.encode(hood.seattle_url)
    response = Typhoeus::Request.get(
      base_uri + add_on,
      headers: { 'X-App-Token' => "BaCM5K6CYxW0AGrn56SOgqmL1" }
    )
    #ENV['SOCRATA_TOKEN']
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


=begin
request = Typhoeus::Request.get(
  url + '&city_feature=Parks',
  headers: { 'X-App-Token' => "BaCM5K6CYxW0AGrn56SOgqmL1" }
)


Host: soda.demo.socrata.com
Accept: application/json
X-App-Token: [REDACTED]





'Access-Control-Allow-Origin': *
'Age': 0
'Connection': keep-alive
'Content-Encoding': gzip
'Content-Type': application/json;charset=utf-8
'Server': nginx
'Transfer-Encoding': chunked
'X-Socrata-Region': production
'X-Soda2-Data-Out-Of-Date': false
'X-Soda2-Fields': ["address","city_feature","common_name","featureitem_id","latitude","location","longitude","website"]
'X-Soda2-Types': ["text","text","text","number","number","point","number","text"]
'X-App-Token' => "BaCM5K6CYxW0AGrn56SOgqmL1"


URI.encode(params[:song])


=end




