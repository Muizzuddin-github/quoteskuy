import { Router } from "express";
import { getRandom,randomKategori,getTodayQuote } from "../controller/controllers.js";

const router = Router()

router.get('/',getRandom)
router.get('/today',getTodayQuote)
router.get('/:kategori',randomKategori)

export default router