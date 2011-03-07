LBN::Application.routes.draw do
  root :to => 'unmaldia/pages#index'

  match 'unmaldia' => 'unmaldia/pages#unmaldia', :as => :unmaldia
end
