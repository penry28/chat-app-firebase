import { html, styleSheet } from '../../../core'
import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import './styles.scss';

styleSheet`
.author-link {
  bottom: 40px;
  left: 10px;
}
`

const Sidebar = () => {
  return html`
    <div class="main-sidebar position-relative">
      ${SidebarHeader()}
      ${SidebarContent()}
      <div class="author-link position-absolute">
        <a href="https://www.facebook.com/it.phamdinhhung/" target="_blank" class="d-flex align-items-center justify-content-center" style="width: 25px; height: 25px; background-color: #fff; border-radius: 3px;">
          <svg width="15" height="15" t="1652767854396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1952" width="200" height="200"><path d="M546.986667 1024H56.490667A56.533333 56.533333 0 0 1 0 967.466667V56.533333C0 25.301333 25.301333 0 56.533333 0h910.933334C998.698667 0 1024 25.301333 1024 56.533333v910.933334c0 31.232-25.301333 56.533333-56.533333 56.533333H706.56v-396.544h133.12l19.882667-154.538667H706.56V374.186667c0-44.714667 12.373333-75.221333 76.586667-75.221334h81.834666v-138.24c-14.165333-1.92-62.72-6.101333-119.253333-6.101333-118.016 0-198.784 72.021333-198.784 204.288v113.92H413.525333v154.581333h133.418667V1024z" fill="#3B5998" p-id="1953"></path></svg>
        </a>
      </div>
    </div>
  `;
}

export default Sidebar;
