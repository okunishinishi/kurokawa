/**
 * public script for person
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    $.fn.extend({
        personDetailForm: function (mode) {
            var form = $(this),
                saveBtn = $('#person-save-btn', form),
                editBtn = $('#person-edit-btn', form);

            form.detailForm(mode, saveBtn, editBtn);
        },
        personBook: function (q) {
            var book = $(this),
                form = $('#person-detail-form');
            book.after(form);
            form.append(book);

            form.personDetailForm(q.mode);
            return book;
        }
    });

    $(function () {
        var body = $(document.body),
            q = $.getQuery();

        $('#book', body).personBook(q);


    });
})(jQuery, window['l'], Handlebars);
