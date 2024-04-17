import { Api } from './gitHub.js';
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    const entrie = localStorage.getItem('githubfavritos');
    this.entries = JSON.parse(entrie) || [];
  }
  delete(user) {
    const filterEntries = this.entries.filter((entry) => entry.id !== user.id);
    this.entries = filterEntries;
    this.localStorage();
    this.update();
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.tbody = this.root.querySelector('table tbody');
    this.update();
    this.onAdd();
  }

  onAdd() {
    const btn = this.root.querySelector('.btns');
    btn.addEventListener('click', () => {
      const usernameInput = this.root.querySelector('.githubsearch input');
      const username = usernameInput.value;
      this.add(username);
      usernameInput.value = '';
    });
  }

  async add(username) {
    try {
      const githubeuser = await Api.Search(username);
      const isUserInFavorites = this.entries.some(
        (user) => user.id === githubeuser.id,
      );
      if (isUserInFavorites) {
        throw new Error('Usuário já está entre os seus favoritos');
      }
      this.entries = [githubeuser, ...this.entries];

      this.localStorage();
      this.update();
    } catch (error) {
      alert(error.message);
    }
  }

  localStorage() {
    const obj = JSON.stringify(this.entries);
    localStorage.setItem('githubfavritos', obj);
  }

  update() {
    this.removeAlTr();
    this.CreateRow();
    this.entries.forEach((item) => {
      const row = this.CreateRow();
      row.querySelector(
        '.user img',
      ).src = `https://github.com/${item.login}.png`;
      row.querySelector('.user a').href = `https://github.com/${item.login}`;
      row.querySelector('.user p').textContent = item.login;
      row.querySelector('.user span').textContent = item.name;
      row.querySelector('.repositories').textContent = item.public_repos;
      row.querySelector('.follens').textContent = item.followers;
      this.tbody.append(row);

      const removeButton = row.querySelector('.remove');
      removeButton.addEventListener('click', (event) => {
        event.preventDefault();
        const confirmacao = confirm(
          'Tem certeza que deseja deletar essa linha?',
        );
        if (confirmacao) {
          this.delete(item);
        }
      });
    });
  }

  removeAlTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove();
    });
  }

  CreateRow() {
    const tr = document.createElement('tr');
    tr.innerHTML = `
                    <td class="user">
                        <img src="https://github.com/GabrielErick1.png" alt="gabriel">
                        <a href="https://github.com/GabrielErick1" target="_blank">
                            <p>gabriel erick</p>
                            <span>gabriel</span>
                        </a>
                    </td>
                    <td class="repositories"></td>
                    <td class="follens"></td>
                    <td>
                        <button class="remove">&times;</button>
                    </td>
    
        `;
    return tr;
  }
}
