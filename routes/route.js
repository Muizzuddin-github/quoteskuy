import { Router } from "express";
import { getRandom,getTodayQuote } from "../controller/controllers.js";

const router = Router()

router.get('/',getRandom)
router.get('/today',getTodayQuote)

export default router