class ApplicationController < ActionController::Base
  protect_from_forgery

  protected
  def cache_page
    age = 1 * 60 * 60
    response.headers['Cache-Control'] = "public, max-age=#{age}" if Rails.env.production?
  end
  
  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      username == "lbn" && password == "lbn"
    end
  end

end
