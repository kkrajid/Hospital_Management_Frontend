import Stomp from 'webstomp-client';
class WebSocketInstance {
  constructor() {
    this.socket = null;
    this.callbacks = {
      message: null,
      userConnected: null,
      userDisconnected: null,
    };
  }

  connect(username, roomName) {
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/${roomName}/`);

    this.socket = Stomp.over(socket);
    this.socket.connect(
      {
        'heart-beat': '10000,10000',
        'accept-version': '1.2',
      },
      () => {
        this.socket.subscribe(`/chat/${roomName}/`, (message) => {
          if (message.body) {
            const messageData = JSON.parse(message.body);
            this.callbacks.message(messageData);
          }
        });

        // Additional subscriptions can be added here for user connected/disconnected events
      }
    );
  }

  disconnect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.disconnect();
    }
  }

  sendMessage(messageData) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send({
        destination: `/chat/${messageData.roomName}/`,
        body: JSON.stringify(messageData),
      });
    }
  }

  addCallbacks(messageCallback, userConnectedCallback, userDisconnectedCallback) {
    this.callbacks.message = messageCallback;
    this.callbacks.userConnected = userConnectedCallback;
    this.callbacks.userDisconnected = userDisconnectedCallback;
  }
}

const instance = new WebSocketInstance();
export default instance;

