import { FarmerOrder } from '../models/FarmerOrder'; // Import FarmerOrder using named import
import request from 'supertest';
import { app } from '../index'; // Importing `app` as a named export

describe('Order Endpoints', () => {
it('should create a new order', async () => {
const res = await request(app)
.post('/orders')
.send({
farmerName: 'John Doe',
landSize: 2,
fertilizer: 'lime',
seed: 'Maize'
});
expect(res.statusCode).toEqual(201);
expect(res.body).toHaveProperty('_id');
});

it('should fetch orders', async () => {
const res = await request(app).get('/orders');
expect(res.statusCode).toEqual(200);
expect(res.body).toHaveProperty('length');
});

it('should update the order status', async () => {
const orderId = 'some-valid-order-id';
const res = await request(app)
.put(`/orders/${orderId}`)
.send({
status: 'approved'
});
expect(res.statusCode).toEqual(200);
expect(res.body).toHaveProperty('status', 'approved');
});
});
