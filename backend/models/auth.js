const bcrypt = require('bcryptjs');
const dynamoDb = require('../config/db');

const TABLE_NAME = 'Users';

const User = {
  async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const params = {
      TableName: TABLE_NAME,
      Item: {
        email,
        username,
        password: hashedPassword,
      },
    };
    await dynamoDb.put(params).promise();
  },

  async findUserByEmail(email) {
    const params = {
      TableName: TABLE_NAME,
      Key: { email },
    };
    const result = await dynamoDb.get(params).promise();
    return result.Item;
  },
};

module.exports = User;
