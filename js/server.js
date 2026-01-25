import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());

const upload = multer();

app.post("/apply", upload.single("attachment"), async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rayzarr9@gmail.com",
        pass: "siyz eipc wltq bwhb"
      }
    });

    const fields = Object.entries(req.body)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    await transporter.sendMail({
      from: "YOUR_GMAIL@gmail.com",
      to: "YOUR_GMAIL@gmail.com",
      subject: "New Job Application",
      text: fields,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer
        }
      ]
    });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
