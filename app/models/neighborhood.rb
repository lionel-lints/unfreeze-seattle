class Neighborhood < ActiveRecord::Base
  has_many :parks
  has_many :landmarks
  has_many :museums
  has_many :wikis
end
