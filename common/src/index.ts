import {z} from "zod"

export const signUpInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string()
  })

export type SignUpInput = z.infer<typeof signUpInput>

export const signInInput = z.object({
    email : z.string().email(),
    password : z.string().min(6)
  })

export type SignInInput = z.infer<typeof signInInput>

export const blogPostInput = z.object({
    title : z.string(),
    content : z.string()
})

export type BlogPostInput = z.infer<typeof blogPostInput>

export const blogPutInput = z.object({
    id : z.string(),
    title : z.string(),
    content : z.string()
})

export type BlogPutInput = z.infer<typeof blogPutInput>