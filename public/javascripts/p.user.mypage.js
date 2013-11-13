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
        editableForm: function (mode) {
            var form = $(this);
            var editableText = form.findByRole('editable-text')
                .editableText('dblclick')
                .off('change');
            var $checkable = $('.checkable-label', form);
            switch (mode) {
                case 'view':
                    $checkable.each(function () {
                        var label = $(this),
                            input = $('#' + label.attr('for'));
                        if (!input.size()) return;
                        var checked = input.is(':checked');
                        if (checked) {
                            label.show();
                        } else {
                            label.hide();
                        }
                    });
                    editableText.trigger('tk-editable-text-fix');
                    $(':text,textarea', form).filter(':visible').hide();
                    break;
                case 'edit':
                    $checkable.show();
                    editableText.trigger('tk-editable-text-edit');
                    break;
            }

            form.attr('data-mode', mode);
        },
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