export function renderConversionOption(item) {
    const option = document.createElement('option');
    option.value = item.title;
    option.textContent = item.title;
    return option;
}
