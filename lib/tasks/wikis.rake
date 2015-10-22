desc "Get wikipedia updates"
namespace :db do
  namespace :seed do
    task :wikis => :environment do
      neighborhoods = Neighborhood.all
      neighborhoods.each do |hood|
        WikiWorker.new.perform(hood.id)
      end
    end
  end
end