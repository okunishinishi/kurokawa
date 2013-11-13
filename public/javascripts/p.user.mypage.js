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

            form.ajaxForm(function () {
                editBtn.show();
                saveBtn.hide();
                form.editableForm('view');
            });
            editBtn.click(function () {
                form.editableForm('edit');
                editBtn.hide();
                saveBtn.show();
            });
            form
                .change(function () {
                    $.confirmLeave(l.msg.leave_with_unsaved);
                });
            form.find(':text')
                .keydown(function (e) {
                    switch (e.which) {
                        case $.ui.keyCode.ENTER:
                            e.preventDefault();
                            break;
                    }
                });
            form.editableForm(mode || 'view');

            return form;
        }
    });
    $(function () {
        var body = $(document.body),
            q = $.getQuery();

        $('#user-detail-form', body).userDetailForm(q.mode);
    })
})(jQuery, window['l'], window['v'], Handlebars);