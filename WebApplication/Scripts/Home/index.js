/**
* 指定されたファイルをアップロードします。
* @param    {FileList}  files   アップロードするファイルリスト
*/
var upload = function (files) {
    var i, formData;

    // アップロード用のデータを生成
    formData = new FormData();
    for (i = files.length; i--;) {
        formData.append('files', files[i]);
    }

    // ファイルアップロードの実行
    $.ajax({
        url: '/api/file?overwrite=true',
        method: 'POST',
        processData: false,
        contentType: false,
        data: formData
    }).done(function (data, textStatus, jqXHR) {
        $('#msg').append(JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#msg').append(textStatus);
    });
};

/**
* 指定されたファイルを画面に表示する。
* @param    {FileList}  files   読み取るファイルリスト
*/
var read = function (files) {
    var fragment, i, item;
    
    fragment = document.createDocumentFragment();

    for (i = files.length; i--;) {
        item = document.createElement('div');
        item.appendChild(document.createTextNode(files[i].name));
        fragment.appendChild(item);
    }

    $('#msg').append(fragment);
};

/**
* dragover イベント が発生したとき呼び出されます。
* @param    {Event}     event   イベントオブジェクト
*/
var body_ondragover = function (event) {
    event.preventDefault();
    $('#msg').text('ondragover');
};

/**
* drop イベント が発生したとき呼び出されます。
* @param    {Event}     event   イベントオブジェクト
*/
var body_ondrop = function (event) {
    var i, files, fragment, item;

    $('#msg').text('ondrop');

    files = event.originalEvent.dataTransfer.files || [];

    read(files);
    upload(files);
};

/**
* ドキュメント生成が完了したとき呼び出されます。
*/
var document_onready = function (event) {
    $(window.document.body).on(
        'dragover', body_ondragover
    ).on(
        'drop', body_ondrop
    );
};

$(document).ready(document_onready);
