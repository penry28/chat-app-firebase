import { html, styleSheet } from '../../../core'

styleSheet`
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-wrap-icon {
  display: inline-block;
}
`

const SvgIcon = ({ iconClass, className }) => {


  return html`
    <span class='svg-wrap-icon ${className}'>
      <img class='svg-icon' src="${fetchSvg(iconClass)}" alt="" />
    </span>
  `;
}

export default SvgIcon;
