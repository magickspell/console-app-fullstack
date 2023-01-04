import app from "../index";
import supertest from 'supertest';
import {assert} from "chai";
import {before, after} from "mocha";
import {Express} from "express";

describe('cars service tests', () => {

    let server: null | Express = null;
    let temp: any = {};

    before(() => {
        server = app;
    });

    after(async () => {
        setTimeout(() => {
            process.exit();
        }, 1);
    });

    it('should return 500', (done) => {
        supertest(server)
            .get('/api/cars/list')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500, done);
    });

    it('should return array of cars', (done) => {
        supertest(server)
            .get('/api/cars/list?sort=id&limit=10')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                try {
                    if (err) throw err;
                    const data = res.body;
                    assert(data.length === 10, 'error with response data length');
                    return done();
                } catch (e) {
                    return done(e);
                }
            });
    });

    it('should create new car', (done) => {
        supertest(server)
            .post('/api/cars/create')
            .set('Accept', 'application/json')
            .send({name: 'name', brand: 'brand', year: 322, price: 42})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                try {
                    if (err) throw err;
                    const data = res.body;
                    temp.id = data[0].id;
                    assert(data[0].name === 'name', 'error with response data create');
                    return done();
                } catch (e) {
                    return done(e);
                }
            });
    });

    it('should update car', (done) => {
        supertest(server)
            .put('/api/cars/update')
            .set('Accept', 'application/json')
            .send({id: temp.id, name: 'nameUpdate', brand: 'brandUpdate', year: 42, price: 322})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                try {
                    if (err) throw err;
                    const data = res.body;
                    assert(data.acknowledged === true, 'error with response data update');
                    return done();
                } catch (e) {
                    return done(e);
                }
            });
    });

    it('should delete car', (done) => {
        supertest(server)
            .delete('/api/cars/delete')
            .set('Accept', 'application/json')
            .send({id: temp.id})
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                try {
                    if (err) throw err;
                    const data = res.body;
                    assert(data.acknowledged === true, 'error with response data delete');
                    return done();
                } catch (e) {
                    return done(e);
                }
            });
    });
})