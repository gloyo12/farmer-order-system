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
exports.deleteFertilizer = exports.getFertilizer = exports.createFertilizer = void 0;
const Fertilizer_1 = __importDefault(require("../models/Fertilizer"));
const createFertilizer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, compatibleSeeds, price } = req.body;
    const newFertilizer = new Fertilizer_1.default({ name, compatibleSeeds, price });
    try {
        const savedFertilizer = yield newFertilizer.save();
        res.status(201).json(savedFertilizer);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding fertilizer', error });
    }
});
exports.createFertilizer = createFertilizer;
const getFertilizer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fertilizers = yield Fertilizer_1.default.find();
        res.status(200).json(fertilizers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching fertilizers', error });
    }
});
exports.getFertilizer = getFertilizer;
const deleteFertilizer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Fertilizer_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Fertilizer deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting fertilizer', error });
    }
});
exports.deleteFertilizer = deleteFertilizer;
