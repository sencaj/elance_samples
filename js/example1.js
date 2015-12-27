$(function () {
    $('#selectable').selectable();
    $('#selectable li.ui-widget-content').click(function () {
        var ids = $('#selectable .ui-selected').map(function () {
            return $(this).data('answerid');
        });
        alert('answerid ' + ids.toArray().join(','));
    });
});