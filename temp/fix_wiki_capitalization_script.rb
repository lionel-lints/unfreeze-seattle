"https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=alki_point,_Seattle&format=json&exintro=1"

fixed_wikis = []

wiki.each do |link|
  unless link == nil
    link_array = link.split('')
    equals_counter = 0
    underscore_counter = 0
    comma_counter = 0
    fixed_link = []
    link_array.each do |char|
      if equals_counter == 3
        char.upcase!
        fixed_link << char
        equals_counter = nil
      elsif underscore_counter == 1 && comma_counter == 0
        char.upcase!
        fixed_link << char
        underscore_counter = nil
      elsif char == '=' && equals_counter != nil
        equals_counter += 1
        fixed_link << char
      elsif char == '_' && underscore_counter != nil
        underscore_counter += 1
        fixed_link << char
      elsif char == ',' && comma_counter != nil
        comma_counter += 1
        fixed_link << char
      else
        fixed_link << char
      end
    end
    joined_link = fixed_link.join
    fixed_wikis << joined_link
  end
end

