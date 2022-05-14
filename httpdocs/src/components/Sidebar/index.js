import { html } from '../../../core'
import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import './styles.scss';

const Sidebar = () => {
  return html`
    <div class="main-sidebar">
      ${SidebarHeader()}
      ${SidebarContent()}
    </div>
  `;
}

export default Sidebar;
