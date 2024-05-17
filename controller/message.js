const messageUsecase = require("../usecase/message");
const authUsecase = require("../usecase/auth");

exports.getMessages = async (req, res, next) => {
    try {
        const data = await messageUsecase.getMessages();

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createMessage = async (req, res, next) => {
    try {
        const sender_id = req.user.id;
        const { message } = req.body;

        if (!message || message == "") {
            return next({
                message: "Message must be provided!",
                statusCode: 400,
            });
        }

        const data = await messageUsecase.createMessage({
            message,
            user_id: sender_id,
        });

        // Emit event
        req.io.emit("message", message);

        res.status(201).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};
