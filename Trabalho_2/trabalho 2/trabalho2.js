var groups = [];
var messages = [];

var selectedGroup = "";

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
};

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function getGroups(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            groups = JSON.parse(this.responseText);
            makeUL(groups);
        }
    };
    xhttp.open('GET','http://rest.learncode.academy/api/'+window.localStorage.getItem("usuario")+'/groups',true);
    xhttp.send();
}

getGroups();

function clearMessages() {
    var list_m = document.getElementById('mensagem');
    list_m.innerHTML = "";
}

function getMessages(groupid) {
    messages = [];
    clearMessages();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            messages = JSON.parse(this.responseText);
            makeMsgs(messages);
        }
    };
    xhttp.open('GET', 'http://rest.learncode.academy/api/'+window.localStorage.getItem("usuario")+'/'+groupid, true);
    xhttp.send();
}


function makeUL(array) {
    var list = document.getElementById('amigosList');

    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        var link = document.createElement('a'); //esse é o elemento link
        var img = document.createElement('img');
        img.src = 'img.png';
        img.width = 30;
        img.height = 30;
        link.appendChild(img);
        link.className += " pointer";
        link.appendChild(document.createTextNode(' ' + array[i].groupName));
        link.onclick = (function () {
            var currentI = i;
            return function(){
                getMessages(array[currentI].groupID);
                selectedGroup = array[currentI].groupID;
                document.getElementById('nome-amigo').innerHTML = array[currentI].groupName;
            };
        })();
        item.appendChild(link);
        list.appendChild(item);
    }
    return list;
}


function makeMsgs(msg){
    var list_m = document.getElementById('mensagem');
    for (var j = 0; j < msg.length; j++) {
        var h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode(msg[j].userName));
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(msg[j].message));
        list_m.appendChild(h3);
        list_m.appendChild(p);
    }
}


function sendMsg() {
    var user = window.localStorage.getItem("usuario");
    var msg = document.getElementById("msg").value;

    var envio = {
        userName: user,
        message : msg
    };

    console.log(envio);
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://rest.learncode.academy/api/'+window.localStorage.getItem("usuario")+'/'+selectedGroup, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(envio));
    getMessages(selectedGroup);
}

function login(){
    var user = document.getElementById("user").value;
    window.localStorage.setItem("usuario", user);
    console.log(window.localStorage.getItem("usuario"));
    getGroups();
    getMessages();
}

function idficacao(nome){
    return nome.toLowerCase().replace(/ /g, "");
}

function createGroup() {
    var group = document.getElementById("newGrupo").value;

    var envio = {
        groupName: group,
        groupID : idficacao(group)
    };

    console.log(envio);
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://rest.learncode.academy/api/'+window.localStorage.getItem("usuario")+'/groups', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(envio));
    getGroups();
}

