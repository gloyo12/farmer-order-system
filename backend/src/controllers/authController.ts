import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import session from 'express-session';

interface SessionData {
    user?: any; 
  }

//admin user
const adminUser = {
username: 'admin',
password: bcrypt.hashSync('password', 8)
};

export const login = (req: Request, res: Response) => {
const { username, password } = req.body;

if (username === adminUser.username && bcrypt.compareSync(password, adminUser.password)) {
(req.session as SessionData).user = adminUser;
res.status(200).json({ message: 'Login successful' });
} else {
res.status(401).json({ message: 'Invalid credentials' });
}
};

export const logout = (req: Request, res: Response) => {
req.session.destroy((err) => {
if (err) {
return res.status(500).json({ message: 'Logout failed' });
}
res.status(200).json({ message: 'Logout successful' });
});
};
