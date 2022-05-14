import SvgIcon from '../components/SvgIcon';

window.SvgIcon = SvgIcon;

const requireAll = requireContext => requireContext.keys().map(requireContext);
  const requireContextIcons = require.context('./svg', false, /\.svg$/);
  requireAll(requireContextIcons);

const icons = requireContextIcons.keys()
.map(file =>
  [file.replace(/(^.\/)|(\.svg$)/g, ''), requireContextIcons(file)]
)
.reduce((components, [name, context]) => {
  components[name] = context.default;
  return components;
}, {});

window.fetchSvg = (name) => icons[name];