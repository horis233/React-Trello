export default function findCheckBoxesInTitle(title) {
  const checkBoxes = title.match(/\[(\s|x)\]/g) || [];
  const checked = checkBoxes.filter(checkbox => checkbox === "[x]").length;
  return { total: checkBoxes.length, checked };
}
