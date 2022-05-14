import { html, styleSheet } from '../../../core';

styleSheet`
.chat-thumnail {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
`

const ChatThumnail = () => {
  return html`
    <div class="chat-thumnail">
      <div class"chat-thumnail__title">
        <h1 class="title">Demo Firebase Chat Realtime</h1>
      </div>
      <div class"chat-thumnail__content">
        <img src="https://freepngimg.com/download/chat/159749-speech-chat-icon-hq-image-free.png" alt="" />
      </div>
    </div>
  `;
}

export default ChatThumnail;