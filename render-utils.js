export function renderConversionOption(item) {
    console.log('stuff: ', item);
    const option = document.createElement('option');
    option.value = item.title;
    option.textContent = item.title;
    return option;
}
