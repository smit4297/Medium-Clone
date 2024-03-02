import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {signUpInput, signInInput} from "@69.code.dev/medium-common"
import { decode, sign, verify } from 'hono/jwt'
// import * as bcrypt from 'bcrypt'



export const userRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string;
      JWT_SECRET : string;
    }
  }>();

userRouter.post('/signup', async (c) => {
    try {
      const body = await c.req.json();
      // Parse request body and validate against schema
      const parsedData = signUpInput.safeParse(body);
      if (!parsedData.success) {
        c.status(400)
        return c.json({ msg: "Invalid payload" });
      }
      const { email, password } = parsedData.data;
      // Initialize PrismaClient
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      // Create user
      const user = await prisma.user.create({
        data: {
          email: email,
          password: password // Hash password if necessary
        }
      });
  
      // Generate JWT token
      const payload = { id: user.id };
      const token = await sign(payload, c.env.JWT_SECRET);
      // Return success response with token
      return c.json({
        msg: "User created successfully",
        token: token
      });
    } catch (e) {
        console.error("Error while signup:", e);
        c.status(403);
            return c.json({ error: "error while signing up" });
    }
  });
  
  
  userRouter.post('/signin',async (c) => {
    try {
      const body = await c.req.json();
      // Parse request body and validate against schema
      const parsedData = signInInput.safeParse(body);
      if (!parsedData.success) {
        c.status(400)
        return c.json({ msg: "Invalid payload" });
      }
      const { email, password } = parsedData.data;
  
      // Initialize PrismaClient
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const user = await prisma.user.findUnique({
        where: {
          email: email,
          password: password
        }
      })
      if(!user){
        return c.json({msg: "incorrect email/password."})
      }
      console.log(user);
      // Generate JWT token
      const payload = { id: user.id };
      const token = await sign(payload, c.env.JWT_SECRET);
      // Return success response with token
      return c.json({
        msg: "User signed in successfully",
        token: token
      });
    } catch (e) {
        console.error("Error while signup:", e);
        c.status(403);
            return c.json({ error: "error while signing up" });
    }
  })