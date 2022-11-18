import { Router } from "express";
import ApiUtils from "../controller/controllers.js";
const router = Router()

router.get('/',ApiUtils.getRandom)
router.get('/today',ApiUtils.getTodayQuote)

export default router