desc "Get wikipedia updates"
namespace :db do
  namespace :seed do
    task :wikis => :environment do
      neighborhoods = Neighborhood.all
      neighborhoods.each do |hood|
        WikisWorker.perform_async(hood.id)
      end
    end
  end
end