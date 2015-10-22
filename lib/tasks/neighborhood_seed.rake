desc "Create neighborhoods"
namespace :db do
  namespace :seed do
    task :neighborhoods => :environment do

      neighborhoods = [
        ["admiral", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=North_Admiral,_Seattle&format=json&exintro=1", "Admiral"],
        ["alki", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Alki_Point,_Seattle&format=json&exintro=1", "Alki"],
        ["arbor_heights", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Arbor_Heights,_Seattle&format=json&exintro=1", "Arbor Heights"],
        ["atlantic", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Atlantic,_Seattle&format=json&exintro=1", "Atlantic"],
        ["ballard", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Ballard,_Seattle&format=json&exintro=1", "Ballard"],
        ["beacon_hill", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Beacon_Hill,_Seattle&format=json&exintro=1", "Beacon Hill"],
        ["belltown", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Belltown,_Seattle&format=json&exintro=1", "Belltown"],
        ["bitter_lake", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Bitter_Lake,_Seattle&format=json&exintro=1", "Bitter Lake"],
        ["blue_ridge", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Blue_Ridge,_Seattle&format=json&exintro=1", "Blue Ridge"],
        ["brighton", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Brighton,_Seattle&format=json&exintro=1", "Brighton"],
        ["broadmoor", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Broadmoor,_Seattle&format=json&exintro=1", "Broadmoor"],
        ["broadview", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Broadview,_Seattle&format=json&exintro=1", "Broadview"],
        ["bryant", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Bryant,_Seattle&format=json&exintro=1", "Bryant"],
        ["capitol_hill", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Capitol_Hill,_Seattle&format=json&exintro=1", "Capitol Hill"],
        ["cedar_park", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Cedar_Park,_Seattle&format=json&exintro=1", "Cedar Park"],
        ["central_district", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Central_District,_Seattle&format=json&exintro=1", "Central District"],
        ["columbia_city", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Columbia_City,_Seattle&format=json&exintro=1", "Columbia City"],
        ["crown_hill", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Crown_Hill,_Seattle&format=json&exintro=1", "Crown Hill"],
        ["denny", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Denny_Regrade,_Seattle&format=json&exintro=1", "Denny Blaine"],
        ["downtown", "dt", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Downtown_Seattle&format=json&exintro=1", "Downtown"],
        ["eastlake", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Eastlake,_Seattle&format=json&exintro=1", "Eastlake"],
        ["fauntleroy", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Fauntleroy,_Seattle&format=json&exintro=1", "Fauntleroy"],
        ["first_hill", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=First_Hill,_Seattle&format=json&exintro=1", "First Hill"],
        ["fremont", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Fremont,_Seattle&format=json&exintro=1", "Fremont"],
        ["georgetown", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Georgetown,_Seattle&format=json&exintro=1", "Georgetown"],
        ["green_lake", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Green_Lake,_Seattle&format=json&exintro=1", "Green Lake"],
        ["greenwood", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Greenwood,_Seattle&format=json&exintro=1", "Greenwood"],
        ["haller_lake", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Haller_Lake,_Seattle&format=json&exintro=1", "Haller Lake"],
        ["hawthorne_hills", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Hawthorne_Hills,_Seattle&format=json&exintro=1", "Hawthorne Hills"],
        ["high_point", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=High_Point,_Seattle&format=json&exintro=1", "High Point"],
        ["highland_park", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Highland_Park,_Seattle&format=json&exintro=1", "Highland Park"],
        ["industrial_district", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Industrial_District,_Seattle&format=json&exintro=1", "Industrial District"],
        ["interbay", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Interbay,_Seattle&format=json&exintro=1", "Interbay"],
        ["international_district", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=International_District,_Seattle&format=json&exintro=1", "International District"],
        ["laurelhurst", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Laurelhurst,_Seattle&format=json&exintro=1", "Laurelhurst"],
        ["leschi", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Leschi,_Seattle&format=json&exintro=1", "Leschi"],
        ["lower_queen_anne", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Lower_Queen_anne,_Seattle&format=json&exintro=1", "Lower Queen Anne"],
        ["loyal_heights", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Loyal_Heights,_Seattle&format=json&exintro=1", "Loyal Heights"],
        ["madison_park", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Madison_Park,_Seattle&format=json&exintro=1", "Madison Park"],
        ["madison_valley", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Madison_Valley,_Seattle&format=json&exintro=1", "Madison Valley"],
        ["madrona", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Madrona,_Seattle&format=json&exintro=1", "Madrona"],
        ["magnolia", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Magnolia,_Seattle&format=json&exintro=1", "Magnolia"],
        ["maple_leaf", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Maple_Leaf,_Seattle&format=json&exintro=1", "Maple Leaf"],
        ["matthews_beach", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Matthews_Beach,_Seattle&format=json&exintro=1", "Matthews Beach"],
        ["meadowbrook", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Meadowbrook,_Seattle&format=json&exintro=1", "Meadowbrook"],
        ["montlake", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Montlake,_Seattle&format=json&exintro=1", "Montlake"],
        ["mount_baker", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Mount_Baker,_Seattle&format=json&exintro=1", "Mount Baker"],
        ["north_beach", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=North_Beach,_Seattle&format=json&exintro=1", "North Beach"],
        ["north_college_park", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Licton_Springs,_Seattle&format=json&exintro=1", "North College Park"],
        ["north_delridge", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=North_Delridge,_Seattle&format=json&exintro=1", "North Delridge"],
        ["northgate", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Northgate,_Seattle&format=json&exintro=1", "Northgate"],
        ["olympic_hills", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Olympic_Hills,_Seattle&format=json&exintro=1", "Olympic Hills"],
        ["olympic_manor", "nw", nil, "Olympic Manor"],
        ["phinney_ridge", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Phinney_Ridge,_Seattle&format=json&exintro=1", "Phinney Ridge"],
        ["pinehurst", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Pinehurst,_Seattle&format=json&exintro=1", "Pinehurst"],
        ["pioneer_square", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Pioneer_Square,_Seattle&format=json&exintro=1", "Pioneer Square"],
        ["portage_bay", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Portage_Bay,_Seattle&format=json&exintro=1", "Portage Bay"],
        ["queen_anne", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Queen_Anne,_Seattle&format=json&exintro=1", "Queen Anne"],
        ["rainier_beach", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Rainier_Beach,_Seattle&format=json&exintro=1", "Rainier Beach"],
        ["ravenna", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Ravenna,_Seattle&format=json&exintro=1", "Ravenna"],
        ["riverview", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Riverview,_Seattle&format=json&exintro=1", "Riverview"],
        ["roosevelt", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Roosevelt,_Seattle&format=json&exintro=1", "Roosevelt"],
        ["roxhill", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Roxhill,_Seattle&format=json&exintro=1", "Roxhill"],
        ["sand_point", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Sand_Point,_Seattle&format=json&exintro=1", "Sand Point"],
        ["seward_park", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Seward_Park,_Seattle&format=json&exintro=1", "Seward Park"],
        ["south_delridge", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=South_Delridge,_Seattle&format=json&exintro=1", "South Delridge"],
        ["south_lake_union", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=South_Lake_union,_Seattle&format=json&exintro=1", "South Lake Union"],
        ["south_park", "se", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=South_Park,_Seattle&format=json&exintro=1", "South Park"],
        ["sunset_hill", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Sunset_Hill,_Seattle&format=json&exintro=1", "Sunset Hill"],
        ["university_district", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=University_District,_Seattle&format=json&exintro=1", "University District"],
        ["victory_heights", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Victory_Heights,_Seattle&format=json&exintro=1", "Victory Heights"],
        ["view_ridge", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=View_Ridge,_Seattle&format=json&exintro=1", "View Ridge"],
        ["wallingford", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Wallingford,_Seattle&format=json&exintro=1", "Wallingford"],
        ["wedgwood", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Wedgwood,_Seattle&format=json&exintro=1", "Wedgwood"],
        ["west_seattle", "sw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=West_Seattle,_Seattle&format=json&exintro=1", "West Seattle"],
        ["westlake", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Westlake,_Seattle&format=json&exintro=1", "Westlake"],
        ["whittier_heights", "nw", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Whittier_Heights,_Seattle&format=json&exintro=1", "Whittier Heights"],
        ["windermere", "ne", "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Windermere,_Seattle&format=json&exintro=1", "Windermere"]
      ]

      neighborhoods.each do |n|
        new_hood = Neighborhood.create(name: n[0], wiki_url: n[2], display_name: n[3])
        new_hood.polygon_url = '/public/geojson/' + n[0] + '.geojson'

        new_hood.seattle_url = 'https://data.seattle.gov/resource/3c4b-gdxv.json?$where=' + n[3]

        new_hood.save

      end

    end
  end
end


