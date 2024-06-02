"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const seedSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
});
const Seed = (0, mongoose_1.model)('Seed', seedSchema);
exports.default = Seed;
