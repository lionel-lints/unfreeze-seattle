desc "check wikipedia for updates to neighborhood extract"
  task :wiki_queue => :environment do
    puts "checking for wiki updates"
    WikiWorker.new.perform()
    puts "done."
  end

