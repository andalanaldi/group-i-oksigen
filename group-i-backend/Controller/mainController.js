const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const redis = require('../redis');

const prisma = new PrismaClient();

// const getUserEvents = async (userId) => {
//   return prisma.event.findMany({
//     where: {
//       attendees: {
//         some: {
//           userId: userId,
//         },
//       },
//     },
//   });
// };

  const registerUser = async (
    organization_name, 
    organization_email, 
    pic_firstname, 
    pic_lastname, 
    pic_role_institution, 
    password, 
    isPremium) => {
    const hashedPassword = await bcryptjs.hash(password, 10);
    return prisma.user.create({
      data: {
        organization_name,
        organization_email,
        pic_firstname,
        pic_lastname,
        pic_role_institution,
        password: hashedPassword,
        isPremium
      },
    });
  };

const loginUser = async (req, res, organization_email, password) => {
  let user = await prisma.user.findUnique({ where: { organization_email } });
  if (!user) {
    throw new Error('Invalid organization email or password');
  }

  let isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    res.locals.loginFailed = true;
    console.log('Login failed:', res.locals.loginFailed);
    throw new Error('Invalid organization email or password');
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set');
  }

  const accessToken = jwt.sign({ id: user.id, role: user.pic_role_institution }, jwtSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id, role: user.pic_role_institution }, jwtSecret, { expiresIn: '7d' });

  return {
    message: 'Login successful, you are now signed in to hirupX - the dashboard app that shows you pollution index along with respiratory infection cases',
    accessToken,
    refreshToken,
    accessTokenExpiresIn: '15m',
    refreshTokenExpiresIn: '7d',
  };
};


// const getEventsWithAttendeesAndPayrolls = async () => {
//   // ... (rest of the code)
// };

// const updateEvent = async (eventId, data) => {
//   // ... (rest of the code)
// };

// const createEvent = async (
//   name,
//   attendeeEmails,
//   attendeeHourlyRates,
//   duration,
//   startTime,
//   endTime,
//   userId
// ) => {
//   // ... (rest of the code)
// };

const requestPasswordReset = async (organization_email) => {
  const user = await prisma.user.findUnique({ where: { organization_email } });
  if (!user) {
    throw new Error('User not found');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT secret is not set');
  }

  const token = jwt.sign({ id: user.id, email: user.organization_email }, secret, { expiresIn: '1h' });

  return token;
};

module.exports = {
  loginUser,
  registerUser,
  requestPasswordReset,
//   prisma,
//   getUserEvents,
//   getEventsWithAttendeesAndPayrolls,
//   updateEvent,
//   createEvent,
};
