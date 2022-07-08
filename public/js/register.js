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
                let text;
                if (data.message ==  "User was registered successfully!") {
                    Swal.fire({
  icon: 'success',
  title: 'Succes Register',
  showConfirmButton: true,
  timer: 2000
}).then(function() {
    window.location = "/login";
});
                } else {
                    $("button").removeAttr("disabled", "disabled");
                    $("a").removeAttr("disabled", "disabled");
                    $("input").removeAttr("disabled", "disabled");
                    $("#loading").html("Login");
                    alert(data);
                    $('#password[name="password"]').val(
                        ""
                    );
                }
            },
        });
        e.preventDefault();
    });
});