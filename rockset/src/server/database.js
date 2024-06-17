import fs from 'node:fs/promises';
const databasePath = new URL('../database/database.json', import.meta.url);
export class database {
    #database = {};
    #persista (){
        fs.writeFile(databasePath, JSON.stringify(this.#database))

    }

    constructor(){
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(err => {
            this.#persista()
        })
    }
    insert(tabela, data){
        if(Array.isArray(this.#database[tabela])){
            this.#database[tabela].push(data);
        }  else  {
            this.#database[tabela] = [data];
           
        }
        this.#persista();
        return data
    }

    select(table){
        const data = this.#database[table] ?? [];
        return data
    }
    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row =>  row.id === id)
        if(rowIndex > -1){
            this.#database[table][rowIndex] = {...this.#database[table][rowIndex],...data}
            this.#persista()
            return
        }
        return this.#database[table][rowIndex]
    }
   delete(tabela, id){
       const rowIndex = this.#database[tabela].findIndex(row =>  row.id === id)
       console.log(id);
       if(rowIndex > -1){
        this.#database[tabela].splice(rowIndex, 1)
         this.#persista()
       }
    }
}