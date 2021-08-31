var socket = io.connect('http://192.168.1.39:6677',{'forceNew':true});
var colors = ['red','yellow','green','blue','pink','purple','grey','brown','orange'];

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message, index){
        return(`
            <strong>${message.nickname}</strong>
            <div class='message' style='border:3px solid ${message.color}'>
                <span>${message.text}</span>
            </div>
        `);
    }).join(' ');

    var divMessages = document.getElementById("messages");
    divMessages.innerHTML = html;
    divMessages.scrollTop = divMessages.scrollHeight;
}

function addMessage(){
    var randColor = Math.floor(Math.random() * 9); 
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,
        color: colors[randColor]
    };
    if(message.nickname == ""){
        message.nickname = "Anonimo";
    }

    document.getElementById('nickname').display = "none";
    socket.emit('add-message', message);
}
