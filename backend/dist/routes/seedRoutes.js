"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seedController_1 = require("../controllers/seedController");
const router = (0, express_1.Router)();
router.post('/', seedController_1.createSeed);
router.get('/', seedController_1.getSeed);
router.delete('/:id', seedController_1.deleteSeed);
exports.default = router;
