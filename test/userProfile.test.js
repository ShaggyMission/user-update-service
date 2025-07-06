const request = require('supertest');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('sqlite::memory:', { logging: false });

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
});

const authenticate = (req, res, next) => {
  const token = req.headers.cookie?.split('=')[1];
  if (!token) return res.status(401).json({ message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

app.put('/users/profile/:id', authenticate, async (req, res) => {
  const { firstName, phone } = req.body;
  const user = await User.findByPk(req.params.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  user.firstName = firstName;
  user.phone = phone;
  await user.save();

  res.json({ message: 'User profile updated successfully', user });
});

describe('PUT /users/profile/:id', () => {
  let user, token;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const hashed = await bcrypt.hash('password123', 10);
    user = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: hashed,
      phone: '0999999999'
    });

    token = jwt.sign(
      { userId: user.id, email: user.email },
      'secret_key',
      { expiresIn: '1d' }
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should update user profile successfully', async () => {
    const res = await request(app)
      .put(`/users/profile/${user.id}`)
      .set('Cookie', [`token=${token}`])
      .send({
        firstName: 'Updated',
        phone: '0987654321'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User profile updated successfully');
    expect(res.body.user.firstName).toBe('Updated');
    expect(res.body.user.phone).toBe('0987654321');
  });
});
