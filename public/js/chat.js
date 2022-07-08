$(document).ready(function () {
    $("#myform").submit(function (e) {
        var formData = new FormData(this);
        $.ajax({
            url: "http://localhost:3000/datamessage",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: false,
            success: function (data, textStatus, jqXHR) {
            alert(data.message)
            $("input").val("")
            },
        });
        e.preventDefault();
    });
});