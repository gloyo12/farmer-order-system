"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerOrder = void 0;
const mongoose_1 = require("mongoose");
const farmerOrderSchema = new mongoose_1.Schema({
    farmerName: { type: String, required: true },
    landSize: { type: Number, required: true },
    totalAmount: { type: String, required: true },
    fertilizer: { type: String, required: false },
    seed: { type: String, required: false },
    fertilizerQuantity: { type: Number, required: false },
    seedQuantity: { type: Number, required: false },
    dateCreated: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});
exports.FarmerOrder = (0, mongoose_1.model)('FarmerOrder', farmerOrderSchema);
