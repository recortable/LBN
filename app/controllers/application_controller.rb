class ApplicationController < ActionController::Base
  protect_from_forgery

  protected
  def cache_page
    response.headers['Cache-Control'] = 'public, max-age=300000' if Rails.env.production?
  end
  
  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      username == "lbn" && password == "lbn"
    end
  end

end
