const renderList = (list = []) => {
  const p = document.createElement('p');
  p.innerText = 'You are nothing added still';

  if (list && list.length) {
    const ul = document.createElement('ul');
    p.setAttribute('class', 'center');

    list
      .forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('js-link');
        a.setAttribute('data-id', item.id);
        a.setAttribute('href', '#');
        a.innerText = item.name;
        li.appendChild(a);
        ul.appendChild(li);
      });
    return ul;
  }

  return p;
};

export default renderList;
