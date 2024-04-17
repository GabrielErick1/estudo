export class Api {
    constructor() {
        this.baseUrl = 'https://api.github.com';
    }

    static Search(username) {
        return new Api().fetch(username);
    }

    async fetch(username) {
        const response = await fetch(`${this.baseUrl}/users/${username}`);
        if (!response.ok) {
            throw new Error('Usuário não localizado');
        }
        const { id, login, name, public_repos, followers } = await response.json();
        return { id, login, name, public_repos, followers };
    }
}
