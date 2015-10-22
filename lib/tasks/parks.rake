desc "Get parks update"
namespace :db do
  namespace :seed do
    task :parks => :environment do
      neighborhoods = Neighborhood.all
      neighborhoods.each do |hood|
        ParksWorker.perform_async(hood.id)
      end
    end
  end
end