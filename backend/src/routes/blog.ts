import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const blogRouter= new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string,
	}
    Variables:{
        userId:string
    }
}>();
blogRouter.use('/*', async (c, next) => {
    const header=c.req.header('Authorization')||"";
    const token= header.split(" ")[1]
    const user = await verify(token,c.env.JWT_SECRET);
    if(user){
        c.set("userId",user.id)
       await next()
    }
    else{
      c.status(403);
      return c.json({error:"unauthorization"
      })
    }
  })
  
  blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
      try{
      const body= await c.req.json();
      const authorId=c.get("userId")
      const blog = await prisma.post.create({
        data:{
         title:body.title,
         content:body.content,
         authorId:authorId
        },
      });
      return c.json({
        id:blog.id
      })
    }
    catch(e){
        c.status(500);
      return c.json({error:"something went wrong",
      })
    }
  })

  blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
      try{
      const body= await c.req.json();
      const blog = await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
         title:body.title,
         content:body.content,
        },
      });
      return c.json({
        id:blog.id
      })
    }
    catch(e){

    }
  })
  blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
      try{
        console.log("Hello there")
      const id= await c.req.param("id")
      const blog = await prisma.post.findFirst({
        where:{
            id:id
        }
      });
      return c.json({
        blog
      })
    }
    catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog"
        })
    }
  })
  //Todo :add Pagination
  blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("outside of try");
      try{
      const blog = await prisma.post.findMany();
      console.log(blog+"here is the blogs");
      return c.json({
        blog
      })
    } 
    catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog"
        })
    }
  })