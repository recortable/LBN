LBN::Application.routes.draw do

  root :to => 'un_mal_dia#portada'

  # UN MAL DÍA
  match 'un-mal-dia-lo-tiene-cualquiera' => 'un_mal_dia#unmaldia', :as => :unmaldia
  match 'canciones-un-mal-dia' => 'un_mal_dia#canciones', :as => :canciones
  match 'el-fin-esta-cerca' => 'un_mal_dia#reloj', :as => :reloj
  match 'videos' => 'un_mal_dia#videos', :as => :videos
  match 'sabe-mi-nombre' => 'un_mal_dia#lanada', :as => :lanada

  # AVENTURAS DOMÉSTICAS
  match 'aventuras-domesticas' => 'aventuras#cortinas', :as => :aventuras
  match 'aventura-domestica' => 'aventuras#portada', :as => :aventuras_portada
  match 'canciones-aventuras-domesticas' => 'aventuras#canciones', :as => :canciones_aventuras
  match 'enlace' => 'un_mal_dia#link', :as => :link

  # GENERAL
  match 'discos' => 'site#downloads', :as => :downloads
  match 'nuevo-disco' => 'site#announcement'

  AventurasController::CANCIONES.each do |cancion|
    match cancion => 'aventuras#cancion', :defaults => {:title => cancion}
  end

  resources :comments

  match 'admin' => 'admin/comments#index', :as => 'admin'
  match 'comment_emails' => 'admin/comments#emails', :as => 'admin_comment_emails'
  namespace :admin do
    resources :comments
    resources :emails
  end


end
