desc "Get museums update"
namespace :db do
  namespace :seed do
    task :museums => :environment do
      neighborhoods = Neighborhood.all
      neighborhoods.each do |hood|
        MuseumsWorker.new.perform_async(hood.id)
      end
    end
  end
end