Rails.application.routes.draw do

  root 'neighborhoods#index'

  get '/:neighborhood', to: "neighborhoods#show", as: 'neighborhood'

end

