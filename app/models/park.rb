class Park < ActiveRecord::Base

  attr_accessor: :url

  def initialize
    @url = "AND city_feature='parks'"
  end

end