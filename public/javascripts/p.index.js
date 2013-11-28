/**
 * public script for index page
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  hbs : handlebars
 *
 */
(function ($, l, hbs) {
    var tmpl = {
        companyLi: hbs.templates['company-list-item']
    };
    $.fn.extend({
        companySearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        companyListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick')
                .on('edit-done', function (e, data) {
                    var li = $(this);
                    var id = li.findByName('_id').val();
                    li.find('.detail-link').attr({
                        href: '/chart/' + id + '/?t=' + new Date().getTime()
                    });
                });
        },
        companyList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.companyLi, data)
                .find('li')
                .companyListItem();
            return ul;
        },
        companyListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.companyLi, addBtn, function (li) {
                li.companyListItem();
                section.trigger('resize-book');
            });
            searchForm.companySearchForm(function (data) {
                ul.companyList(data);
                section.trigger('resize-book');
            }).submit();
            return section;
        }
    });
    $(function () {
        var body = $(document.body);
        $('#company-list-section', body).companyListSection();
        $('#sub-nav', body).subNav('company');
    });
})(jQuery, window['l'], Handlebars);

