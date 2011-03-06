class Unmaldia::PagesController < ApplicationController
  layout 'unmaldia'

  def index
     response.headers['Cache-Control'] = 'public, max-age=300000'
  end
end
