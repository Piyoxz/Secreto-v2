$(document).ready(function () {
$('#myform').submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    let data = []
    let data2 = []
    for (var pair of formData.entries())
    {
     data.push(pair[1])
    }
    if (data[1].name === ""){
        formData.delete('gambar')
        for(var pail of formData.entries()){
            data2.push(pail[1])
        }
    }
    if (data2.length === 2) {
        $.ajax({
        url: 'http://localhost:3000/postimage',
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
            Swal.fire({
                title: 'Success',
                text: 'Your post has been uploaded',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(function() {
                window.location = "/post";
            });
        },
    })
    } else if (data2.length === 0) {
        $.ajax({
            url: 'http://localhost:3000/postimage',
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
                Swal.fire({
                    title: 'Success',
                    text: 'Your post has been uploaded',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(function() {
                    window.location = "/post";
                });
            },
        })
    } else if(data2.length === 1) {
        $.ajax({
            url: 'http://localhost:3000/post',
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
                Swal.fire({
                    title: 'Success',
                    text: 'Your post has been uploaded',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(function() {
                    window.location = "/post";
                });
            },
        })
    }
});
});