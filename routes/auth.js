const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Mailjet = require("node-mailjet");

// Configuración de Mailjet
const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

// Ruta para el registro
router.post("/register", async (req, res) => {
  const { email: id, password } = req.body;
  console.log("Email:", id);
  console.log("Password:", password);

  try {
    let user = await User.findOne({ where: { id } });
    if (user) {
      return res.status(400).render("error", { message: "El usuario ya existe. Puede que no usted no haya confirmado su correo" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(20).toString("hex");

    user = await User.create({
      id: id,
      password: hashedPassword,
      lastLogin: null,
      nTries: 0,
      bannedTime: null,
      confirmationToken: token,
      confirmed: false,
    });

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "expressmailerapp@gmail.com",
            Name: "Express Login",
          },
          To: [
            {
              Email: id,
              Name: "Usuario",
            },
          ],
          Subject: "Confirma tu correo electrónico",
          TextPart: `Por favor, confirma tu correo electrónico haciendo clic en el siguiente enlace: http://${req.headers.host}/auth/confirm/${token}`,
          HTMLPart: `<strong>Por favor, confirma tu correo electrónico haciendo clic en el siguiente enlace: <a href="http://${req.headers.host}/auth/confirm/${token}">Verificar</a></strong>`,
          CustomID: "VerificacionEmail",
        },
      ],
    });

    request
      .then((result) => {
        console.log("Correo de confirmación enviado:", result.body);
        return res.status(400).render("error", { message: "Registro exitoso. Por favor, confirma tu correo electrónico." });
      })
      .catch((err) => {
        console.error("Error al enviar el correo:", err);
        return res
          .status(500)
          .send("Error al enviar el correo de confirmación.");
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error del servidor.");
  }
});

// Ruta para confirmar el correo electrónico
router.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ where: { confirmationToken: token } });
    if (!user) {
      return res.status(400).render("error", { message: "Token de confirmación inválido." });
    }

    user.confirmed = true;
    user.confirmationToken = null;
    await user.save();

    return res.status(200).render("confirm", { message: "Correo electrónico confirmado. Ya puedes iniciar sesión." });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", { message: "Error del servidor." });
  }
});

// Ruta para el login
router.post("/login", async (req, res) => {
  const { email: id, password } = req.body;
  console.log("Email:", id);
  console.log("Password:", password);

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(401).send("Usuario no encontrado");
    }
    if (!user.confirmed) {
      return res.status(401).render("error", {
        message:
          "Por favor, confirma tu correo electrónico antes de iniciar sesión.",
        error: {},
      });
    }

    const now = new Date();
    if (user.bannedTime && now < user.bannedTime) {
      return res
        .status(403)
        .send("Usuario bloqueado. Inténtalo de nuevo más tarde.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      user.lastLogin = now;
      user.nTries = 0;
      user.bannedTime = null;
      await user.save();
      return res.redirect("/image/inicializarBaraja");
    } else {
      user.nTries += 1;
      if (user.nTries >= 3) {
        user.bannedTime = new Date(now.getTime() + 5 * 60000); // 5 minutos de baneo
      }
      await user.save();
      return res.status(401).send("Contraseña incorrecta");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      message: "Error del servidor.",
      error: error,
    });
  }
});

// Ruta para mostrar el formulario de login
router.get("/login", (req, res) => {
  res.render("login", { title: "Iniciar sesión" });
});

// Ruta para el logout
router.post("/logout", (req, res) => {
  res.redirect("login");
});

module.exports = router;
