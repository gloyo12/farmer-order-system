"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Importing `app` as a named export
describe('Order Endpoints', () => {
    it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .post('/orders')
            .send({
            farmerName: 'John Doe',
            landSize: 2,
            fertilizer: 'lime',
            seed: 'Maize'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
    }));
    it('should fetch orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get('/orders');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('length');
    }));
    it('should update the order status', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderId = 'some-valid-order-id';
        const res = yield (0, supertest_1.default)(index_1.app)
            .put(`/orders/${orderId}`)
            .send({
            status: 'approved'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'approved');
    }));
});
