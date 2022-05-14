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
  return values.reduce(
    // ["Toi ten la ", "Hung", " dang hoc ", "English", ""]
    (prev, curr) => prev.concat(curr, strings.shift()),
    [first]
  )
  .filter(x => x && x !== true || x === 0)
  .join('');
}
