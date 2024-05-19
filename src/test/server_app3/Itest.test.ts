import { Account } from "../../app/server_app/model/AuthModel";
import { Reservation } from "../../app/server_app/model/ReservationModel";
import { HTTP_CODES, HTTP_METHODS } from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server";
import { makeAwesomeRequest } from "./utils/http-client";



describe('Server app integration tests', ()=> {

    let server: Server;

    beforeAll( async ()=> {
        server = new Server();
        await server.startServer();
    })

    afterAll(async () =>{
        await server.stopServer();
    })

    const someUser: Account = {
        id: '',
        userName: 'someUserName',
        password: 'somePassword'
    }

    const someReservation: Reservation = {
        id: '',
        endDate: 'someEndDate',
        startDate: 'someStartDate',
        room: 'someRoom',
        user: 'someUser'
    }

    it('Should register new user', async ()=> {
        const result = await fetch('http://localhost:8080/register', {
            method:HTTP_METHODS.POST,
            body: JSON.stringify(someUser)
        })
        const resultBody = await result.json();

        expect(result.status).toBe(HTTP_CODES.CREATED);
        expect(resultBody.userId).toBeDefined();
    })

    it('Should register new user with awesomeRequest', async ()=> {
        const result = await makeAwesomeRequest({
            host: 'localhost',
            port: 8080,
            method: HTTP_METHODS.POST,
            path: '/register'
        }, someUser)

        expect(result.statusCode).toBe(HTTP_CODES.CREATED);
        expect(result.body.userId).toBeDefined();
    })
    let token: string;
    it('Should login a registered user', async ()=> {
        const result = await fetch('http://localhost:8080/login', {
            method:HTTP_METHODS.POST,
            body: JSON.stringify(someUser)
        })
        const resultBody = await result.json();

        expect(result.status).toBe(HTTP_CODES.CREATED);
        expect(resultBody.token).toBeDefined();
        token = resultBody.token;
    })

    let createdReservationId: string;
    it('Should create a reservation if authorized', async ()=> {
        const result = await fetch('http://localhost:8080/reservation', {
            method:HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        })
        const resultBody = await result.json();

        expect(result.status).toBe(HTTP_CODES.CREATED);
        expect(resultBody.reservationId).toBeDefined();
        createdReservationId = resultBody.reservationId;
    })

    it('Should get reservation if authorized', async ()=> {
        const result = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method:HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        })
        const resultBody = await result.json();

        const expectedReservation = structuredClone(someReservation);
        expectedReservation.id = createdReservationId;

        expect(result.status).toBe(HTTP_CODES.OK);
        expect(resultBody).toEqual(expectedReservation);
    })

    it('Should create and retrieve multiple reservations if authorized', async ()=> {
        await fetch('http://localhost:8080/reservation', {
            method:HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        })
        await fetch('http://localhost:8080/reservation', {
            method:HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        })
        await fetch('http://localhost:8080/reservation', {
            method:HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        })

        const getAllResult = await fetch(`http://localhost:8080/reservation/all`, {
            method:HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        })


        const resultBody = await getAllResult.json();
        expect(resultBody).toHaveLength(4);
        expect(getAllResult.status).toBe(HTTP_CODES.OK);
    })

    it('Should update a reservation if authorized', async ()=> {
        const updateResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method:HTTP_METHODS.PUT,
            body: JSON.stringify({
                startDate: 'otherStartDate'
            }),
            headers: {
                authorization: token
            }
        })
        expect(updateResult.status).toBe(HTTP_CODES.OK);

        const getResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method:HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        })

        const getRequestBody: Reservation = await getResult.json();

        expect(getRequestBody.startDate).toBe('otherStartDate');
    })

    it('Should delete a reservation if authorized', async ()=> {
        const deleteResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method:HTTP_METHODS.DELETE,
            headers: {
                authorization: token
            }
        })
        expect(deleteResult.status).toBe(HTTP_CODES.OK);

        const getResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method:HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        })

        expect(getResult.status).toBe(HTTP_CODES.NOT_fOUND);
    })

})