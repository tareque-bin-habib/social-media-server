import PostModel from "../Models/postModel.js";
import mongoose from 'mongoose'

// create new post

export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body)
    try {
        await newPost.save()
        res.status(200).json("Post Created")
    } catch (error) {
        res.status(500).json(error)
    }
}

// get a post
export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update a post
export const updatePost = async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body

    try {
        const post = await PostModel.findById(postId)

        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("Post updated")
        }
        else {
            res.status(403).json("Action forbidden")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body

    try {
        const post = await PostModel.findById(id)

        if (post.userId === userId) {
            await post.deleteOne()
            res.status(200).json("Post Deleted successfully")
        }
        else {
            res.status(403).json("Action forbidden")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

// Like and Dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body

    try {

        const post = await PostModel.findById(id)

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Post liked")
        }
        else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("Post unliked")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}