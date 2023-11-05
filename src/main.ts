import { ConnectToServer } from './socke-client';
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="chat-container">
  <div class="chat-header">
    <h2>Chat</h2>
    <input id="jwt-token" placeholder="Enter your JWT" class="jwt-input" />
    <button id="btn-connect">Connect</button>
    <span id="server-status" class="offline">OFFLINE</span>
  </div>
  <div class="chat-body">
    <div class="chat-messages" id="chat-messages">
      <ul id="messages-ul" class="messages-list"></ul>
    </div>
    <form id="message-form" class="message-form">
      <input type="text" id="message-input" placeholder="Type a message..." />
      <button type="submit" id="send-btn">Send</button>
    </form>
  </div>
</div>
`;


const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if (jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT');
  ConnectToServer(jwtToken.value.trim());
});

// The rest of your socket-client.ts logic remains the same
