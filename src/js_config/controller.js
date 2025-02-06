
$(document).ready(function () {
    var data_usuario = sessionStorage.getItem('idUsuario') ? sessionStorage.getItem('idUsuario') : 0;
    var token = sessionStorage.getItem('access_token');

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("Authorization", token);
            xhr.setRequestHeader("idUsuario", data_usuario);
        },
        complete: function (xhr, stat) {
            if (xhr.status == 403) {
                redirect_cierre_sesion(URL_LOGIN);
            }
        }
    });
});
