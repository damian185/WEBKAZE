const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'Email đã tồn tại' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed,
            phone,
            address
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Đăng ký thất bại' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email không tồn tại' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: 'Mật khẩu sai' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, name: user.name });
    } catch (err) {
        res.status(500).json({ message: 'Đăng nhập thất bại' });
    }
};
