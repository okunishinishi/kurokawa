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
        },
        passwordChangeForm: function (callback) {
            var form = $(this);
            form.validatableAjaxForm(function (data) {
                if (data.valid) {
                    callback && callback();
                }
            });
            form.find('.close-btn').click(function () {
                callback && callback();
            });
            return form;
        }

    });
    $(function () {
        var body = $(document.body),
            book = $('#book', body),
            q = $.getQuery();

        $('#user-detail-form', body).userDetailForm(q.mode);

        var passwordChangeForm = $('#password-change-form', body)
            .insertAfter(book)
            .passwordChangeForm(function () {
                book.removeClass('covered-book');
                passwordChangeForm.hide();
            }).hide();

        $('#password_change-btn', body).click(function () {
            book
                .addClass('covered-book');
            passwordChangeForm
                .show();
            passwordChangeForm
                .css({
                    left: (book.outerWidth() - passwordChangeForm.outerWidth()) / 2 + 20
                })
                .find('[type="password"]')
                .first()
                .focus();
        })
        ;
    })
})(jQuery, window['l'], window['v'], Handlebars);