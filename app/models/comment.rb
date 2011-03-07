class Comment < ActiveRecord::Base
  default_scope :order => 'id DESC'
end
