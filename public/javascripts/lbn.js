if (typeof console == "undefined" || typeof console.log == "undefined") {
    console = {
        log : function(args) {
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
                $("#loading").fadeOut(2000, function() {
                    showPlayground();
                });
            else
                showPlayground();

        }
    }

    function showPlayground() {
        $("#loading").remove();
        $("#container").fadeIn();

        if (draggable.size() > 0) {
            draggable.css({top: 0, left: 0});
            draggable.css({cursor: 'move'});
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
            draggable.css({left: 0, top: y1});
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
            console.log(image_url);
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

    var ajax = false;

    function showSongs() {
        console.log("AJAX", ajax);
        if (ajax) {
            $("#content").fadeOut(function() {
                $("#songs").fadeIn();
            });
            return false;
        }

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
    });

    function initComments() {
        var comments = $('#comments');
        var width = comments.width();
        comments.css('width', '0').show();
        $("a#comment").click(function() {
           if (comments.width() == 0) {
               comments.animate({'width': width});
               playground.animate({right : width}, updateDraggable);
           } else {
               comments.animate({'width': 0});
               playground.animate({right: 0}, updateDraggable);
           }
            return false;
        });
    }

})(jQuery);