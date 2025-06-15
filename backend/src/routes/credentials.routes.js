import { saveAPassword,
    deletecredentialbyId,
    getAllpasswords
} from "../controllers/credentials.controllers";

import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";


const router = Router()

router.use(verifyJWT)

router.route("/").post(saveAPassword).get(getAllpasswords)
router.route("/delete/:password_id").delete(deletecredentialbyId)