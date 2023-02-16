import PostModel from "../Models/postModel.js";
import mongoose from 'mongoose'

// create new post

export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body)
    try {

    } catch (error) {

    }
}