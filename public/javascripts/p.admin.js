/**
 * public script for admin page
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, hbs) {

    $(function () {
        var body = $(document.body);

        $('#sub-nav', body).subNav('admin');

    });

})(jQuery, window['l'], Handlebars);