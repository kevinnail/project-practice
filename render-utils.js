import { getItems } from './fetch-utils.js';

export function renderConversionOption(item) {
    const option = document.createElement('option');
    option.value = item.title;
    option.textContent = item.title;
    return option;
}

export function renderPost(post) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `/post/?id=${post.id}`;

    const p = document.createElement('p');
    p.textContent = `For ${post.title} at ${post.weight} pounds...`;
    const p2 = document.createElement('p');
    p2.textContent = post.result_1;
    const p3 = document.createElement('p');
    p3.textContent = post.result_2;
    a.append(p, p2, p3);
    // li.append(p, p2, p3);
    li.append(a);
    return li;
}

export function renderComment(comment, id) {
    const li = document.createElement('li');
    li.textContent = comment.text;
    const button = document.createElement('button');

    if (id === comment.user_id) {
        li.classList.add('user-class');
        button.textContent = 'delete';
        li.append(button);

        button.addEventListener('click', () => {
            console.log('firing');
        });
    }
    return li;
}
