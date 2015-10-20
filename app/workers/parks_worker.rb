#NW Quadrant

#within_box(location, 47.74448918324826, -122.43232727050781, 47.601579435823446, -122.3127007484436) AND city_feature='parks'

#NE Quadrant

#within_box(location, 47.7352538334833, -122.33345031738281, 47.6423475920095, -122.24281311035156) AND city_feature='parks'

#SW Qudatrant

#within_box(location, 47.608752618414165, -122.42374420166016, 47.49521196622769, -122.32349395751953 ) AND city_feature='parks'

#SE Quadrant

#within_box(location, 47.652524500386484, -122.33551025390625, 47.504301372234416, -122.24349975585938) AND city_feature='parks'

#DT Quadrant

#within_box(location, 47.62150693350129, -122.35756874084473, 47.590025949215594, -122.32048988342285) AND city_feature='parks'

=begin

class ParksWorker
  include Sidekiq::Worker
  # sidekiq_options queue: 'high'
  # sidekiq_options retry: false

  def perform
    parks = Parks.all
    parks.each do |park|

    uri = URI.parse('http://pygments.simplabs.com/')
    response = Net::HTTP.post_form(uri, { 'lang' => snippet.language, 'code' => snippet.plain_code })
    snippet.update_attribute(:highlighted_code, response.body)
  end

end


class LinksWorker
  include Sidekiq::Worker
  # sidekiq_options queue: 'high'
  # sidekiq_options retry: false

  def perform(link_id, site_id)
    link = Link.find(link_id)
    site = Site.find(site_id)
    req = Typhoeus.head(link.url)
    link.res_code = req.response_code
    link.save
    site.links << link
  end
end
=end
