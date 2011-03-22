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
    @body = params[:body]
    @recipients = params[:recipients]
    LbnMailer.content_email(@recipients, @body).deliver
  end  
end
