import { html } from '../../../core'

const SidebarContent = () => {
  return html`
    <div class="main-sidebar__content">
      <h4 class="title">Danh sách các phòng</h4>
      <ul class="rooms">
        <li>
          <a href="" class="room">Room 1</a>
        </li>
        <li>
          <a href="" class="room">Room 2</a>
        </li>
        <li>
          <a href="" class="room">Room 3</a>
        </li>
      </ul>
      <button type="button" class="btn btn-light btn-sm shadow-none">
        <svg width="20" height="20" t="1652506030194" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2703" width="200" height="200"><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" p-id="2704"></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" p-id="2705"></path></svg>
        <span>Thêm Phòng</span>
      </button>
    </div>
  `;
}

export default SidebarContent;
