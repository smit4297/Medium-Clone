import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {z} from 'zod'
import { decode, sign, verify } from 'hono/jwt'
// import * as bcrypt from 'bcrypt'

const schema = z.object({
  email : z.string(),
  password : z.string()
})

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string;
    SECRET_KEY: string;
  }
}>()

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', async (c) => {
  console.log( c.env.SECRET_KEY)
  try {
    const body = await c.req.json();
    // Parse request body and validate against schema
    const parsedData = schema.safeParse(body);
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
    const payload = { email: email };
    const token = await sign(payload, c.env.SECRET_KEY);
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


app.post('/api/v1/user/signin',async (c) => {
  try {
    const body = await c.req.json();
    // Parse request body and validate against schema
    const parsedData = schema.safeParse(body);
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
    const payload = { email: email };
    const token = await sign(payload, c.env.SECRET_KEY);
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

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

export default app
