/**
 * public script for admin master page
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  Hbs : handlebars
 *
 */
(function ($, l, hbs) {
    var tmpl = {
        teamLi: hbs.templates['team-list-item']
    };
    $.fn.extend({
        teamSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        teamListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        teamList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.teamLi, data)
                .find('li')
                .teamListItem();
            return ul;
        },
        teamListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.teamLi, addBtn, function (li) {
                li.teamListItem();
                section.trigger('resize-book');
            });
            searchForm.teamSearchForm(function (data) {
                ul.teamList(data);
                section.trigger('resize-book');
            }).submit();
            return section;
        }
    });

    $(function () {
        var doc = $(document),
            body = $(document.body);

        $('#team-list-section', body).teamListSection();

        $('#sub-nav', body).subNav('admin');


        doc.on('click', '.master-select-list-item', function () {
            var li = $(this);
            li.addClass('selected')
                .siblings('.selected').removeClass('selected');
        });

        $('#master-select-list').find('li').first().click();

    });
})(jQuery, window['l'], Handlebars);
