/**
 * Получить новый элемент фильтра
 * @param {string} caption    название
 * @param {number} amount     количество
 * @param {boolean} isChecked true если элемент выбран
 * @return {string} элемент фильтра
 */
export default (caption, amount, isChecked) => {
  const lowerCaption = caption.toLowerCase();
  return `
  <input type="radio"
    id="filter-${lowerCaption}"
    class="filter__input visually-hidden"
    name="filter"${isChecked ? ` checked` : ``}${amount === 0 ? ` disabled` : ``}/>
  <label for="filter-${lowerCaption}" class="filter__label">
    ${caption}
    <span class="filter__all-count"> ${amount}</span>
  </label>`;
};
