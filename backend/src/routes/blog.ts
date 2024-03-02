import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { BlogPutInput, BlogPostInput, blogPutInput, blogPostInput} from "@69.code.dev/medium-common"
import { decode, verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string;
      JWT_SECRET : string;
    },
    Variables : {
        userId : string
    }
  }>();

blogRouter.use("/*", async (c, next) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    c.set('userId', payload.id);
    await next(); // Ensure you're awaiting next() here
});


blogRouter.get('/get/:id',async (c) => {
    try{

        const id = c.req.param("id");

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());

        const blog = await prisma.post.findFirst({
            where :{
                id : id
            }    
        })

        return c.json({
            blog
        })
        
    }catch(e){
        console.log("error" + e);
        c.status(500);
        return c.json({
            msg: "Internal server error"
        })
    }
})
  
//TODO : add pagination
blogRouter.get('/bulk',async (c) => {
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());

        const blogs = await prisma.post.findMany()
        return c.json({
            blogs
        })
        
    }catch(e){
        console.log("error" + e);
        c.status(500);
        return c.json({
            msg: "Internal server error"
        })
    }
})
  
blogRouter.put('/',async (c) => {
    try{

        const body = await c.req.json();
        const parsedData = blogPutInput.safeParse(body);

        if(!parsedData.success){
            c.status(411);
            return c.json({
                msg : "incorrect payload"
            })
        }

        const {id, title, content} = parsedData.data;

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());

        const blog = await prisma.post.update({
            where :{
                id : id
            },
            data : {
                title : title,
                content : content,
            }
        })

        return c.json({
            id : blog.id,
            msg : "blog post updated successfully"
        })
        
    }catch(e){
        console.log("error" + e);
        c.status(500);
        return c.json({
            msg: "Internal server error"
        })
    }
})
  
blogRouter.post('/', async (c) => {
    try{
        const body = await c.req.json();
        const parsedData = blogPostInput.safeParse(body);

        if(!parsedData.success){
            c.status(411);
            return c.json({
                msg : "incorrect payload"
            })
        }

        const {title, content} = parsedData.data;

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());

        
        const blog = await prisma.post.create({
            data : {
                title : title,
                content : content,
                // authorId : c.get("userId")
                authorId : "6494c600-f07f-4f8f-b001-ce3f115bdfab"

            }
        })

        return c.json({
            id : blog.id,
            msg : "blog post created successfully"
        })
        
    }catch(e){
        console.log("error" + e);
        c.status(500);
        return c.json({
            msg: "Internal server error"
        })
    }
})