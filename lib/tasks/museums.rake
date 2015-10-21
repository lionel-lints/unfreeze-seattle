desc "Get museums update"
namespace :db do
  namespace :seed do
    task :museums => :environment do
      MuseumsWorker.new.perform()
    end
  end
end