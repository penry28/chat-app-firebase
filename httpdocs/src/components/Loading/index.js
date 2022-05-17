import { html, styleSheet } from "../../../core";

styleSheet`
.spinner-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
`;

const Loading = () => {
  return html`
    <div class="spinner-wrapper">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <span class="mt-2">Vui lòng đợi chút...</span>
    </div>
  `;
}

export default Loading;
