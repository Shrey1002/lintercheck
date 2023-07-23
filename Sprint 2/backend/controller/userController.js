const User = require('../models/users');

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                results: "User not found",
                status: 'Failed',
                data: req.body,
            })
        }
        res.status(200).json({
            success: true,
            status: 'success',
            results: req.params._id,
            data: { myUser: user },
        })
    } catch (error) {
        res.status(406).json({
            success: false,
            status: 'fail',
            message: error
        })
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json({
            success: true,
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            status: 'fail',
            message: error,
        });
    }
};


const updateUser = async (req, res) => {
    try {
        const allowedUpdates = ["name", "password", "company", "phone"];
        const updates = Object.keys(req.body);
        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidUpdate) {
            return res.status(400).json({
                success: false,
                status: "fail",
                message: "Invalid updates received",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                status: "fail",
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            status: "success",
            data: {
                user: updatedUser,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: "fail",
            message: error,
        });
    }

};

module.exports = {getUser, getUserById, updateUser};