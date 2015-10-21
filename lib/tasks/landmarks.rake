desc "Get landmarks update"
namespace :db do
  namespace :seed do
    task :landmarks => :environment do
      LandmarksWorker.new.perform()
    end
  end
end