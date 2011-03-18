class UnMalDiaController < ApplicationController
  layout 'unmaldia'
  before_filter :cache_page

  def portada
  end

  def canciones
  end

  def unmaldia
  end

  def videos
  end

  def link
    render :action => 'link', :layout => false
  end

  def reloj
  end

  def lanada
  end
end
