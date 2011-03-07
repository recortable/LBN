class ApplicationController < ActionController::Base
  protect_from_forgery

  protected
  def cache_page
    response.headers['Cache-Control'] = 'public, max-age=300000' if Rails.env.production?
  end

end
