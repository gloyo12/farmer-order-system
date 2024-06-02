"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fertilizerSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    compatibleSeeds: { type: [String], required: true },
});
const Fertilizer = (0, mongoose_1.model)('Fertilizer', fertilizerSchema);
exports.default = Fertilizer;
