import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import _ from "lodash";

// import mailer from "../services/mailer";
import User from "../models/User";
import { createAccessToken, verifyAccessToken } from "../services/token";
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  WRONG_PASS_MESSAGE,
  USER_NOT_EXISTS_MESSAGE,
  INVALID_EMAIL_OR_PASS,
} from '../utils/constants'

const router = Router();

router.get("/", async (_req, res) => {
  User.find({}, (_err, users) => {
    res.send(users);
  });
});

router.get("/hello", async (_req, res) => {
  res.send('hello');
});

router.post(
  "/register",
  body("firstName").notEmpty().isAlpha(),
  body("lastName").notEmpty().isAlpha(),
  body("email").notEmpty().isEmail(),
  body("pass").notEmpty(),
  body("repositoriesUrl").notEmpty().isURL(),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { pass, email, firstName, lastName } = req.body;
    const hashedPass = await bcrypt.hash(pass, 10);
    const newUserObj = new User({ ...req.body, pass: hashedPass });
    const user = await User.findOne({ email });

    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).send();
    }

    newUserObj.save((err) => {
      if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);

      return res
        .status(StatusCodes.OK)
        .send(SUCCESS_MESSAGE);
    });

    // const html = `<h1>Welcome ${firstName} ${lastName} to our React family. With Unicode you'll find out a lot of useful knowledge about React and connected technologies.</h1>`

    // mailer(html, email);
  }
);

router.post(
  "/login",
  body("email").notEmpty().isEmail(),
  body("pass").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(INVALID_EMAIL_OR_PASS)
    }

    const { pass, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).send(USER_NOT_EXISTS_MESSAGE);
    }

    const isValidPass = await bcrypt.compare(pass, String(user.pass));

    if (!isValidPass) {
      return res.status(StatusCodes.BAD_REQUEST).send(WRONG_PASS_MESSAGE);
    }

    const accessToken = createAccessToken(email);
    const lifeTime = 1000 * 3600 * 24 * 7; //three hours in seconds

    res.cookie("accessToken", accessToken, {
      maxAge: lifeTime,
      path: "/",
      secure: true,
      sameSite: 'None',
      httpOnly: true,
    });

    return res.status(StatusCodes.OK).send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      repositoriesUrl: user.repositoriesUrl,
      lessons: user.lessons
    });
  }
);

router.get('/verify-user', [verifyAccessToken, async (_req, res) => {
  return res.status(StatusCodes.OK).send(SUCCESS_MESSAGE);
}])

router.put(
  "/save-task",
  body("lesson").notEmpty().isNumeric(),
  body("task").notEmpty().isNumeric(),
  body("userID").notEmpty().isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).send(ERROR_MESSAGE);
    }

    const { lesson, task, userID } = req.body;
    const user = await User.findOne({ _id: userID });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).send(ERROR_MESSAGE);
    }

    user.lessons[lesson - 1].tasks[task - 1][task] = !user.lessons[lesson - 1].tasks[task - 1][task];
    await User.findOneAndUpdate({ _id: userID }, user);

    return res.status(StatusCodes.OK).send(SUCCESS_MESSAGE);
  }
);

router.delete("/logout", (_req, res) => {
  res.clearCookie('accessToken');
  return res.status(StatusCodes.OK).send();
});

router.get("/user-info/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).send();
  }

  return res.status(StatusCodes.OK).send({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    repositoriesUrl: user.repositoriesUrl,
    lessons: user.lessons
  });
});

export default router;
