$(document).ready(function () {
    $("#myform").submit(function (e) {
        var formObj = $(this);
        var formURL = formObj.attr("action");
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
                if (data.text.includes("Not")){
                    $("button").removeAttr("disabled", "disabled");
                    $("a").removeAttr("disabled", "disabled");
                    $("input").removeAttr("disabled", "disabled");
                    $("#loading").html("Login");
                    Swal.fire({
                        icon: 'error',                                 
title: "Login", 
html: data.text,  
confirmButtonText: "Ulangi", 
});
                    $('#username[name="username"]').val(
                        ""
                    );
                    $('#password[name="password"]').val(
                        ""
                    );
                } else if (data.text == "Inccorect Password") {
                    $("button").removeAttr("disabled", "disabled");
                    $("a").removeAttr("disabled", "disabled");
                    $("input").removeAttr("disabled", "disabled");
                    $("#loading").html("Login");
                    Swal.fire({
                        icon: 'error',                                 
title: "Login", 
html: data.text,  
confirmButtonText: "Ulangi", 
});
$('#password[name="password"]').val(
""
);
                } else if (data.text == "succes") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Succes Login',
                        showConfirmButton: true,
                        timer: 2000
                      }).then(function() {
                          location.replace(data.url)
                      });
                }
            },
        });
        e.preventDefault();
    });
});