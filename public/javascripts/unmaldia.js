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
            $("#center").fadeOut(2000, function() {
                $("#center").remove();

                draggable.css({top: 0, left: 0});
                draggable.css({cursor: 'move'});
                setupDraggable(draggable.attr('data-position'));
                $(window).resize(function() {
                    if (draggable != null) setupDraggable(null);
                });
                playground.fadeIn();
                $("#controls").fadeIn();
            });

        }
    }

    function setupDraggable(setPosition) {
        console.log("Position " + setPosition);
        var maskWidth = playground.width();
        var maskHeight = playground.height();
        var imgWidth = draggable.width();
        var imgHeight = draggable.height();
        var x1 = maskWidth - imgWidth - 150;
        var y1 = maskHeight - imgHeight;

        if (setPosition == 'leftBottom') {
            draggable.css({left: 0, top: y1});
        } else if (setPosition == 'leftTop') {
            draggable.css({left: 0, top: 0});
        }
        draggable.draggable({ containment: [x1,y1,0,0] });
    }

    $(function() {
        playground = $("#playground");
        draggable = $("#draggable");
        var image_url = $("#playground img").attr('src');
        console.log(image_url);
        var img = new Image();
        img.src = image_url;
        $(img).load(function() {
            initPlayground();
        });

        $("#controls a").click(function() {
            alert("Esto es sólo una prueba...");
            return false;
        });

    });

})(jQuery);