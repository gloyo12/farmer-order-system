"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fertilizerController_1 = require("../controllers/fertilizerController");
const router = (0, express_1.Router)();
router.post('/', fertilizerController_1.createFertilizer);
router.get('/', fertilizerController_1.getFertilizer);
router.delete('/:id', fertilizerController_1.deleteFertilizer);
exports.default = router;
