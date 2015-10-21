desc "Get wikipedia updates"
namespace :db do
  namespace :seed do
    task :wikis => :environment do
      WikiWorker.new.perform()
    end
  end
end