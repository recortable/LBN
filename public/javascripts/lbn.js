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
            setupDraggable(draggable.attr('data-position'));
            $(window).resize(function() {
                if (draggable != null) setupDraggable(null);
            });
        }
        playground.fadeIn();
        $("#controls").fadeIn();
        $("#player").fadeIn();
    }

    function setupDraggable(setPosition) {
        console.log("Position " + setPosition);
        var maskWidth = playground.width();
        var maskHeight = playground.height();
        var draggableWidth = draggable.width();
        var draggableHeight = draggable.height();
        var x1 = maskWidth - draggableWidth;
        var y1 = maskHeight - draggableHeight;

        if (setPosition == 'leftBottom') {
            draggable.css({left: 0, top: y1});
        } else if (setPosition == 'leftTop') {
            draggable.css({left: 0, top: 0});
        }
        draggable.draggable({ containment: [x1,y1,0,0] });
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
        var image_url = $("#preload").attr('src');
        console.log(image_url);
        var img = new Image();
        img.src = image_url;
        $(img).load(function() {
            loaded = true;
            initPlayground();
        });
    }

    var ajax = false;
    $(function() {
        initPage();

        $("a.cancion-pequena").click(function() {
            ajax = true;
            $.get($(this).attr('href') + "?ajax=true", function(data) {
                $("#songs").fadeOut(function() {
                    $("#content").hide().html(data).fadeIn();
                });
            });
            return false;
        });

        $(".song-image a").live('click', function() {
            console.log("AJAX", ajax);
            if (ajax) {
                $("#content").fadeOut(function() {
                   $("#songs").fadeIn();
                });
                return false;
            }
        });
    });

})(jQuery);