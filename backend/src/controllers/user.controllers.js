import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";


const generateaccessandrefreshtokens = async (userId) => {
    try {
        
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(400, "User not found")
        }

        const accesstoken = user.generateaccesstoken()

        if (!accesstoken) {
            throw new ApiError(400, "accesstoken not generated")
        }

        const refreshtoken = user.generaterefreshtoken()

        if (!refreshtoken) {
            throw new ApiError(400, "refreshtoken not generated")
        }

        user.refreshtoken = refreshtoken

        await user.save({validateBeforeSave: false})

        return {accesstoken, refreshtoken}
        

    } catch (error) {
        throw new ApiError(500, "refreshtoken and accesstoken could not be generated")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    // get user details from front end
    // validation - not empty
    // check if user already exists
    // check for files (avatar, coverImage)
    // Upload to cloudinary
    // create user object
    // remove password and refreshtoken from response
    // check user creation
    // return response

    const { fullname, username, email, password } = req.body


    if(
        [ fullname, username, email, password ].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are compulsory")
    }


    const existeduser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existeduser){
        throw new ApiError(400, "user already exists")
    }

    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password
    })

    const createduser = await User.findById(user._id).select(" -password -refreshtoken ")

    if (!createduser) {
        throw new ApiError(500, "Something went worng; user not regiestered")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(201, createduser, "User registered successfully")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    // get data from frontend
    // validate (empty)
    // find user
    // password check
    // access and refresh token
    // send cookie

    const { username, password } = req.body

    if (!username) {
        throw new ApiError(400, "Username required for sign in")
    }

    if (!password) {
        throw new ApiError(400, "password required")
    }

    const user = await User.findOne({username: username})

    if (!user) {
        throw new ApiError(401, "user not found")
    }

    const ispasswordvalid = await user.isPasswordcorrect(password)

    if (!ispasswordvalid) {
        throw new ApiError(400, "Invalid credentials")
    }

    const {accesstoken, refreshtoken} = await generateaccessandrefreshtokens(user._id)

    const loggedinUser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    if (!loggedinUser) {
        throw new ApiError(500, "login wasn't successful")
    }

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    return res
    .status(200)
    .cookie("accesstoken", accesstoken, options)
    .cookie("refreshtoken", refreshtoken, options)
    .json(
        new ApiResponse(201, loggedinUser, "Logged in successfully")
    )
})


const logoutuser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, 
        {
        $unset: {refreshtoken : 1}
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }

    return res
    .status(200)
    .clearCookie("refreshtoken", options)
    .clearCookie("accesstoken", options)
    .json(
        new ApiResponse(200, {}, "Logged out successfully")
    )
})


const RefreshAccessToken = asyncHandler(async (req, res) => {
    const incomingrefreshtoken = req.cookies.refreshtoken

    if (!incomingrefreshtoken) {
        throw new ApiError(400, "unautherised request")
    }

    try {

        const decodedToken = jwt.verify(
            incomingrefreshtoken,
            process.env.REFRESHTOKENSECRET
        )

        const user = await User.findById(decodedToken._id)
    
        if (!user) {
            throw new ApiError(400, "invalid refresh token")
        }
    
        if (incomingrefreshtoken !== user.refreshtoken) {
            throw new ApiError(400, "invalid refresh token")
        }
    
        const {accesstoken, refreshtoken} = await generateaccessandrefreshtokens(user._id)
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(200)
        .cookie("refreshtoken", refreshtoken, options)
        .cookie("accesstoken", accesstoken, options)
        .json(
            new ApiResponse(200, {accesstoken, refreshtoken}, "Access token refreshed")
        )       
    } catch (error) {
        throw new ApiError(400, error?.message || "invalid refreshtoken")
    }

})


const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "User fetched")
    )
})




export {
    registerUser,
    loginUser,
    logoutuser,
    getCurrentUser,
    RefreshAccessToken
}