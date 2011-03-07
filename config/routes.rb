LBN::Application.routes.draw do
  root :to => 'unmaldia/pages#index'

  match 'un-mal-dia-lo-tiene-cualquiera' => 'unmaldia/pages#unmaldia', :as => :unmaldia
  match 'canciones' => 'unmaldia/pages#canciones', :as => :canciones
  match 'videos' => 'unmaldia/pages#videos', :as => :videos
  match 'aventuras-domesticas' => 'unmaldia/pages#aventuras', :as => :aventuras
end
