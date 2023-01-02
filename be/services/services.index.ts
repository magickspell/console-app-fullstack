import {Request, Response} from 'express';

const CarsModel = require('../models/cars.model');

// this is service functions for routs (it could be in router, but I think SRP realization is better).
export async function getList(
    req: Request,
    res: Response
) {
    if (['name', 'price', 'year', 'brand', 'id'].indexOf(String(req.query.sort)) === -1) {
        res.status(500).json('wrong command')
    } else {
        try {
            CarsModel.find({}, null, {
                    sort: req.query.sort,
                    limit: req.query.limit,
                    skip: req.query.skip,
                }
            ).lean().then((response: any) => {
                res.status(200).json(response)
            })
        } catch (e: any) {
            res.status(500).json(`critical server error: ${e.message}`)
        }
    }
}

export async function postCar(
    req: Request,
    res: Response
) {
    try {
        const latest = await CarsModel.find().sort({_id: -1}).limit(1)
            .lean().then((res: any) => {
                return res;
            });
        CarsModel.insertMany([{
                id: Number(latest[0].id + 1),
                name: req.body.name,
                brand: req.body.brand,
                year: req.body.year,
                price: req.body.price,
            }]
        ).then((response: any) => {
            res.status(200).json(response)
        });
    } catch (e: any) {
        res.status(500).json(`critical server error: ${e.message}`);
    }
}

export async function updateCar(
    req: Request,
    res: Response
) {
    try {
        CarsModel.updateOne({id: req.body.id}, {
                name: req.body.name,
                brand: req.body.brand,
                year: req.body.year,
                price: req.body.price,
            }
        ).lean().then((response: any) => {
            res.status(200).json(response)
        });
    } catch (e: any) {
        res.status(500).json(`critical server error: ${e.message}`);
    }
}