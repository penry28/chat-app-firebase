import { camelToSnakeCase } from "./utils";

export default function html([first, ...strings], ...values) {
  // console.log(first);
  // console.log(strings);
  /**
   * first: la array chua nhung du lieu khong phai la bien
   * 1->n: Tung tien trong gia tri
   *
   * first: Toi ten la
   * strings = [" dang hoc ", ""];
   * values = ["Hung", "English"];
   */
  let _dom_html_ = values.reduce(
    // ["Toi ten la ", "Hung", " dang hoc ", "English", ""]
    (prev, curr) => prev.concat(curr, strings.shift()),
    [first]
  )
  .filter(x => x && x !== true || x === 0);

  _dom_html_ = _dom_html_.map((x, index) => {
    if (typeof x === 'function') {
      const ranFunc = x();
      if (
        typeof ranFunc === 'object'
        && !['function', 'object'].includes(typeof _dom_html_[index - 1])
        && _dom_html_[index - 1].includes('style')
      ) {
        let _arrObj = [];
        for (const [key, value] of Object.entries(ranFunc)) {
          _arrObj.push(`${camelToSnakeCase(key)}: ${value}`);
        }
        return _arrObj.join('; ');
      }
    }
    return x;
  });
  // Filter content out code
  // _dom_html_ = _dom_html_.filter(x => {
  //   let codeCMO = x.split("//>")
  //   // let hasCMO = x.includes('<//');
  //   if(codeCMO.length) {
  //     console.log(codeCMO);
  //   }
  //   // if (codeCMO.length > 1) {
  //   //   console.log(codeCMO);
  //   // }
  //   return true;
  // });
  return _dom_html_.join('');
}
