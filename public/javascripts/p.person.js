/**
 * public script for person
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  hbs : handlebars
 *
 */
(function ($, l, hbs) {
    $.fn.extend({
        personDetailForm: function (mode, callback) {
            var form = $(this),
                saveBtn = $('#person-save-btn', form),
                editBtn = $('#person-edit-btn', form);

            form.detailForm(mode, saveBtn, editBtn, callback);

            form.find('[data-helper]').each(function () {
                var input = $(this),
                    helper = input.data('helper');
                if (helper)input.selectableText(helper);
            });
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
                    var td = tr.findByAttr('data-key', key);
                    var value = data[key];
                    if (td.data('label')) {
                        value = l.lbl[value] || value;
                    } else{
                        var booleans = data.property && l.booleans[data.property];
                        if(booleans){
                            value = booleans[value] || value;
                        }
                    }
                    td.text(value);
                });
            });
        };
        $('#book', body).personBook(q, function (data) {
            personUpdateTable.appendData(data.change);
        });

        $('#sub-nav', body).subNav('company');

    });
})(jQuery, window['l'], Handlebars);
