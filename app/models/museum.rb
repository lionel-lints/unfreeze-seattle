class Museum < ActiveRecord::Base
  belongs_to :neighborhood
   attr_accessor: :url

   def initialize
     @url = "AND city_feature='museums and galleries'"
   end
end




