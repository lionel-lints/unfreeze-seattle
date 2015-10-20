neighborhoods =
 ['admiral', 'alki', 'NW', 'arbor_heights', 'atlantic', 'ballard', 'beacon_hill', 'belltown',
  'bitter_lake', 'blue_ridge', 'brighton', 'broadmoor', 'broadview', 'bryant',
  'capitol_hill', 'cedar_park', 'central_district', 'columbia_city', 'crown_hill',
  'denny', 'downtown', 'eastlake', 'fauntleroy', 'first_hill', 'fremont', 'georgetown',
  'green_lake', 'greenwood', 'haller_lake', 'hawthorne_hills', 'high_point',
  'highland_park', 'industrial_district', 'interbay', 'international_district',
  'laurelhurst', 'leschi', 'lower_queen_anne', 'loyal_heights', 'madison_park',
  'madison_valley', 'madrona', 'magnolia', 'maple_leaf', 'matthews_beach', 'meadowbrook',
  'montlake', 'mount_baker', 'north_beach', 'north_college_park', 'north_delridge',
  'northgate', 'olympic_hills', 'olympic_manor', 'phinney_ridge', 'pinehurst',
  'pioneer_square', 'portage_bay', 'queen_anne', 'rainier_beach', 'ravenna', 'riverview',
  'roosevelt', 'roxhill', 'sand_point', 'seward_park', 'south_delridge',
  'south_lake_union', 'south_park', 'sunset_hill', 'university_district',
  'victory_heights', 'view_ridge', 'wallingford', 'wedgwood', 'west_seattle', 'westlake',
  'whittier_heights', 'windermere']


neighborhoods = [

['admiral','sw'],
['alki','sw'],
['arbor_heights','sw'],
['atlantic','sw'],
['ballard','nw'],
['beacon_hill','se'],
['belltown', 'nw'],
['bitter_lake', 'nw'],
['blue_ridge', 'nw'],
['brighton','se'],
['broadmoor', 'se'],
['broadview', 'nw'],
['bryant', 'ne'],
['capitol_hill', 'se'],
['cedar_park', 'ne'],
['central_district', 'se'],
['columbia_city', 'se'],
['crown_hill', 'nw'],
['denny', 'se'],
['downtown', 'dt'],
['eastlake', 'se'],
['fauntleroy', 'sw'],
['first_hill', 'se'],
['fremont', 'nw'],
['georgetown', 'se'],
['green_lake', 'nw'],
['greenwood', 'nw'],
['haller_lake', 'nw'],
['hawthorne_hills', 'ne'],
['high_point', 'sw'],
['highland_park', 'se'],
['industrial_district', 'se'],
['interbay', 'nw'],
['international_district', 'se'],
['laurelhurst', 'ne'],
['leschi', 'sw'],
['lower_queen_anne', 'nw'],
['loyal_heights', 'nw'],
['madison_park', 'se'],
['madison_valley', 'se'],
['madrona', 'se'],
['magnolia', 'nw'],
['maple_leaf', 'ne'],
['matthews_beach', 'ne'],
['meadowbrook', 'ne'],
['montlake', 'se'],
['mount_baker','se'],
['north_beach','nw'],
['north_college_park', 'nw'],
['north_delridge', 'sw'],
['northgate', 'ne'],
['olympic_hills', 'ne'],
['olympic_manor', 'nw'],
['phinney_ridge', 'nw'],
['pinehurst', 'ne'],
['pioneer_square', 'se'],
['portage_bay', 'ne'],
['queen_anne', 'nw'],
['rainier_beach', 'se'],
['ravenna', 'ne'],
['riverview', 'sw'],
['roosevelt','ne'],
['roxhill', 'sw'],
['sand_point', 'ne'],
['seward_park', 'se'],
['south_delridge', 'sw'],
['south_lake_union', 'nw'],
['south_park', 'se'],
['sunset_hill', 'nw'],
['university_district', 'ne'],
['victory_heights', 'ne'],
['view_ridge', 'nw'],
['wallingford', 'nw'],
['wedgwood', 'ne'],
['west_seattle', 'sw'],
['westlake', 'nw'],
['whittier_heights','nw'],
['windermere', 'ne']

]



neighborhoods.each do |n|
  hood = Neighborhood.create(name: n[0], wiki_url: n[2])
  hood.polygon_url = '/public/geojson/' + n[0] + '.geojson'

  if n[1] == 'nw'
    square_url = "within_box(location, 47.74448918324826, -122.43232727050781, 47.601579435823446, -122.3127007484436) "
  elsif n[1] == 'ne'
    square_url = "within_box(location, 47.7352538334833, -122.33345031738281, 47.6423475920095, -122.24281311035156) "
  elsif n[1] == 'sw'
    square_url = "within_box(location, 47.608752618414165, -122.42374420166016, 47.49521196622769, -122.32349395751953) "
  elsif n[1] == 'se'
    square_url = "within_box(location, 47.652524500386484, -122.33551025390625, 47.504301372234416, -122.24349975585938) "
  elsif n[1] == 'dt'
    square_url = "within_box(location, 47.62150693350129, -122.35756874084473, 47.590025949215594, -122.32048988342285) "
  end

  hood.seattle_url = 'https://data.seattle.gov/resource/82su-5fxf?$where=' + square_url

  hood.save