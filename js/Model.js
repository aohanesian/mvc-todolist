class Model {
    #key = null;

    constructor({ key }) {
        this.#key = key;
    }

    saveData(data) {
        if (!(data.id && data.title && data.description)) throw new Error('wrong data, it must have title, desc and id');

        const dbData = this.loadData();

        if (!dbData || !dbData.length) {
            localStorage.setItem(this.#key, JSON.stringify([data]));
            return data;
        }

        const existingIndex = dbData.findIndex(item => item.id === data.id);

        if (existingIndex !== -1) {
            dbData.splice(existingIndex, 1);
        } else {
            dbData.push(data);
        }

        localStorage.setItem(this.#key, JSON.stringify(dbData));
        return dbData;
    }

    loadData() {
        const dbData = JSON.parse(localStorage.getItem(this.#key));
        if (dbData && dbData.length) {
            return dbData;
        }

        return [];
    }
}