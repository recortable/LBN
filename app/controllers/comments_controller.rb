class CommentsController < ApplicationController

  def index
    @comments = Comment.all
    @comment = Comment.new
    render :action => 'index', :layout => false
  end

  def create
    comment = Comment.create(params[:comment]) if params[:lbn] == 'lbn'
    render :text => 'Gracias!'
  end
end