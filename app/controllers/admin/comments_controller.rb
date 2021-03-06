# encoding: UTF-8

class Admin::CommentsController < ApplicationController
  respond_to :html
  layout 'admin'

  before_filter :authenticate


  def index
    @comments = Comment.all
    respond_with @comments
  end


  def emails
    @comments = Comment.all
    @emails = []
    @comments.each {|c| @emails << c.author if c.author.present? }
    respond_with @comments
  end

  def show
    @comment = Comment.find(params[:id])
    respond_with @comment
  end

  def new
    @comment = Comment.new
    respond_with @comment
  end

  # GET /admin/comments/1/edit
  def edit
    @comment = Comment.find(params[:id])
    respond_with @comment
  end

  def create
    @comment = Comment.new(params[:comment])
    flash[:notice] = "Comentado!" if @comment.save
    respond_with @comment, :location => admin_comments_path
  end

  def update
    @comment = Comment.find(params[:id])
    flash[:notice] = "Así se hace!" if @comment.update_attributes(params[:comment])
    respond_with @comment, :location => admin_comments_path
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    respond_with @comment, :location => admin_comments_path
  end



end
