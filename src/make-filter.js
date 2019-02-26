/**
 * Получить новый элемент фильтра
 * @param {string} caption    название
 * @param {number} amount     количество
 * @param {boolean} isChecked true если элемент выбран
 * @return {string} элемент фильтра
 */
export default (caption, amount, isChecked) => {
  const c = caption.toLowerCase();
  return `
  <input type="radio"
    id="filter-${c}"
    class="filter__input visually-hidden"
    name="filter"${isChecked ? ` checked` : ``}${amount === 0 ? ` disabled` : ``}/>
  <label for="filter-${c}" class="filter__label">
    ${caption}
    <span class="filter__all-count"> ${amount}</span>
  </label>`;
};
