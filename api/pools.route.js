import express from "express";
import PoolsCtrl from "./pools.controller.js";

const router = express.Router();

router.route("/").get(PoolsCtrl.apiGetPools);

export default router;