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
        personDetailForm: function (mode, callback) {
            var form = $(this),
                saveBtn = $('#person-save-btn', form),
                editBtn = $('#person-edit-btn', form);

            form.detailForm(mode, saveBtn, editBtn, callback);
        },
        personBook: function (q, callback) {
            var book = $(this),
                form = $('#person-detail-form');
            book.after(form);
            form.append(book);
            form.personDetailForm(q.mode, callback);
            return book;
        },
        personUpdateTable: function () {
            var table = $(this);
            table.sortableTable();
            return table;
        }
    });

    $(function () {
        var body = $(document.body),
            q = $.getQuery();


        var personUpdateTable = $('#person_update-table', body).personUpdateTable();

        personUpdateTable.appendData = function (data) {
            var tbody = personUpdateTable.find('tbody');
            var tmpl = personUpdateTable.find('#person_update-tr-tmpl').html();
            data && data.reverse().forEach(function (data) {
                var tr = $(tmpl).prependTo(tbody);
                Object.keys(data).forEach(function (key) {
                    tr.findByAttr('data-key', key).text(data[key]);
                });
            });
        };
        $('#book', body).personBook(q, function (data) {
            personUpdateTable.appendData(data.change);
        });

    });
})(jQuery, window['l'], Handlebars);
