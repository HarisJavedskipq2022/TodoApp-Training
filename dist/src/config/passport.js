"use strict";
// import passport from 'passport';
// import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
// import 'dotenv/config';
// import { PrismaClient } from '@prisma/client';
// import { User } from '../domain/entity/UserEntity';
// const prisma = new PrismaClient();
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID as string,
//       clientSecret: process.env.CLIENT_SECRET as string,
//       callbackURL: process.env.CALLBACK_URL as string,
//     },
//     async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
//       try {
//         const user = await prisma.user.findUnique({ where: { googleId: profile.id } });
//         if (!user) {
//           await prisma.user.create({ data: { googleId: profile.id } });
//         }
//         done(null, profile);
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );
// //passport deserialization
// passport.serializeUser<any, any>((user: User, done: any) => {
//     done(null, user);
// });
// passport.deserializeUser<any, any>((user: User, done: any) => {
//   done(null, user);
// });
