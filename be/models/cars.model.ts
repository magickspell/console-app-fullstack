import mongoose, {Schema} from 'mongoose';

// here we create mongoose model - that thing is something like a data instance of one database record.
const carsSchemaFields = {
    id: Number,
    name: String,
    brand: String,
    year: Number,
    price: Number,
};

let carsSchema = new Schema(carsSchemaFields);
carsSchema.index({id: 1});
module.exports = mongoose.model('CarsModel', carsSchema);

// I've used function cause it less code than class.
// the same but via class, also can be accepted to other generating functions in app
/*
export default class CarsModel {
    _CarsModel: mongoose.Model<any, {}, {}, {}, any>;

    constructor() {
        const carsSchemaFields = {
            id: String,
            name: String,
            brand: String,
            year: Number,
            price: Number,
        };

        let carsSchema = new Schema(carsSchemaFields);
        carsSchema.index({id: 1});
        this._CarsModel = mongoose.model('CarsModel', carsSchema)
    }

    get CarsModel() {
        return this._CarsModel;
    }
}*/
