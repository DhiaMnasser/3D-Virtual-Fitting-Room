import express from 'express'
import { getClaims, getClaimById, createClaim, updateClaim, deleteClaim } from '../controllers/claims.js';

var router = express.Router();

/* GET products listing. */
router.get("/", getClaims);
router.get("/:id", getClaimById);
router.post("/", createClaim);
router.patch("/:id", updateClaim);
router.delete("/:id", deleteClaim);



export default router;
