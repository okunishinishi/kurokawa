/**
 * public script for chart
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, Hbs) {
    var tmpl = {
        li: Hbs.templates['chart-list-item']
    };
    $.fn.extend({
        sortableTable: function () {
            var table = $(this),
                thead = table.find('thead'),
                tbody = table.find('tbody');

            var bodyTr = tbody.find('tr');
            thead.find('th').click(function () {
                var th = $(this),
                    asc = eval(th.attr('data-asc') || 'false'),
                    col = th.data('col');
                th.siblings('[data-asc]').removeAttr('data-asc');
                bodyTr
                    .each(function (i) {
                        var tr = $(this),
                            td = tr.find('.col-' + col);
                        tr
                            .data('sort-value', td.text() || '')
                            .data('index', i);
                    })
                    .sort(function (a, b) {
                        var $1 = $(a);
                        var $2 = $(b);
                        var v1 = $1.data('sort-value'),
                            v2 = $2.data('sort-value');
                        var sorted = v1.localeCompare(v2) * (asc ? 1 : -1);
                        if (sorted) {
                            return  sorted;
                        } else {
                            return ($2.data('index') - $1.data('index')) * (asc ? 1 : -1);
                        }
                    })
                    .appendTo(tbody);
                th.attr('data-asc', !asc);
            });
            return table;
        },
        sheetTable: function () {
            var table = $(this);
            table.resize = function (bookWidth) {
                table.width(bookWidth - 70);
            };
            table.sortableTable();
            return table;
        }
    });

    $(function () {
        var body = $(document.body),
            win = $(window);

        var book = $('#book', body),
            sheetTable = $('#sheet-table', body).sheetTable();
        win.resize(function () {
            sheetTable.resize(book.width());
        });
        sheetTable.resize(book.width());
        book.trigger('resize-book');

        $('#sub-nav', body).subNav('company');
    });
})(jQuery, window['l'], Handlebars);
