const express = require("express");
const { getTranscript } = require("./transcript"); // We'll add logic next

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { link } = req.body;
  try {
    const transcript = await getTranscript(link);
    res.json({ transcript });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
