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
exports.updateOrderStatus = exports.getOrders = exports.createOrder = void 0;
const FarmerOrder_1 = require("../models/FarmerOrder");
const Fertilizer_1 = __importDefault(require("../models/Fertilizer"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { farmerName, landSize, fertilizer, seed, fertilizerQuantity, seedQuantity, totalAmount } = req.body;
    if (!fertilizer && !seed) {
        return res.status(400).json({ message: 'At least one of fertilizer or seed must be provided' });
    }
    if (fertilizer && fertilizerQuantity > landSize * 3) {
        return res.status(400).json({ message: 'Fertilizer quantity exceeds limit based on land size' });
    }
    if (seed && seedQuantity > landSize * 1) {
        return res.status(400).json({ message: 'Seed quantity exceeds limit based on land size' });
    }
    if (fertilizer && seed) {
        const fertilizerDoc = yield Fertilizer_1.default.findOne({ name: fertilizer });
        if (!fertilizerDoc || !fertilizerDoc.compatibleSeeds.includes(seed)) {
            return res.status(400).json({ message: 'Selected fertilizer is not compatible with selected seed' });
        }
    }
    try {
        const newOrder = new FarmerOrder_1.FarmerOrder({ farmerName, landSize, fertilizer, seed, fertilizerQuantity, seedQuantity, totalAmount });
        yield newOrder.save();
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const orders = yield FarmerOrder_1.FarmerOrder.find()
            .sort({ farmerName: 1 })
            .skip(skip)
            .limit(limit);
        const totalOrders = yield FarmerOrder_1.FarmerOrder.countDocuments();
        const totalPages = Math.ceil(totalOrders / limit);
        res.status(200).json({
            orders,
            totalPages,
            currentPage: page
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getOrders = getOrders;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }
    try {
        const order = yield FarmerOrder_1.FarmerOrder.findByIdAndUpdate(id, { status }, { new: true });
        if (!order)
            return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateOrderStatus = updateOrderStatus;
