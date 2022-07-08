$(document).ready(function () {
    $("#myform").submit(function (e) {
        var formURL = 'https://Secretov2.piyoxz.repl.co/datauser';
        var formData = new FormData(this);
        $.ajax({
            url: formURL,
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function () {
                $("button").attr("disabled", "disabled");
                $("input").attr("disabled", "disabled");
                $("a").attr("disabled", "disabled");
                $("#loading").html(
                    '<i class="fas fa-spinner fa-spin"></i> Loading...'
                );
            },
            success: function (data, textStatus, jqXHR) {
            if (data.status) {
                //delete form
                $("#myform").remove();
                //create card link to dashboard
                $("#loading").html(
                    '<i class="fas fa-check"></i> Success'
                );
                window.location.href = '/'
            } else {
                alert(data.message);
                $("#myform").show();
                $("#loading").html("");
                $("button").removeAttr("disabled");
                $("input").removeAttr("disabled");
                $("a").removeAttr("disabled");
            }
            },
        });
        e.preventDefault();
    });
});