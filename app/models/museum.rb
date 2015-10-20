class Museum < ActiveRecord::Base

  attr_accessor: :url

  def initialize
    @url = "AND city_feature='museums and galleries'"
  end

end