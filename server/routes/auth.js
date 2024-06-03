
import express from "express";
import { login, logout, newUser,} from "../controller/auth.js";
import { isAuthenticated } from "../middleware/auth.js";
import { singleAvatar } from "../utils/multer.js";

const router = express.Router();

// Routes accessible without authentication
router.post("/signup", singleAvatar, newUser);
router.post("/login", login);


// Routes that require authentication
router.use(isAuthenticated);



router.get("/logout", logout);

export default router;
