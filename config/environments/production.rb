LBN::Application.configure do
  config.cache_classes = true

  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true

  config.action_dispatch.x_sendfile_header = "X-Sendfile"

  config.serve_static_assets = false

  # Enable serving of images, stylesheets, and javascripts from an asset server
  # config.action_controller.asset_host = "http://assets.example.com"

  # Disable delivery errors, bad email addresses will be ignored
  # config.action_mailer.raise_delivery_errors = false

  config.i18n.fallbacks = true

  config.active_support.deprecation = :notify
  config.action_mailer.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
      :address => "smtp.gmail.com",
      :port => 587,
      :authentication => :plain,
      :domain => ENV['GMAIL_SMTP_USER'],
      :user_name => ENV['GMAIL_SMTP_USER'],
      :password => ENV['GMAIL_SMTP_PASSWORD'],
  }
end
