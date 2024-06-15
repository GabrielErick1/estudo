export class database {
    #database = {};

    insert(tabela, data){
        if(Array.isArray(this.#database[tabela])){
            this.#database[tabela].push(data);
        }  else  {
            this.#database[tabela] = [data];
           
        }
        return data
    }

    select(table){
        const data = this.#database[table] ?? [];
        return data
    }
}