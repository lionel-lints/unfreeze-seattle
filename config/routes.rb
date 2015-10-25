Rails.application.routes.draw do

  root 'neighborhoods#index'
  get '/about', to: 'static_pages#about'
  get '/contact', to: 'static_pages#contact'
  get '/:neighborhood', to: "neighborhoods#show", as: 'neighborhood'

end
