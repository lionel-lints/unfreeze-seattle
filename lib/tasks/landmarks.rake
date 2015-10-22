desc "Get landmarks update"
namespace :db do
  namespace :seed do
    task :landmarks => :environment do
      neighborhoods = Neighborhood.all
      neighborhoods.each do |hood|
        LandmarksWorker.perform_async(hood.id)
      end
    end
  end
end