import {Router} from "express";
import {
  addNewUser,
  deleteOneUser,
  getAllUsers,
  getOneUserById,
  updateUser,
} from "../controllers/users.controller.js";
import {auth} from "../middleware/index.js";

const router = Router();

// router.get("/", getAllUsers);

// router.post("/", addNewUser);

router.route("/:id").get(getOneUserById).put(updateUser).delete(deleteOneUser);

router.route("/").get(auth, getAllUsers).post(addNewUser);
export default router;
