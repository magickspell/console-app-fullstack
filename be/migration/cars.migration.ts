import {carsT} from "../types/cars.namespace";

const CarsModel = require('../models/cars.model');

const Brands = ['Bugatti', 'Lada', 'BMW', 'Mercedes', 'Opel']

// this is migration, which can fill database if its empty and pass by if database already exists.
export const MigrateCars = async () => {
    let cars: carsT[] = []
    let step = 1;
    while (step <= 42) {
        let id: number, name: string, brand: string;
        id = Number(step);
        brand = Brands[Math.floor(Math.random() * 5)];
        name = brand + '-' + (Math.random() + 1).toString(36).substring(7);
        cars.push({
            id: id,
            name: name,
            brand: brand,
            year: Math.floor(Math.random() * 120) + 1900,
            price: Math.floor(Math.random() * 999999) + 100,
        })
        step++;
    }
    const data = await CarsModel.find().lean().catch((e: any) => {
        console.log('[error]: migrate fails')
        throw new Error(e);
    })
    if (data.length === 0) {
        CarsModel.insertMany([...cars]).catch((e: any) => {
            console.log(`[error]: ${e}`)
        }).then(() => console.log('[ok]: migration success, db created'))
    } else {
        console.log('[ok]: migration success, db already full')
    }
}