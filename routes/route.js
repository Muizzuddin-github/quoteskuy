import { Router } from "express";
import { getRandom,randomKategori } from "../controller/controllers.js";

const router = Router()

router.get('/',getRandom)
router.get('/:kategori',randomKategori)

export default router