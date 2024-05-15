const { message, user } = require("../../models");

exports.getMessages = async () => {
    const data = await message.findAll();
    return data;
};

exports.createMessage = async (payload) => {
    // Create data to postgres
    const data = await message.create(payload);

    return data;
};
