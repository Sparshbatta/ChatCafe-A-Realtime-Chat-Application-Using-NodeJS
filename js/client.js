const socket = io('http://localhost:8000')

const form = document.getElementById('send-form');
const messageInput = document.getElementById('textMessage');
const messageContainer = document.querySelector('.container');
const audio = new Audio('../media/ding.mp3');



const append = (message,side)=>{
    const chatElement = document.createElement('div');
    chatElement.innerHTML = message;
    chatElement.classList.add('message');
    chatElement.classList.add(side);
    messageContainer.append(chatElement);

    if(side=='left')
    {
        const tryToPlay = setInterval(() => {
            const audio = new Audio('../media/ding.mp3');
        
            audio.play()
                .then(() => {
                    clearInterval(tryToPlay);
                })
                .catch(error => {
                    console.info('User has not interacted with document yet.');
                });
        }, 2000);
        
    }
}

var name2 = prompt("Enter your name to join");
console.log(name2);
if(name2 === '' || name2===null)
{
    name2='Anonymous';
}

socket.emit('new-member-joined',name2);

form.addEventListener('submit',(e)=>{
    e.preventDefault(); //page will not reload on applying this
    const msg = messageInput.value;
    append(`<b>You:</b> ${msg}`,'right');
    socket.emit('send',msg);
    messageInput.value='';
})

socket.on('user-joined', (name)=>{
    append(`<b>${name}</b> joined the chat`,'left');
})

socket.on('receive', (data)=>{
    append(`<b>${data.name}:</b>${data.message}`,'left');
})

socket.on('left', (user)=>{
    append(`${user} left the chat`,'left');
})

