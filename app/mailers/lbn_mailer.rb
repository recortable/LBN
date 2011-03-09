class LbnMailer < ActionMailer::Base
  default :from => "contacto@lasbuenasnoches.com"

  EMAILS = ["danigb@gmail.com", "lasbuenasnoches@gmail.com", "danielcuberta@gmail.com",
            "camilobossocox@yahoo.es", "rubenxito@gmail.com", "clismon@gmail.com"]


  def comment_email(comment)
    @comment = comment
    mail(:to => EMAILS, :subject => "Han comentao la (nueva) web")
  end

end
