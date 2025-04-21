/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from '../app/api/dataMessage/route';
import knex from '../../knex/knex'

describe('API TESTING', () => {
    beforeAll(() => 
        knex.migrate.rollback().then(() => knex.migrate.latest())
    );

    beforeEach(async () =>
        // Reset contents of the test database
        await knex.migrate.rollback().then(() => knex.migrate.latest()).then(() => knex.seed.run())
    );

    afterAll(() =>
        // Ensure database connection is cleaned up after all tests
        knex.destroy()
    );

    test('GET returns array of all Message Objects', async() => {
        const data = [
            {
                id: expect.any(Number),
                type: "ph",
                message: expect.any(String)
            },
            {
                id: expect.any(Number),
                type: "nutrition",
                message: expect.any(String)
            }
        ];
        await testApiHandler({ 
            appHandler,
            test: async ({ fetch }) => {
                const response = await fetch({method: 'GET'});
                const json = await response.json();
                await expect(json).toMatchObject(data);
            }
        })
    });

    test('PUT updates nutrition ', async () =>{
        const dataPoints = {
            type: "nutrition",
            message: "This string should be updated"
        }
        await testApiHandler({
            appHandler,
            test: async ({fetch})=> {
                const response = await fetch({
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({dataPoints})
                });
                const json = await response.json();
                //1 returns upon successful update completion
                expect(json).toBe(1);
            }
        })
    })


    test('PUT updates ph ', async () =>{
        const dataPoints = {
            id: expect.any(Number),
            type: "ph",
            message: "This string should be updated"
        }
        await testApiHandler({
            appHandler,
            test: async ({fetch})=> {
                const response = await fetch({
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({dataPoints})
                });
                const json = await response.json();
                //1 returns upon successful update completion
                expect(json).toBe(1);
            }
        })
    })
   
})