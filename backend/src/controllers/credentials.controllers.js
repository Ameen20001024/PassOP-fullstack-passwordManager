import { User } from "../models/user.models";
import { ApiError } from "../utils/apierror";
import { ApiResponse } from "../utils/apiResponse";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";



const saveAPassword = asyncHandler(async (req, res) => {
    
    const {site_url, username, password} = req.body

    if ([site_url, username, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existinguserpassword = await Credential.findOne({site_url: site_url, owner: req.user?._id})

    if (!existinguserpassword) {
        throw new ApiError(400, "Credentials already exist for the user")
    }

    const savedcredential = await Credential.create({
        site_url: site_url,
        username: username,
        password: password,
        owner: req.user?._id
    }) 

    if (!savedcredential) {
        throw new ApiError(400, "Credential not saved")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, savedcredential, "Credentials saved successfully")
    )

})


const getAllpasswords = asyncHandler(async (req, res) => {
    
    const passwordArray = await Credential.find({owner: req.user?._id})

    if (!passwordArray) {
        throw new ApiError(400, "Failed to fetch saved password credentials")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, passwordArray, "Password credentials fetched successfully")
    )

})


const deletecredentialbyId = asyncHandler(async (req, res) => {
    
    const {password_id} = req. params

    try {
        await Credential.findByIdAndDelete(password_id)
    } catch (error) {
        throw new ApiError(400, "deletion failed")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,{}, "Credential deleted successfully")
    )

})



export {
    saveAPassword,
    deletecredentialbyId,
    getAllpasswords
}