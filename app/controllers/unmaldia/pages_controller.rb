class Unmaldia::PagesController < ApplicationController
  layout 'pages'

  before_filter :cache_page

  def index
  end

  def canciones
  end

  def unmaldia
  end

  def videos
  end

  def aventuras

  end


  private
  def cache_page
    response.headers['Cache-Control'] = 'public, max-age=300000' if Rails.env.production?
  end
end
