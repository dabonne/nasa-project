const request = require('supertest')
const app = require('../../app')

describe('test Get /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).get('/launches')
            .expect(200)
            .expect('Content-Type', /json/);
    })
})

describe('test Post /launches', () => {

    const completeLaunchData = {
        mission: 'USS Entreprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2030'
    }

    const launchDataWithoutDate = {
        mission: 'USS Entreprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
    }

    const launchDataWithInvalidDate = {
        mission: 'USS Entreprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'Zoot'
    }

    test('It should respond with 201 success', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf()

        expect(responseDate).toBe(requestDate)

        expect(response.body).toMatchObject(launchDataWithoutDate);
    })

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)

            expect(response.body).toStrictEqual({
                error: 'Missing required launch property'
            });
    })

    test('It should catch invalid date', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date'
        });
    })
})