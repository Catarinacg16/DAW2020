//Image display on client browser
function showImage(name, type) {

    if (type == 'image/png' || type == 'image/jpeg')
        var file = '<img src="/fileStore/' + name + '" width="80%" />'
    else
        var file = '<p>' + name + ', ' + type + '</p>'

    var fileObj = $(`
        <div class= "w3-row w3-margin" >
            <div class="w3-col s6">
                ${file}
            </div>
            <div class="we-col s9 w3-border">
                <p>Filename:${name}</p>
                <p>Mimetype:${type}</p>
            </div>
        </div>
    `)
    var download = $('<div><a href="/files/download/' + name + '">Download</a></div>')

    $("#display").empty()
    $("#display").append(fileObj, download)
    $("#display").modal()
}



function addFile(){
    var file = $( '<div class="w3-row w3-margin-bottom">'+
                    '<div class="w3-col s3">'+
                        '<label class="w3-text-teal"><b>Description</b></label>'+
                    '</div>'+
                    '<div class="we-col s9 w3-border">'+
                        '<input class="w3-input w3-border w3-light-grey" type="text" name="desc"></input>'+
                    '</div>'+
                    '<div class="w3-row w3-margin-bottom">'+
                        '<div class="w3-col s3">'+
                            '<label class="w3-text-teal"><b>Select file</b></label>'+
                        '</div>'+
                        '<div class="we-col s9 w3-border">'+
                            '<input class="w3-input w3-border w3-light-grey" type="file" name="listFile"></input>'+
                        '</div>'+
                    '</div>'+
                    '</div>')

    $("#adiciona").append(file)

}
