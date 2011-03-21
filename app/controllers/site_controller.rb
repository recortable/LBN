class SiteController < ApplicationController
  def downloads
    render :action => 'downloads', :layout => 'site'
  end
end
