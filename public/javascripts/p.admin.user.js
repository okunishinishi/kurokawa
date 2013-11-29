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
                .editableListItem('dblclick')
                .on('edit-done', function (e, data) {
                    var li = $(this);
                    li.data('user', data);
                });
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

            data.email = data.email || '';
            data.team_id = data.team_id || '';

            form.setFormValue(data);

            $('.tk-editable-text', form).trigger('tk-editable-text-fix');
            form.fadeIn();


            $('#user-destroy-btn', form).click(function () {
                var btn = $(this);
                var id = form.findByName('_id').val(),
                    destroy = btn.data('destroy');
                $.confirmRemove({}, function () {
                    $.post(destroy, {_id: id}, function () {
                        location.reload();
                    });
                });
            });
            return form;
        },
        userDetailSection: function (data) {
            var section = $(this),
                form = $('#user-detail-form', section);
            form.userDetailForm(data);
            return section;
        },
        passwordChangeForm: function (callback) {
            var form = $(this);
            form.validatableAjaxForm(function (data) {
                if (data.valid) {
                    callback && callback();
                }
            });
            form.find('.close-btn').click(function () {
                callback && callback();
            });
            return form;
        }
    });

    $(function () {
        var doc = $(document),
            book = $('#book', body),
            body = $(document.body);

        $('#user-list-section', body).userListSection();

        var passwordChangeForm = $('#password-change-form', body)
            .insertAfter(book)
            .passwordChangeForm(function () {
                book.removeClass('covered-book');
                passwordChangeForm.hide();
            }).hide();
        $('#password_change-btn', body).click(function () {
            book
                .addClass('covered-book');
            passwordChangeForm
                .show()
                .css({
                    left: (book.outerWidth() - passwordChangeForm.outerWidth()) / 2 + 20
                })
                .find('[type="password"]')
                .first()
                .focus();
        })
        ;

        var userDetailSection = $('#user-detail-section', body);

        doc.on('click', '.user-list-item', function () {
            var li = $(this);
            if (li.is('.selected')) return;
            li.addClass('selected')
                .siblings('.selected').removeClass('selected');
            var data = li.data('user');
            userDetailSection.userDetailSection(data);
            passwordChangeForm.setFormValue(data);
        });

        $('#user-detail-form').hide();

        $('#sub-nav', body).subNav('admin');


    });
})(jQuery, window['l'], Handlebars);
