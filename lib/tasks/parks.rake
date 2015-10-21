desc "Get parks update"
namespace :db do
  namespace :seed do
    task :parks => :environment do
      ParksWorker.new.perform()
    end
  end
end