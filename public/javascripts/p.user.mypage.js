/**
 * public script for user page
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  v : validation
 *  hbs : handlebars
 *
 */

(function ($, l, v, hbs) {

    $.fn.extend({
        userDetailForm: function () {
            var form = $(this);

            form.findByRole('editable-text').editableText();
            return form.ajaxForm(function(){
            });
        },
        userDetailSection: function () {
            var section = $(this),
                form = $('#user-detail-form', section);
            form.userDetailForm();
            return section;
        }
    });
    $(function () {
        var body = $(document.body);

        $('#user-detail-section', body).userDetailSection();
    })
})(jQuery, window['l'], window['v'], Handlebars);