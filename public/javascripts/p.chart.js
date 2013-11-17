/**
 * public script for chart
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, hbs) {
    var tmpl = {
        hitWord: hbs.templates['hit-word']
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
            table.sortableTable();
            return table;
        },
        sheetSearchForm: function (callback) {
            var form = $(this),
                searchWordInput = form.findByName('search_word');
            searchWordInput.textchange(function () {
                form.submit();
            });
            form.submit(function (e) {
                e.preventDefault();
                var val = searchWordInput.val();
                if (val) {
                    form.addClass('search-form-active');
                } else {
                    form.removeClass('search-form-active');
                }
                callback && callback(val);
            });
            return form;
        },
        filterTableRow: function (filterword) {
            var trs = $(this);
            for (var i = 0, len = trs.size(); i < len; i++) {
                var tr = trs.eq(i);
                var hit = tr.wordSearch(filterword);
                if (hit) {
                    tr.removeClass('filter-table-row-hidden');
                } else {
                    tr.addClass('filter-table-row-hidden')
                }
            }
            return trs;
        },
        filterTable: function (filterword) {
            var table = $(this),
                tbody = table.find('tbody');
            if (filterword) {
                tbody.find('tr').filterTableRow(filterword);
            } else {
                tbody.find('.filter-table-row-hidden').removeClass('filter-table-row-hidden');
                tbody.find('.hit-word').restoreHitWord();
            }
            return table;
        },
        leftPage: function () {
            var page = $(this),
                inner = $('.book-page-inner', page);
            page.resize = function (bookWidth) {
                inner.width(bookWidth - 70);
            };
            return page;
        }
    });

    $(function () {
        var body = $(document.body),
            win = $(window);

        var book = $('#book', body),
            leftPage = $('#left-page', book).leftPage(),
            sheetTable = $('#sheet-table', book).sheetTable();

        win.resize(function () {
            leftPage.resize(book.width());
        });

        leftPage.resize(book.width());
        book.trigger('resize-book');

        $('#sub-nav', body).subNav('company');

        $('#sheet-search-form', body).sheetSearchForm(function (search_word) {
            sheetTable.filterTable(search_word);
        });
    });
})(jQuery, window['l'], Handlebars);
