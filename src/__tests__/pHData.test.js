/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from '../app/api/pHData/route';
import knex from '../../knex/knex'

describe('API TESTING', () => {
    beforeAll(() => 
        knex.migrate.rollback().then(() => knex.migrate.latest())
    );

    beforeEach(() =>
        // Reset contents of the test database
        knex.migrate.rollback().then(() => knex.migrate.latest()).then(() => knex.seed.run())
    );

    afterAll(() =>
        // Ensure database connection is cleaned up after all tests
        knex.destroy()
    );

    test('GET with outdated dated data returns an empty array ', async() => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const response = await fetch({method: 'GET'});
                const json = await response.json();
                await expect(json).toMatchObject([]);
            }
        })
    });

    test('POST adds to the data', async () =>{
        const currentDate = new Date();
        const dataPoints = {
            date: currentDate.toISOString(),
            sensor: 'pH1',
            value: 1800,
        }
        await testApiHandler({
            appHandler,
            test: async ({fetch})=> {
                const response = await fetch({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({dataPoints})
                });
                const json = await response.json();
                expect(json.sensor).toBe(dataPoints.sensor);
                expect(json.value).toBe(dataPoints.value);
                expect(json.date).toBe(dataPoints.date);
                expect(json.id).toBeDefined();
            }
        })
    })

    test('GET with current-date data returns an array of that entry', async() => {
        //current date data should always be within the timeframe of the most recent sunday
        const currentDate = new Date();
        //add the new dataPoint
        const dataPoints = {
            date: currentDate.toISOString(),
            sensor: 'pH1',
            value: 1800,
        }
        await testApiHandler({
            appHandler,
            test: async ({fetch})=> {
                const response = await fetch({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({dataPoints})
                });
            }
        });

        //GET should now include the new dataPoint
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const response = await fetch({method: 'GET'});
                const json = await response.json();
                expect(json[0].sensor).toBe(dataPoints.sensor);
                expect(json[0].value).toBe(dataPoints.value);
                expect(new Date(json[0].date).toISOString().slice(0, -5)).toBe(dataPoints.date.slice(0, -5));
                expect(json[0].id).toBeDefined();
            }
        })
    });

    test('GET with "sorted" parameter should group sensors', async() => {
        //current date data should always be within the timeframe of the most recent sunday
        const currentDate = new Date();
        //add the new dataPoint
        const data = [
            {
                date: currentDate.toISOString().slice(0, -5),
                sensor: 'pH1',
                value: 1800,
            },
            {
                date: currentDate.toISOString().slice(0, -5),
                sensor: 'pH1',
                value: 2000,
            },
            {
                date: currentDate.toISOString().slice(0, -5),
                sensor: 'pH3',
                value: 2200,
            }
        ]

        const sortedData = [
            [
                {
                    id: expect.any(Number),
                    date: currentDate.toISOString().slice(0, -5),
                    sensor: 'pH1',
                    value: 1800,
                },
                {
                    id: expect.any(Number),
                    date: currentDate.toISOString().slice(0, -5),
                    sensor: 'pH1',
                    value: 2000,
                },
            ],
            [
                {
                    id: expect.any(Number),
                    date: currentDate.toISOString().slice(0, -5),
                    sensor: 'pH3',
                    value: 2200,
                }
            ]
        ]
        
        for (const dataPoints of data) {
            await testApiHandler({
                appHandler,
                test: async ({fetch})=> {
                    const response = await fetch({
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({dataPoints})
                    });
                }
            });
        }

        //GET should now include the new dataPoint
        await testApiHandler({
            appHandler,
            url: '/api/pHData?sorted=true',
            test: async ({ fetch }) => {
                const response = await fetch({method: 'GET'});
                const json = await response.json();
                expect(json).toMatchObject(sortedData);
            }
        })
    });
   
})