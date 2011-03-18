(function() {
    var link_pre = '<iframe title="YouTube video player" width="853" height="510" src="http://www.youtube.com/embed/';
    var link_post = '?rel=0" frameborder="0" allowfullscreen></iframe>';

    $(function() {
        var vid = $.getUrlVar('y');
        if (vid != undefined)
            $(".embed").html(link_pre + vid + link_post);
    });

    $.extend({
        getUrlVars: function() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function(name) {
            return $.getUrlVars()[name];
        }
    });
})();