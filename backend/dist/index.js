"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const fertilizerRoutes_1 = __importDefault(require("./routes/fertilizerRoutes"));
const seedRoutes_1 = __importDefault(require("./routes/seedRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.use((0, express_session_1.default)({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use true if using HTTPS
}));
// Routes
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/fertilizers', fertilizerRoutes_1.default);
app.use('/api/seeds', seedRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farmerOrderingSystem')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
