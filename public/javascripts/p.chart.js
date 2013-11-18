/**
 * public script for chart
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, hbs, window) {
    function doNothing() {

    }

    $.extend({
        enableWindowScroll: function (enable) {
            if (enable) {
                window.onscroll = doNothing;
            } else {
                var top = $(window).scrollTop();
                window.onscroll = function () {
                    $(window).scrollTop(top);
                };
            }
        }
    });
    $.fn.extend({
        sortableTable: function () {
            var table = $(this),
                thead = table.find('thead'),
                tbody = table.find('tbody');

            var bodyTr = tbody.find('tr');
            thead.find('th label').click(function () {
                var th = $(this).parent('th'),
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
            var table = $(this),
                thead = table.find('.sheet-thead'),
                tbody = table.find('.sheet-tbody');
            table.sortableTable();

            table.on('mouseenter', '.sheet-th,.sheet-cell', function () {
                var cell = $(this),
                    col = cell.data('col');
                thead.find('.col-' + col)
                    .addClass('hovered')
                    .siblings('.hovered')
                    .removeClass('hovered');
            });
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
            tbody.find('tr').filterTableRow(filterword);
            if (filterword) {
            } else {
                tbody.find('.filter-table-row-hidden').removeClass('filter-table-row-hidden');
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
        },
        filterSelectSection: function (key, values, callback) {
            var section = $(this),
                content = $('.section-content', section);
            var tmpl = {
                form: hbs.templates['chart-filter-select-form']
            };
            var html = tmpl.form({
                values: values,
                title: l.lbl[key]
            });
            content.html(html);

            var form = content.find('form');
            form.submit(function (e) {
                e.preventDefault();
                var values = form.getFormValue().toObj();
                callback && callback(key, values);
            });

            var checkbox = form.find(':checkbox');
            checkbox.doStyle = function () {
                checkbox.each(function () {
                    var checked = this.checked,
                        li = $(this).parent('li');
                    li.toggleClass('disabled', !checked);
                });
            };
            form.change(function () {
                checkbox.doStyle();
                form.submit();
            });
            checkbox.doStyle();

            var valueList = $('.chart-filter-value-list', form);
            form.findByName('filter_active').change(function () {
                var active = eval($(this).val());
                if (active) {
                    valueList.openUp();
                } else {
                    valueList.closeDown();
                }
            });
            valueList
                .hover(function () {
                    $.enableWindowScroll(false);
                }, function () {
                    $.enableWindowScroll(true);
                });

            valueList
                .find('li')
                .click(function (e) {
                    var li = $(this);
                    if (e.target === this) {
                        li.find('label').click();
                    }
                })
                .find('label')
                .click(function (e) {
                    e.stopPropagation();
                });

            valueList
                .find('.toogle-all-btn')
                .click(function () {
                    var hasUnchecked = !!checkbox.not(':checked').size();
                    checkbox.prop('checked', hasUnchecked);
                    checkbox.doStyle();
                    form.submit();
                });
            form.find('.close-btn').click(function () {
                section.fadeOut(100);
            });
            return section.show();
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


        sheetTable.getColValues = function (key) {
            var tbody = sheetTable.find('.sheet-tbody');
            var th = sheetTable.findTh(key),
                col = th.data('col');
            var cell = tbody.find('.col-' + col);
            return cell.toArray().map(function (cell) {
                return $.trim($(cell).text());
            });
        };


        sheetTable.findTh = function (key) {
            return sheetTable.find('.sheet-thead').findByAttr('data-key', key);
        };

        sheetTable.findCol = function (key) {
            return sheetTable.find('.sheet-colgroup').findByAttr('data-key', key);
        };

        sheetTable.applyFilter = function (col, filter_values) {
            sheetTable.find('.sheet-tbody')
                .find('tr')
                .each(function () {
                    var tr = $(this),
                        cell = tr.find('.col-' + col);
                    var value = $.trim(cell.text()) || '__empty__';
                    var hit = filter_values && (filter_values.indexOf(value) != -1);
                    var class_name = 'sheet-tr-filter-hidden-' + col;
                    tr.toggleClass(class_name, !hit);
                });
        };
        sheetTable.removeFilter = function (col) {
            var class_name = 'sheet-tr-filter-hidden-' + col;
            sheetTable.find('.' + class_name).removeClass(class_name);
        };

        sheetTable
            .find('.filter-add-btn,.filter-edit-btn')
            .each(function () {
                var btn = $(this),
                    key = btn.parent('th').data('key');
                btn.data('key', key);
                var values = tek.unique(sheetTable.getColValues(key).filter(function (value) {
                    return !!value;
                })).sort();
                if (!values.length) {
                    btn.hide();
                }
            })
            .click(function (e) {
                e.stopPropagation();
                var btn = $(this),
                    key = btn.data('key');
                var values = tek.unique(sheetTable.getColValues(key).filter(function (value) {
                    return !!value;
                })).sort();

                filterSelectSection.filterSelectSection(key, values, function (key, values) {
                    var filter_active = eval(values['filter_active']);
                    sheetTable.findCol(key).toggleClass('filter-active', filter_active);
                    var th = sheetTable.findTh(key),
                        col = th.data('col');
                    th
                        .find('.filter-edit-btn,.filter-add-btn')
                        .toggleClass('filter-active', filter_active)
                        .filter('.filter-edit-btn').data('values', values);

                    if (filter_active) {
                        sheetTable.applyFilter(col, values['filter_value']);
                    } else {
                        sheetTable.removeFilter(col);
                    }
                });

                filterSelectSection.showAtPoint(btn.offset());

                var savedValue = btn.data('values');
                if (savedValue) {
                    filterSelectSection.setValues(savedValue);
                }
                filterSelectSection.find('form').submit();
            });


        var filterSelectSection = $('#filter-select-section', body)
            .draggable({
                handle: '.paper-title',
                containment: 'parent'
            })
            .click(function (e) {
                e.stopPropagation();
            });


        filterSelectSection.showAtPoint = function (point) {
            var width = filterSelectSection.outerWidth();
            var right = point.left + width;
            var tooRight = $(window).width() < right;
            if (tooRight) {
                point.left -= (width + 100);
            } else {
                point.left += 20;
            }
            filterSelectSection.css(point);
        };
        filterSelectSection.setValues = function (values) {
            var form = filterSelectSection.find('form');
            var filter_value = values['filter_value'];
            form
                .findByName('filter_value')
                .each(function () {
                    var input = $(this),
                        val = input.val();
                    var checked = !!(filter_value && (filter_value.indexOf(val) != -1));
                    input.prop('checked', checked);
                });
        };


        body.click(function () {
            if (filterSelectSection.is(':visible')) {
                filterSelectSection.hide();
            }
        });
    });
})(jQuery, window['l'], Handlebars, window);
