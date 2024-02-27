const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Order = require('../models/order');
const { sendVerificationMail } = require('../util/sendVerificationMail');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password");
        return res.send(users);
    } catch (error) {
        res.status(500).send("Unable to get all users");
    }
};

const register = async (req, res) => {
    try {
        console.log(req.body);
        const userTemp = await User.findOne({ email: req.body.email });
        if (userTemp) {
            return res.status(400).send("Email already exists");
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = await User({ ...req.body, password: hashedPass, emailToken: crypto.randomBytes(64).toString("hex") });
        const result = await user.save();
        sendVerificationMail(user);

        if (!result) {
            return res.status(500).send("Unable to register user 1");
        }
        console.log(user);
        return res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("Incorrect credentials");
        }
        const verifyPass = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!verifyPass) {
            return res.status(400).send("Incorrect credentials");
        }

        if (user.isVerified == false) {
            return res.status(400).send("Email not verified");
        }

        const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage, role: user.role, isVerified: user?.isVerified, mobile: user.mobile, city: user.city, address: user.address },
            process.env.JWT_TOKEN,
            {
                expiresIn: "2 days",
            }
        );
        return res.status(201).send({ msg: "User logged in successfully", token });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const verifyEmail = async (req, res) => {
    try {
        console.log(req.body);
        const emailToken = req.body.emailToken;
        if (!emailToken) return res.status(404).send("Email Token not found...");

        const user = await User.findOne({ emailToken });

        if (user) {
            user.emailToken = null;
            user.isVerified = true;

            await user.save();

            const token = jwt.sign(
                { _id: user._id, name: user.name, email: user.email, profileImage: user.profileImage, role: user.role, isVerified: user?.isVerified, mobile: user.mobile, city: user.city, address: user.address },
                process.env.JWT_TOKEN,
                {
                    expiresIn: "2 days",
                }
            );

            res.status(200).send(token);

        } else res.status(404).send("Email verification failed, invalid token !");
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}


const updateUser = async (req, res) => {
    try {
        console.log(req.body);

        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            res.send("No such user exist");
        }
        console.log(user);
        user.email = req.body.email;
        user.name = req.body.name;
        user.profileImage = req.body.profileImage;
        user.mobile = req.body.mobile;
        user.address = req.body.address;
        user.city = req.body.city;
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPass;
        await user.save();
        console.log(user);
        res.status(201).send("User Updated");
    } catch (error) {
        res.send(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params._id);
        if (!user) {
            return res.status(400).json({ msg: "User not found!" });
        }
        res.json({ msg: "User deleted Successfully" });

    } catch (error) {
        res.send(error);
    }
}

const getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
            .populate({
                path: 'services',
                select: ['name', 'images']
            })
            .populate({
                path: 'testimonials',
                populate: {
                    path: 'customer',
                    select: ['name', 'profileImage']
                }
            });

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        res.send(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const rateAndReviewUser = async (req, res) => {
    try {
        const { review } = req.body;
        const { rating } = req.body;
        const { user } = req.body;

        const serviceProvider = await User.findById(req.params.id);

        if (!serviceProvider) {
            return res.status(404).json({ error: "User not found." });
        }

        if (!review) {
            return res.status(400).json({ error: "Review is required." });
        }

        if (!rating) {
            return res.status(400).json({ error: "Rating is required." });
        }

        serviceProvider.testimonials.push({
            customer: user,
            rating: rating,
            review: review,
            order: req.body.order,
        });
        await serviceProvider.save();

        const order = await Order.findById(req.body.order);
        order.disableReview = true;
        await order.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nishantraut90@gmail.com",
                pass: process.env.EMAIL_PASS,
            },
        })

        const customer = await User.findById(user);

        const mailOptions = {
            from: '"Gharseva Admin" <nishantraut90@gmail.com>',
            to: serviceProvider.email,
            subject: "New Testimonial 😄",
            html: `<p>Hello ${serviceProvider.name},</p> <br/>
            <span>You have got new testimonial for your work by customer: ${customer.name}</span> <br/>
            <span>Please Login to your account and go to Profile section to view the details.</span>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email Sent to all Service Providers");
            }
        });

        res.status(201).json({ message: "Rating and Review added successfully." });

    } catch (error) {
        console.log(error);
        res.send(error);
    }
}


module.exports = { register, login, getAllUsers, updateUser, deleteUser, getUser, rateAndReviewUser, verifyEmail };