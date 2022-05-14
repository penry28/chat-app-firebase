export default function styleSheet([first, ...strings], ...values) {
  const styles = values.reduce(
    (prev, curr) => prev.concat(curr, strings.shift()),
    [first]
  ).join(' ');

  const styleTag = document.createElement('style');
  styleTag.appendChild(document.createTextNode(styles));
  document.head.appendChild(styleTag);
}
