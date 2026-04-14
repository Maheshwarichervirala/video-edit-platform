const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const Editor = mongoose.model("Editor", {
    name: String,
    skill: String
});

app.get("/editors", async (req, res) => {
    const editors = await Editor.find();
    res.json(editors);
});

app.post("/add-editor", async (req, res) => {
    try {
        console.log("BODY RECEIVED:", req.body);

        if (!req.body || !req.body.name || !req.body.skill) {
            return res.status(400).send("Data missing");
        }

        const editor = new Editor({
            name: req.body.name,
            skill: req.body.skill
        });

        await editor.save();

        res.send("Editor added");
    } catch (err) {
        console.log("ERROR FULL:", err);
        res.status(500).send(err.message);
    }
});
app.listen(5000, () => console.log("Server running on port 5000"));