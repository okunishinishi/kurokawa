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
        textImportDiv: function () {
            var div = $(this),
                form = div.find('form');

            form.ajaxForm(function (data) {

            });
            return div;
        },
        fileImportDiv: function () {
            var div = $(this);

            return div;

        }
    });
    $(function () {
        var body = $(document.body),
            book = $('#book', body);

        body.findByRole('drop-upload-form-container').dropUploadFormContainer();

        $('#sub-nav', body).subNav('admin');

        $('#file-import-div', book).fileImportDiv();
        $('#text-import-div', book).textImportDiv();

        book.trigger('resize-book');
    });
})(jQuery, window['l'], Handlebars);