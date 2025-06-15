const User = require('../models/User');

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({
      message: 'User profile updated successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
