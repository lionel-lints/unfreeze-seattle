class Neighborhood < ActiveRecord::Base
  has_many :parks, :landmarks, :museums
end
