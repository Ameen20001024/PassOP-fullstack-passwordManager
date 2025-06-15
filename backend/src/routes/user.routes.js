import { registerUser,
    loginUser,
    logoutuser,
    getCurrentUser,
    RefreshAccessToken
} from "../controllers/user.controllers.js";

import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/user-account").get(verifyJWT, getCurrentUser)
router.route("/refresh-token").post(RefreshAccessToken)
router.route("/logout").post(logoutuser)

export default router