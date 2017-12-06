var isLogged = false;
var user_Logged = {};
var lista = [];

function cadastrar() {
    var email = $('#email-cadastro').val().toString();
    var senha = $('#senha-cadastro').val().toString();
    var usuario = {
        email: email,
        senha: senha
    };

    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/boax/loja',
        success: function(data){
            users = data;
            for(var i in users){
                if(users[i].email === usuario.email) {
                    alert("Email ja cadastrado!");
                    return;
                }
            }
            sendUser(usuario);
        },
        error: function(err){
            console.log(err);
            alert("ocorreu um erro!");

        }
    })
