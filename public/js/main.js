const ChatForm = document.getElementById('ChatForm')
const ChatMessages = document.getElementById('ChatMessages')
const RoomName = document.getElementById('RoomName')
const UsersList = document.getElementById('Users')

const {UserName, Room} = Qs.parse(location.search, {ignoreQueryPrefix: true});

const socket = io()

console.log(`UserName: ${UserName}, Room: ${Room}`)

socket.emit('JoinRoom', {UserName, Room})

socket.on('Message', Message =>{
    console.log(Message)
    OutputMessage(Message)
})

socket.on('RoomUsers', ({Room, Users}) => {
    OutputRoomName(Room)
    OutputUsers(Users)
})

ChatForm.addEventListener('submit', e => {
     e.preventDefault();

    let MSG = e.target.elements.MSG.value;

    MSG = MSG.trim()

    if (!MSG){return false}

    socket.emit('ChatMessage', MSG)

    e.target.elements.MSG.value = '';
    e.target.elements.MSG.focus();
})

function OutputMessage(Message){
    const div = document.createElement('div');
    div.classList.add('Message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = Message.UserName;
    p.innerHTML += `<span>${Message.Time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = Message.MSG;
    div.appendChild(para);
    ChatMessages.appendChild(div);
}

function OutputRoomName(Room){
    RoomName.innerText = Room
}

function OutputUsers(Users){
    UsersList.innerHTML = ''
    Users.forEach(User=>{
        const li = document.createElement('li');
        li.innerText = User.UserName;
        UsersList.appendChild(li);
    })
}