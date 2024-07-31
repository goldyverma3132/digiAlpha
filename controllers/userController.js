const User = require('../models/userModel');

exports.userRegister = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone
        } = req.body;

        const createUser = await
            User.create({
                firstName,
                lastName,
                email,
                phone
            });
        res.status(201).json({ message: 'User registered successfully', data: createUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById({ _id });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User fetched successfully', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const _id = req.params.id;

        const result = await User.updateOne(
            { _id },
            { $set: { firstName, lastName, email, phone } },
            { runValidators: true }
        );

        if (result.nModified === 0) return res.status(404).json({ message: 'User not found or no changes made' });

        const updatedUser = await User.findOne({ _id });
        res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const _id = req.params.id;

        const result = await User.deleteOne({ _id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const filters = req.query || {};
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        console.log('Filters:', filters);
        console.log('Page:', page);
        console.log('Limit:', limit);
        console.log('Skip:', skip);

        const users = await User.find({})
            .skip(skip)
            .limit(limit)
            .exec();

        console.log('Users:', users);

        const totalUsers = await User.countDocuments(filters);
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            message: 'Users fetched successfully',
            data: users,
            pagination: {
                totalUsers,
                totalPages,
                currentPage: page,
                perPage: limit
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

