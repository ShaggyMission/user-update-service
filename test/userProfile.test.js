const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const sequelize = require('../config/database');
const User = require('../models/User');

jest.setTimeout(10000);

describe('PUT /users/profile/:id', () => {
  let user;
  let token;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    user = await User.create({
      firstName: 'Liss',
      lastName: 'Pacheco',
      email: 'lis@example.com',
      password: 'hashedpassword123',
      phone: '0999999999'
    });

    token = jwt.sign(
      { userId: user.id, email: user.email },
      'una_clave_secreta_segura', 
      { expiresIn: '1d' }
    );
  });

  it('should update user profile successfully', async () => {
    const res = await request(app)
      .put(`/users/profile/${user.id}`)
      .set('Cookie', [`token=${token}`])
      .send({
        firstName: 'Actualizado',
        phone: '0987654321'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User profile updated successfully');
    expect(res.body.user.firstName).toBe('Actualizado');
    expect(res.body.user.phone).toBe('0987654321');
  });

  it('should fail with invalid token', async () => {
    const res = await request(app)
      .put(`/users/profile/${user.id}`)
      .set('Cookie', [`token=invalidtoken`])
      .send({});

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Invalid or expired token.');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
