// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { UserModel } from '../infrastructure/domain/model/User';
//
// export const googleStrategy = new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID as string,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     callbackURL: '/auth/google/callback',
// }, async (accessToken, refreshToken, profile, done) => {
//     const existingUser = await UserModel.findOne({ where: { googleId: profile.id } });
//
//     if (existingUser) {
//         return done(null, existingUser);
//     }
//
//     const newUser = await UserModel.create({
//         username: profile.displayName,
//         email: profile.emails?.[0].value,
//         googleId: profile.id,
//     });
//
//     return done(null, newUser);
// });
