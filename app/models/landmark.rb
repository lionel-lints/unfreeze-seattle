class Landmark < ActiveRecord::Base

  attr_accessor: :url

  def initialize
    @url = "AND city_feature='landmarks'"
  end

end