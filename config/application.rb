require File.expand_path('../boot', __FILE__)

require 'rails/all'

# If you have a Gemfile, require the gems listed there, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env) if defined?(Bundler)

module LBN
  class Application < Rails::Application

    CANCIONES = ['01-la-palma', '02-manuela', '03-bingo', '04-todas-las-escopetas',
                 '05-cancion-truco', '06-el-mal-camino', '07-aventuras-domesticas', '08-lomo',
                 '09-rendicion', '10-el-dios-insecto', '11-el-sastre', '12-la-vieja-guarderia']

    config.i18n.default_locale = :es
    config.encoding = "utf-8"
    config.filter_parameters += [:password]
  end
end
