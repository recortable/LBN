if (typeof console == "undefined" || typeof console.log == "undefined") {
    console = {
        log : function(args) {
        },
        debug : function() {
        }
    };
}

(function($) {
    var playground = null;
    var draggable = null;
    var initialized = false;

    function initPlayground() {
        if (!initialized) {
            initialized = true;
            if ($("#loading").is(":visible"))
                $("#loading").fadeOut(function() {
                    showPlayground();
                });
            else
                showPlayground();
            loadReplacements();
        }
    }

    /** LOAD SUBSTITUTE IMAGES **/
    function loadReplacements() {
        var replacements = $(".replacement");
        var total = replacements.length;
        replacements.each(function() {
            var source = $(this);
            preloadImage(source, function(image_url) {
                var original_selector = source.attr('data-original');
                console.log("Replacing " + original_selector + " with " + image_url);
                $(original_selector).attr('src', image_url);
                total--;
                if (total == 0) {
                    $("#working").slideUp(500);
                    loadCached();
                }
            });
        });
        if (total == 0) {
            $("#working").slideUp(500);
            loadCached();
        }
    }

    function loadCached() {
        setTimeout(function() {
            $("div.cache").each(function() {
                new Image().src = $(this).attr('data-src');
            })
        });
    }

    function preloadImage(source, callback) {
        if (source.length) {
            var image_url = source.attr('src');
            console.log("Waiting for " + image_url);
            var img = new Image();
            $(img).load(function() {
                callback(image_url);
            });
            img.src = image_url;
        }
    }


    function showPlayground() {
        $("#loading").remove();
        $("#container").fadeIn();

        if (draggable.size() > 0) {
            draggable.css({top: 0, left: 0});
            //draggable.css({cursor: 'move'});
            updateDraggable(draggable.attr('data-position'));
            $(window).resize(function() {
                if (draggable != null) updateDraggable(null);
            });
        }
        playground.fadeIn();
        $("#controls").fadeIn();
        $("#player").fadeIn();
    }

    function updateDraggable(setPosition) {
        console.log("Position " + setPosition);
        var maskWidth = playground.width();
        var maskHeight = playground.height();
        var draggableWidth = draggable.width();
        var draggableHeight = draggable.height();

        var x1 = maskWidth - draggableWidth;
        var x2 = 0;
        var y1 = maskHeight - draggableHeight;
        var y2 = 0;

        if (x1 > 0) {
            x1 = x2 = parseInt(x1 / 2);
            draggable.css('left', "" + x1 + "px");
        }
        if (y1 > 0) {
            y1 = y2 = parseInt(y1 / 2);
            draggable.css('top', "" + y1 + "px");
        }

        if (setPosition == 'leftBottom') {
            draggable.animate({left: 0, top: y1}, 1000);
        } else if (setPosition == 'leftTop') {
            draggable.css({left: 0, top: 0});
        }

        // mirar a ver si está el data antes de arreglar nada aquí!!!
        if (x1 != x2 || y1 != y2) {
            draggable.draggable({ containment: [x1,y1,x2,y2] });
        } else {
            draggable.css({cursor:'default', position:'relative'});
        }
    }

    function initPage() {
        var loaded = false;

        setTimeout(function() {
            if (!loaded) {
                $("#loading").fadeIn();
            }
        }, 500);

        playground = $("#playground");
        draggable = $("#draggable");
        if ($("#preload").length) {
            var image_url = $("#preload").attr('src');
            var img = new Image();
            img.src = image_url;
            $(img).load(function() {
                loaded = true;
                initPlayground();
            });
        } else {
            loaded = true;
            initPlayground();
        }
    }


    function showSongs() {
        $("#content").fadeOut(function() {
            $("#songs").fadeIn();
        });
        return false;
    }

    function initVideos() {
        $(".video .view a").click(function() {
            $(this).fadeOut();
            $(this).siblings('iframe').fadeIn();
            return false;
        });


        $(".video h3 a").click(function() {
            var parent = $(this).parents('.video');
            parent.find('iframe').fadeToggle();
            parent.find('.view a').fadeToggle();
            return false;
        });
    }

    $(function() {
	    browserMessage();
        initPage();
        if ($("#player").length) {
            $("#controls").css('left', '180px');
        }

        $("a.cancion-pequena").click(function() {
            ajax = true;
            $.get($(this).attr('href') + "?ajax=true", function(data) {
                $("#songs").fadeOut(function() {
                    $("#content").hide().html(data).fadeIn();
                });
            });
            return false;
        });

        $("#canciones-aventuras").click(function() {
            return showSongs();
        });

        $(".song-image a").live('click', function() {
            return showSongs();
        });

        initVideos();
        initComments();
        initLinks();
        initLinker();
    });

    var linker = null;

    function initLinker() {
        $("#linker").remove().appendTo('#draggable');
        $("#draggable").click(function(e) {
            if (linker == null || linker.width) {
                linker = {
                    left: e.pageX - parseInt($(this).css('left')),
                    top: e.pageY - parseInt($(this).css('top'))
                }
            } else {
                linker.width = (e.pageX - parseInt($(this).css('left'))) - linker.left;
                linker.height = (e.pageY - parseInt($(this).css('top'))) - linker.top;
                console.log("{left:" + linker.left + "px;top:" + linker.top + "px;width:" + linker.width + "px;height:" + linker.height + "px;}");
                $("#linker").css({left:linker.left + "px", top: linker.top + "px", width:linker.width+"px",height:linker.height+"px"});
            }

        });
    }

    function initLinks() {
        var regexp = /www\.youtube\.com\/watch\?v=(.*)/;

        $("#playground a").each(function() {
            var src = $(this).attr('href');
            var match = regexp.exec(src);
            if (match != null)
                $(this).attr('href', '/enlace?y=' + match[1]);
        });
    }

    function initComments() {
        var loaded = false; // if comments are loaded
        //$("#comments .list").draggable({ containment: [0,0,0,-300] });
        var comments = $('#comments');
        var width = comments.width();
        comments.css('width', '0').show();
        var offset = $("#comments").offset().left - width;

        $("a.toggleComment").live('click', function() {
            if (comments.width() == 0) {
                if (!loaded) {
                    $("#comments").load('/comments', function() {
                        loaded = true;
                        var height = $("#comments .comments").height();
                        $("#comments .list").draggable({ containment: [offset,-height,offset,0]}); //({axis: "y"});
                    });
                }
                $("#comments .list").css('top', 0);
                comments.animate({'width': width});
                //playground.animate({right : width}, updateDraggable);

            } else {
                comments.animate({'width': 0});
                //playground.animate({right: 0}, updateDraggable);
            }
            return false;
        });

        $("#comments form").live('submit', function(e) {
            var body = $("#comment_content").val();
            var email = $("#comment_author").val();
            console.log(body, email);
            $("#comments .comments").prepend("<p><span>Tu - </span>" + body + "</p>");
            $.post("/comments", {'comment[content]':body, 'comment[author]':email, 'lbn': 'lbn'});
            e.preventDefault();
        });
    }

	function browserMessage() {
		if ($("html.ie").length) {
			$("#browser").show();
		}
		if ($("html.ie6").length) {
			$("#ie6").show();
		}
	}

})(jQuery);