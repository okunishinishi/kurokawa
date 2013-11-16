/**
 * public script for user import page
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    $.fn.extend({
    });
    $(function () {
        var body = $(document.body);

        $(':file', body).uploadFileInput('/api/user/import/file');

        $('#sub-nav', body).subNav('admin');
    });
})
    (jQuery, window['l'], Handlebars);