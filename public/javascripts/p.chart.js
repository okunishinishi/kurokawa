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
        sheetTable: function () {
            var table = $(this);
            table.resize = function (bookWidth) {
                table.width(bookWidth - 70);
            };
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
    });
})(jQuery, window['l'], Handlebars);
