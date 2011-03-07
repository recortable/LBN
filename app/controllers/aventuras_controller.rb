class AventurasController < ApplicationController
  layout 'aventuras'
  before_filter :cache_page

  CANCIONES = ['01-la-palma', '02-manuela', '03-bingo', '04-todas-las-escopetas',
               '05-cancion-truco', '06-el-mal-camino', '07-aventuras-domesticas', '08-lomo',
               '09-rendicion', '10-el-dios-insecto', '11-el-sastre', '12-la-vieja-guarderia']


  def cortinas

  end

  def canciones

  end

  def cancion
    @title = params[:title]
  end


end