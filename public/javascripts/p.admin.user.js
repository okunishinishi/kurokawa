/**
 * public script for user manage page
 *
 *  -- namespaces --
 *  $ : jQuery
 *  l : message resource
 *  hbs : handlebars
 *
 */
(function ($, l, hbs) {
    var tmpl = {
        li: hbs.templates['user-list-item']
    };
    $.fn.extend({
        userSearchForm: function (callback) {
            var form = $(this);
            form.searchForm(callback);
            return form;
        },
        userListItem: function () {
            return $(this)
                .destroyableListItem()
                .editableListItem('dblclick');
        },
        userList: function (data) {
            var ul = $(this);
            ul.htmlHandlebars(tmpl.li, data)
                .find('li')
                .userListItem()
                .each(function (i) {
                    var li = $(this);
                    li.data('user', data[i]);
                });
            return ul;

        },
        userListSection: function () {
            var section = $(this),
                addBtn = section.findByRole('add-btn'),
                ul = section.find('ul'),
                searchForm = section.findByRole('search-form');
            ul.appendableList(tmpl.li, addBtn, function (li) {
                li.userListItem();
                section.trigger('resize-book');
            });
            searchForm.userSearchForm(function (data) {
                ul.userList(data);
                section.trigger('resize-book');
            }).submit();
            return section;
        },
        userDetailForm: function (data) {
            var form = $(this).hide();
            if (!form.data('user-detail-form')) {
                var saveBtn = $('#user-detail-save-btn').hide(),
                    editBtn = $('#user-detail-edit-btn');
                form.detailForm('view', saveBtn, editBtn);
            }
            form.find(':text,textarea').hide();
            form.setFormValue(data);
            form.fadeIn();
            return form;
        },
        userDetailSection: function (data) {
            var section = $(this),
                form = $('#user-detail-form', section);
            form.userDetailForm(data);
            return section;
        }
    });

    $(function () {
        var doc = $(document),
            body = $(document.body);

        $('#user-list-section', body).userListSection();

        var userDetailSection = $('#user-detail-section', body);

        doc.on('click', '.user-list-item', function () {
            var li = $(this);
            li.addClass('selected')
                .siblings('.selected').removeClass('selected');
            userDetailSection.userDetailSection(li.data('user'));
        });

        $('#user-detail-form').hide();

        $('#sub-nav', body).subNav('admin');
    });
})(jQuery, window['l'], Handlebars);
