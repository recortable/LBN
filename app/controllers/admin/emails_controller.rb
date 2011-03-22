class Admin::EmailsController < ApplicationController
  respond_to :html
  layout 'admin'

  before_filter :authenticate

  def index
    redirect_to new_admin_email_path
  end

  def new
  end
  
  def create
    @recipients = params[:recipients]
    LbnMailer.nuevo_disco(@recipients).deliver
  end  
end
