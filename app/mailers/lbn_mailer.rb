class LbnMailer < ActionMailer::Base
  default :from => "contacto@lasbuenasnoches.com"

  EMAILS = ["danigb@gmail.com", "lasbuenasnoches@gmail.com", "danielcuberta@gmail.com",
            "camilobossocox@yahoo.es", "rubenxito@gmail.com", "clismon@gmail.com"]


  def comment_email(comment)
    @comment = comment
    mail(:to => EMAILS, :subject => "Han comentao la (nueva) web")
  end
  
  def content_email(recipients, body)
    @content = body
    mail(:to => recipients, :subject => "Nuevo disco de Las Buenas Noches")
  end

end
