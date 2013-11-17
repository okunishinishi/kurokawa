/**
 * public script for user import page
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
                container.dropUploadInput(data.action, data.name);
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

            return div;

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
                    var headers = preview.data('headers');
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

            } else {
                $('#err-preview', section).errorPreview(data['files']).show();
            }
            return section;
        },
        importWayTabs: function (hash, callback) {
            var tabs = $(this);
            var tab = tabs.find('.tab');
            tab.click(function (e) {
                var a = $(this),
                    href = a.attr('href');
                var id = a.attr('id');
                if (id) {
                    tab.hide();
                    location.href = '#' + id;
                    tab.show();
                }
                a.addClass('tab-active')
                    .siblings('.tab-active')
                    .removeClass('tab-active');
                e.preventDefault();
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
        rightPage:function(){
            var page = $(this),
                inner = $('.book-page-inner', page);
            page.enable = function(){
                inner.removeAttr('style');
            };
            page.disable =function(){
                inner.css({
                    zIndex:-1
                });
            };
            return page;
        }
    });
    $(function () {
        var body = $(document.body),
            win = $(window),
            main = $('#main', body),
            book = $('#book', main),
            leftPage = $('#left-page', book).leftPage(),
            rightPage = $('#right-page', book).rightPage(),
            importSection = $('#import-section', rightPage);


        $('#import-way-tabs', body).importWayTabs(location.hash, function (selector) {
            $('#import-way-tab-contents', body).find('.tab-content')
                .hide().filter(selector).show();
        });

        var previewSection = $('#preview-section', body);
        $('.preview-hide-btn', body).click(function () {
            main.hidePreview();
        });

        win.resize(function () {
            if (previewSection.is(':visible')) {
                leftPage.resize(book.width());
            }
            book.trigger('resize-book');
        });


        main.showPreview = function (data) {
            previewSection.previewSection(data);
            importSection.fadeOut(200,function () {
                leftPage.resize(book.width());
                rightPage.disable();
                previewSection.fadeIn(300,function () {
                    book.trigger('resize-book');
                });
            });
        };
        main.hidePreview = function () {
            previewSection.fadeOut(200,function () {
                book.trigger('resize-book');
                importSection.fadeIn(300,function(){
                    rightPage.enable();
                });
            });
        };

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