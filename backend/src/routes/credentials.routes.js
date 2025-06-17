import { saveAPassword,
    deletecredentialbyId,
    updatecredentialbyId,
    getAllpasswords
} from "../controllers/credentials.controllers.js";

import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router()

router.use(verifyJWT)

router.route("/").post(saveAPassword).get(getAllpasswords)
router.route("/delete/:password_id").delete(deletecredentialbyId)
router.route("/edit/:password_id").patch(updatecredentialbyId)

export default router