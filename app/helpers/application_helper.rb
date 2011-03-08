module ApplicationHelper

  def title(text)
    content_for(:title) { text }
    content_tag(:h1, text, :style => "display:none;")
  end

  def comment_style(comment)
    width = comment.content.length / 8 + 2
    width = 5 if width < 5
    "width: #{width}em";
  end
end
