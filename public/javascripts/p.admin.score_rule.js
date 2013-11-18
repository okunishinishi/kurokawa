/**
 * public script for score_rule
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, hbs) {
    $.fn.extend({
    });

    $(function () {
        var body = $(document.body);

        $('#sub-nav', body).subNav('admin');

    });
})(jQuery, window['l'], Handlebars);
