
import express from "express";
import {createList,addItem,showListData,showAllList,changeVisibility,showAllPersonalList,showDetails} from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();
router.use(isAuthenticated);
router.post("/createList", createList);
router.post("/addItem/:id", addItem);
router.get("/showList", showListData);
router.get("/showAllPersonalList", showAllPersonalList);
router.get("/showAllList", showAllList);
router.put("/changeVisibility", changeVisibility);
router.get("/listDetails/:id", showDetails);

export default router;
