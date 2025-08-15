import express from express;
import {createTag, getTags}  from "../controllers/tagController.js";
import { getCategories } from "../controllers/categoryController";

const router = express.Router();

router.post('/tags', createTag);
router.get('/tags', getTags);
router.get('/categories', getCategories);

export default router;