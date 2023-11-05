import { Manager, Socket } from "socket.io-client";
let socket: Socket;
export const ConnectToServer = (token: string) => {

    const manager = new Manager('http://161.132.55.27:3001/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    })
    socket?.removeAllListeners();
    socket = manager.socket('/');
    addListeners();
}
const addListeners = () => {
    const serverSatus = document.querySelector('#server-status')!;
    const clientUl = document.querySelector('#clients-ul')!;
    const messageform = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageinput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagetUl = document.querySelector('#messages-ul')!;
    socket.on('connect', () => {
        serverSatus.innerHTML = 'online';
    })
    socket.on('disconnect', () => {
        serverSatus.innerHTML = 'offline';
    })
    socket.on('clients-updated', (clients: string[]) => {
        let clientHtml = '';
        clients.forEach(client => {
            clientHtml += `<li>${client}</li>`
        });
        clientUl.innerHTML = clientHtml;
    });
    messageform.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageinput.value.trim().length <= 0) return;
        socket.emit('message-client', { id: 'asd', message: messageinput.value });
        messageinput.value = '';
    })
    socket.on('message-server', (payload: { fullName: string, message: string }) => {
        const newMessage = `
        <li>
            <strong>${payload.fullName}</strong>
            <span>${payload.message}</span>
        </li>`
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagetUl.append(li);
    });
    //emit mandar datos
    // on escuchar al servidor
}