//Node Server File

const io=require('socket.io')(8000,{ cors:{origin: '*',}});
const users={};

io.on('connection',(socket)=>{
    socket.on('new-member-joined',(name2)=>{
        users[socket.id] = name2;
        socket.broadcast.emit('user-joined',name2); //if a new user joins the chat then every member will be notified about it
    })

    socket.on('send',(message)=>{
        socket.broadcast.emit('receive', {message:message,name:users[socket.id]});
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
}) 