import BlogModel from "../models/blogModel.js";

export async function getAllBlogs(req, res) {
    try {
        const blogs = await BlogModel.find();
        res.json(blogs);
    } catch (error){
        res.status(500).json({message: error.message})
    }}

export async function getBlogByID(req, res) {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            res.status(404).json({message: "Blog not found"});
        }
        res.json(blog);
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

export async function createBlogPost(req, res) {
    try {
        const { title, content, author } = req.body;
        const newBlog = new BlogModel ({
            title,
            content,
            author,
            CreatedAt: new Date(),
            comments: [],
            likes: 0
        });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error){
        res.status(400).json({message: error.message})
    }
}

export async function likeBlogPost(req, res) {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            res.status(404).json({message: "Blog not found"});
        }
        blog.likes++;
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error){
        res.status(500).json({message: error.message})
    }}

export async function addBlogComment(req, res) {
    try {
        const { userId, content} = req.body;
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            res.status(404).json({message: "Blog not found"});
        }
        const newComment = {
            user: userId,
            content,
            likes: 0
        };
        blog.comments.push(newComment)
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error){
        res.status(500).json({message: error.message})
    }
}


export async function likeBlogComment(req, res) {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            res.status(404).json({message: "Blog not found"});
        }
        const commentIndex = parseInt(req.params.commentIndex);
        if (isNaN(commentIndex) || commentIndex < 0 || commentIndex >= blog.comments.length) {
            res.status(404).json({message: "Invalid comment Index"});
        }
        const comment = blog.comments[commentIndex];
        comment.likes++;
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

export async function deleteBlogPost(req, res) {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id);
        if (!blog) {
            res.status(404).json({message: "Blog not found"});
        }
        res.json(blog);
    } catch (error){
        res.status(500).json({message: error.message})
    }
}