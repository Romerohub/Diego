export class CRUD{
#tableName = null;
#data = null;

constructor(tableName = undefined){
    this.#setTableName(tableName);
    this.#setData();
}

#setTableName (tableName){
    this.#tableNameValidate(tableName);
    this.tableName = tableName;
}

#setData(){
    let dataRepository = this.#get(this.#tableName);
    this.#data = dataRepository === null ? []: dataRepository;
}

#tableNameValidate(tableName){
    if(tableName === undefined) throw new
    Error("Nombre tabla requerida");
}

#save(){
    let dataToSave = JSON.stringify(this.#data);
    sessionStorage.setItem(this.#tableName, dataToSave);
}

#get(key){
    let data = sessionStorage.getItem(key);
    return JSON.parse(data);
}

#existElementWithId(id){
    return this.#data[id] === undefined ? false : true;
}
#checkThatElementExistWithId(id){
    if (!this.#existElementWithId(id))
        throw new Error("El elemento no existe");
}
    create(data){
        this.#data.push(data);
        this.#save();
        return this.#data.length;
    }

    read(id){
        this.#checkThatElementExistWithId(id);
        return this.#data[id];
    }

    readAll(){
        return this.#data;
    }

    update(id, data){
        this.#checkThatElementExistWithId(id);
        this.#data[id] = data;
        this.#save();
        return true;
    }

    delete(id){
        this.#checkThatElementExistWithId(id);
        this.#data.splice(id, 1);
        this.#save();
        return true;
    }
}