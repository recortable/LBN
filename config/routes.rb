LBN::Application.routes.draw do

  root :to => 'un_mal_dia#portada'

  match 'un-mal-dia-lo-tiene-cualquiera' => 'un_mal_dia#unmaldia', :as => :unmaldia
  match 'canciones-un-mal-dia' => 'un_mal_dia#canciones', :as => :canciones
  match 'el-fin-esta-cerca' => 'un_mal_dia#reloj', :as => :reloj
  match 'videos' => 'un_mal_dia#videos', :as => :videos
  match 'sabe-mi-nombre' => 'un_mal_dia#lanada', :as => :lanada

  match 'aventuras-domesticas' => 'aventuras#cortinas', :as => :aventuras
  match 'aventura-domestica' => 'aventuras#portada', :as => :aventuras_portada
  match 'canciones-aventuras-domesticas' => 'aventuras#canciones', :as => :canciones_aventuras

  AventurasController::CANCIONES.each do |cancion|
    match cancion => 'aventuras#cancion', :defaults => {:title => cancion}
  end


  match 'admin' => 'admin/comments#index', :as => 'admin'
  resources :comments
  namespace :admin do
    resources :comments
  end


end