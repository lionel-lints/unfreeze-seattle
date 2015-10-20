Models

Neighborhood
1. name - string
2. area - string of coords (parsed?)
3. centerpoint - lat, long, string
4. park location - has_many
5. museum - has_many
6. landmarks - has_many
7. wiki data - link - string

  table columns
    t.timestamps
    t.string :name
    t.string :polygon (url to relative path?)
    t.string :quadrant

  new:
  table columns
    t.timestamps
    t.string :name
    t.string :polygon_url (url to relative path?)
    t.string :seattle_url
    t.string :wiki_url

  in Models
    has_many :parks, :museums, :landmarks

Park
1. belongs_to - neigh ID
2. string coords
3. links (from api)
4. name

  table columns
  t.timestamps
    t.string :data
    t.references :neighborhood


Museum
1. belongs_to - neigh Id
2. point — lat/long object?
3. link to
4. name

  table columns
    t.timestamps
    t.string :data
    t.references :neighborhood

Landmarks
1. belongs_to - neigh Id
2. point — lat/long object?
3. link
4. name