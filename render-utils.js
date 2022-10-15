export function renderConversionOption(item) {
    const option = document.createElement('option');
    option.value = item.title;
    option.textContent = item.title;
    return option;
}

export function renderPost(post) {
    const li = document.createElement('li');

    const p = document.createElement('p');
    p.textContent = `For ${post.title} at ${post.weight} pounds...`;
    const p2 = document.createElement('p');
    // p2.textContent = `${post.title} is approximately ${x} ${post.conversion}`;
    const p3 = document.createElement('p');
    // p3.textContent = `A ${post.conversion} is approximately ${x2} ${post.title}s`;
    li.append(p, p2, p3);
    return li;
}
