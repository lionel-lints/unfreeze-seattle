class Landmark < ActiveRecord::Base
  belongs_to :neighborhood
  attr_accessor: :url

  def initialize
    @url = "AND city_feature='landmarks'"
  end
end