const toCurrency = price => new Intl.NumberFormat('ru-RU', {
  currency: 'rub',
  style: 'currency',
}).format(price);

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent);
});

const $card = document.querySelector('#card');

if ($card) {
  $card.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id;

      fetch(`/card/delete/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(card => {
          if (card.courses.length) {
            const html = card.courses.map(({ title, count, id }) => `
              <tr>
                <td>${title}</td>
                <td>${count}</td>
                <td>
                  <button class="btn btn-small js-remove" data-id="${id}">Delete</button>
                </td>
              </tr>
            `).join('');

            $card.querySelector('tbody').innerHTML = html;
            $card.querySelector('.price') = toCurrency(card.price);
          } else {
            $card.innerHTML = '<p>Card is empty</p>'
          }
        })
    }
  })
}
