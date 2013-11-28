/**
 * public script for person import page
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  hbs : handlebars
 *
 */
(function ($, l, hbs) {
    $.fn.extend({
        dropUploadFormContainer: function () {
            return this.each(function () {
                var container = $(this),
                    data = container.data();
                var msg = l.msg.drop_csv_here;
                container.dropUploadInput(data.action, data.name, msg, function (data) {
                    $('.tk-drop-ready').removeClass('.tk-drop-ready');
                    container.trigger('drop-upload-done', [data]);
                });
            });
        },
        textImportDiv: function (callback) {
            var div = $(this),
                form = div.find('form');

            form
                .validationForm(v.csv.by_text)
                .ajaxForm(function (data) {
                    callback(data);
                });
            return div;
        },
        fileImportDiv: function (callback) {
            var div = $(this);
            div.on('drop-upload-done', function (e, data) {
                console.log('data', data);
                callback(data);
            });
            return div;

        },
        submitPreview: function (files) {
            var tmpl = {
                sheet: hbs.templates['csv-submit-preview-sheet']
            };
            var preview = $(this),
                sheet = $('#submit-preview-sheet', preview);
            sheet.showSpin();
            $.getJSON(files['raw'], function (data) {
                var headers = preview.data('headers') || [];
                data.forEach(function (data) {
                    while (data.length < headers.length) {
                        data.push(null);
                    }
                });
                sheet
                    .removeSpin()
                    .html(tmpl.sheet({
                        headers: headers,
                        rows: data
                    }));
            });
            return preview;
        },
        errorPreview: function (files) {
            var tmpl = {
                sheet: hbs.templates['csv-err-preview-sheet']
            };
            var preview = $(this),
                sheet = $('#err-preview-sheet', preview);
            sheet.showSpin();
            $.getJSON(files['raw'], function (raw) {
                $.getJSON(files['errors'], function (errors) {
                    var data = raw.map(function (data) {
                        return data.map(function (data) {
                            return {text: data};
                        })
                    });
                    errors.forEach(function (err) {
                        var row = err.row,
                            col = err.col;
                        delete err.row;
                        delete err.col;
                        data[row] = data[row] || [];
                        data[row][col] = data[row][col] || {};
                        data[row][col].err = err;
                        data[row][col].style_class = err ? 'has-err' : '';
                    });
                    var headers = preview.data('headers') || [];
                    data.forEach(function (data) {
                        while (data.length < headers.length) {
                            data.push(null);
                        }
                    });
                    sheet
                        .removeSpin()
                        .html(tmpl.sheet({
                            headers: headers,
                            rows: data
                        }));
                });
            });
            return preview;
        },
        previewSection: function (data) {
            var section = $(this);
            $('.preview', section).hide();
            if (data.valid) {
                $('#submit-preview', section).submitPreview(data['files']).show();
            } else {
                $('#err-preview', section).errorPreview(data['files']).show();
            }
            return section;
        },
        importWayTabs: function (hash, callback) {
            var tabs = $(this);
            var tab = tabs.find('.tab');
            tab.tab(function () {
                var a = $(this),
                    href = a.attr('href');
                var id = a.attr('id');
                if (id) {
                    tab.hide();
                    location.href = '#' + id;
                    tab.show();
                }
                callback(href);
            });
            var first = tab.filter(hash);
            first = first.size() ? first : tab.first();
            first.click();
            return tabs;
        },
        leftPage: function () {
            var page = $(this),
                inner = $('.book-page-inner', page);
            page.resize = function (bookWidth) {
                inner.width(bookWidth - 70);
            };
            return page;
        },
        rightPage: function () {
            var page = $(this),
                inner = $('.book-page-inner', page);
            page.enable = function () {
                inner.removeAttr('style');
            };
            page.disable = function () {
                inner.css({
                    zIndex: -1
                });
            };
            return page;
        },
        importSubmitForm: function () {
            var form = $(this);
            form.ajaxForm(function (data) {
                var errAlert = $('#err-alert');
                if (data.err_alert) {
                    errAlert.show().text(data.err_alert);
                    $.scrollToTop();
                    $.confirmLeave(false);
                } else {
                    errAlert.text('').hide();
                }
                if (data.valid) {
                    $.confirmLeave(false);
                    location.href = form.data('onsuccess');
                }

            });
            form.findByRole('submit-btn').click(function () {
                form.submit();
            });
            return form;
        }
    });
    $(function () {
        var body = $(document.body),
            win = $(window),
            main = $('#main', body),
            book = $('#book', main),
            leftPage = $('#left-page', book).leftPage(),
            rightPage = $('#right-page', book).rightPage(),
            importSection = $('#import-section', rightPage),
            lead = $('#person-import-lead');


        $('#import-way-tabs', body).importWayTabs(location.hash, function (selector) {
            $('#import-way-tab-contents', body).find('.tab-content')
                .hide().filter(selector).show();
        });

        var previewSection = $('#preview-section', body);
        $('.preview-hide-btn', body).click(function () {
            $.confirmLeave(false);
            location.reload();
        });

        win.resize(function () {
            if (previewSection.is(':visible')) {
                leftPage.resize(book.width());
            }
            book.trigger('resize-book');
        });


        main.showPreview = function (data) {
            previewSection.previewSection(data);
            importSubmitForm.findByName('person_json_path').val(data['files']['persons']);
            importSection.add(lead).fadeOut(200, function () {
                leftPage.resize(book.width());
                rightPage.disable();
                previewSection.fadeIn(300, function () {
                    book.trigger('resize-book');
                    $.confirmLeave(l.msg.leave_with_unsaved);
                });
            });
        };
        main.hidePreview = function () {
            previewSection.fadeOut(200, function () {
                book.trigger('resize-book');
                importSection.add(lead).fadeIn(300, function () {
                    leftPage.resize(book.width());
                    rightPage.enable();
                    $('.book-page-inner', book).removeAttr('style');
                    $.confirmLeave(false);
                });
            });
        };
        var importSubmitForm = $('#submit-form').importSubmitForm();

        body.findByRole('drop-upload-form-container').dropUploadFormContainer();

        $('#sub-nav', body).subNav('admin');


        $('#file-import-div', book).fileImportDiv(function (data) {
            main.showPreview(data);
        });
        $('#text-import-div', book).textImportDiv(function (data) {
            main.showPreview(data);
        });


        book.trigger('resize-book');
    });
})(jQuery, window['l'], Handlebars);