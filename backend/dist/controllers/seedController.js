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
exports.deleteSeed = exports.getSeed = exports.createSeed = void 0;
const Seed_1 = __importDefault(require("../models/Seed"));
const createSeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = req.body;
    const newSeed = new Seed_1.default({ name, price });
    try {
        const savedSeed = yield newSeed.save();
        res.status(201).json(savedSeed);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding seed', error });
    }
});
exports.createSeed = createSeed;
const getSeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seeds = yield Seed_1.default.find();
        res.status(200).json(seeds);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching seeds', error });
    }
});
exports.getSeed = getSeed;
const deleteSeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Seed_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Seed deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting seed', error });
    }
});
exports.deleteSeed = deleteSeed;
