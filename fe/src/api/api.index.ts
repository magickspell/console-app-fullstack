const URL = 'http://localhost:3001/api';

// this is something like axios api instance, but using fetch. this works with backend api.
export const apiInstance = {

    getCarsList: async (command: string) => {
        const qArr = command.split(' ')
        const sort = qArr[1] ? qArr[1] : 'id';
        const limit = qArr[2] ? qArr[2] : '10';
        const skip = qArr[3] ? qArr[3] : '0';
        const result: JSON = await fetch(`${URL}/cars/list?limit=${limit}&skip=${skip}&sort=${sort}`)
            .then((res) => res.json()).catch((e: any) => {
                console.warn(e);
                e.json();
            });
        return result;
    },

    createCar: async (command: string) => {
        const qArr = command.split(' ');
        const name = qArr[1] ? qArr[1] : '...';
        const brand = qArr[2] ? qArr[2] : '...';
        const year = qArr[3] ? qArr[3] : 0;
        const price = qArr[4] ? qArr[4] : 0;
        const result: JSON = await fetch(`${URL}/cars/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                brand: brand,
                year: Number(year),
                price: Number(price),
            })
        }).then((res) => res.json()).catch((e: any) => {
            console.warn(e);
            e.json();
        });
        return result;
    },

    updateCar: async (command: string) => {
        const qArr = command.split(' ');
        const id = qArr[1] ? qArr[1] : '...';
        const name = qArr[2] ? qArr[2] : '...';
        const brand = qArr[3] ? qArr[3] : '...';
        const year = qArr[4] ? qArr[4] : 0;
        const price = qArr[5] ? qArr[5] : 0;
        const result: JSON = await fetch(`${URL}/cars/update`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(id),
                name: name,
                brand: brand,
                year: Number(year),
                price: Number(price),
            })
        }).then((res) => res.json()).catch((e: any) => {
            console.warn(e);
            e.json();
        });
        return result;
    },

    deleteCar: async (command: string) => {
        const qArr = command.split(' ');
        const id = qArr[1] ? qArr[1] : null;
        const result: JSON = await fetch(`${URL}/cars/delete`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Number(id),
            })
        }).then((res) => res.json()).catch((e: any) => {
            console.warn(e);
            e.json();
        });
        return result;
    },
}