"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//admin user
const adminUser = {
    username: 'admin',
    password: bcryptjs_1.default.hashSync('password', 8)
};
const login = (req, res) => {
    const { username, password } = req.body;
    if (username === adminUser.username && bcryptjs_1.default.compareSync(password, adminUser.password)) {
        req.session.user = adminUser;
        res.status(200).json({ message: 'Login successful' });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
exports.login = login;
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};
exports.logout = logout;
