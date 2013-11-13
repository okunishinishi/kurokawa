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
        userDetailForm: function (mode) {
            var form = $(this),
                saveBtn = $('#user-detail-save-btn').hide(),
                editBtn = $('#user-detail-edit-btn');

            form.detailForm(mode, saveBtn, editBtn);

            return form;
        }
    });
    $(function () {
        var body = $(document.body),
            q = $.getQuery();

        $('#user-detail-form', body).userDetailForm(q.mode);
    })
})(jQuery, window['l'], window['v'], Handlebars);