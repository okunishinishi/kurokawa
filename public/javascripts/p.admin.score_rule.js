/**
 * public script for score_rule
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  hbs : handlebars
 *
 */
(function ($, l, hbs) {
    $.fn.extend({
        score_ruleDetailForm: function (mode, callback) {
            var form = $(this),
                saveBtn = $('#score_rule-save-btn', form),
                editBtn = $('#score_rule-edit-btn', form);
            form.detailForm(mode, saveBtn, editBtn, callback);
            editBtn.click(function(){
                editBtn.trigger('resize-book');
            });
            return form;
        }
    });

    $(function () {
        var body = $(document.body),
            q = $.getQuery();

        var book = $('#book', body);

        $('#sub-nav', body).subNav('admin');


        $('#score_rule-form', body).score_ruleDetailForm(q.mode, function () {
            book.trigger('resize-book');
        });

    });
})(jQuery, window['l'], Handlebars);
