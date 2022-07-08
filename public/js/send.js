$(document).ready(function () {
    $('#myform').submit(function(e){
        e.preventDefault();
        orang = document.getElementById("profile").textContent
        orang = orang.replace(/\s/g, '')
        var formData = new FormData(this);
        formData.append('link', orang)
        formData.append('form', 'message')
            $.ajax({
            url: 'https://Secretov2.piyoxz.repl.co/',
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
                if (data.status === "succes"){
                var form = document.getElementById("myform");
                form.remove()
                var succes = document.createElement("div")
                succes.className = "alert alert-success"
                succes.innerHTML = data.message
                document.getElementById("panel-body").appendChild(succes)
                var buttonnew = document.createElement("button")
                var buttonagain = document.createElement("button")
                buttonnew.className = "btn btn-primary"
                buttonnew.innerHTML = "Daftar Baru"
                buttonnew.onclick = function(){
                    window.location.href = "/"
                }
                buttonagain.className = "btn btn-primary"
                buttonagain.style.right = "-10px"
                buttonagain.innerHTML = "Kirim Ulang Pesan"
                buttonagain.onclick = function(){
                    window.location.href = "/" + data.link
                }
                document.getElementById("panel-body").appendChild(buttonnew)
                document.getElementById("panel-body").appendChild(buttonagain)
            }
            },
        })
    });
    $('#myform2').submit(function(e){
        e.preventDefault();
        orang = document.getElementById("profile").textContent
        orang = orang.replace(/\s/g, '')
        var formData = new FormData(this);
        formData.append('link', orang)
            $.ajax({
            url: 'https://Secretov2.piyoxz.repl.co/image',
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
                if (data.status === "succes"){
                var form2 = document.getElementById("myform2");
                form2.remove()
                var succes2 = document.createElement("div")
                succes2.className = "alert alert-success"
                succes2.innerHTML = data.message
                document.getElementById("panel-body2").appendChild(succes2)
                var buttonnew2 = document.createElement("button")
                var buttonagain2 = document.createElement("button")
                buttonnew2.className = "btn btn-primary"
                buttonnew2.innerHTML = "Daftar Baru"
                buttonnew2.onclick = function(){
                    window.location.href = "/"
                }
                buttonagain2.className = "btn btn-primary"
                buttonagain2.style.right = "-10px"
                buttonagain2.innerHTML = "Kirim Ulang Pesan"
                buttonagain2.onclick = function(){
                    window.location.href = "/" + data.link
                }
                document.getElementById("panel-body2").appendChild(buttonnew2)
                document.getElementById("panel-body2").appendChild(buttonagain2)
            }
            },
        })
    });
          $('#myform3').submit(function(e){
        e.preventDefault();
                    orang = document.getElementById("profile").textContent
        orang = orang.replace(/\s/g, '')
        var formData = new FormData(this);
        const random = Math.floor(Math.random() * 100000) + 1;
        formData.append('audio', globalThis.lagu , random+'.mp3')
        formData.append('link', orang)
         $.ajax({
            url: 'https://Secretov2.piyoxz.repl.co/audio',
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
              if (data.status === "succes"){
                var form3 = document.getElementById("myform3");
                form3.remove()
                var succes3 = document.createElement("div")
                succes3.className = "alert alert-success"
                succes3.innerHTML = data.message
                document.getElementById("panel-body3").appendChild(succes3)
                var buttonnew3 = document.createElement("button")
                var buttonagain3 = document.createElement("button")
                buttonnew3.className = "btn btn-primary"
                buttonnew3.innerHTML = "Daftar Baru"
                buttonnew3.onclick = function(){
                    window.location.href = "/"
                }
                buttonagain3.className = "btn btn-primary"
                buttonagain3.style.right = "-10px"
                buttonagain3.innerHTML = "Kirim Ulang Pesan"
                buttonagain3.onclick = function(){
                    window.location.href = "/" + data.link
                }
                document.getElementById("panel-body3").appendChild(buttonnew3)
                document.getElementById("panel-body3").appendChild(buttonagain3)
            }
            }
        })
});
})