const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const dataFilePath = "partyData.json";

app.get("/party", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading party data." });
    }
    const partyData = JSON.parse(data);
    res.json(partyData);
  });
});

app.put("/party", (req, res) => {
  const partyData = req.body;
  fs.writeFile(dataFilePath, JSON.stringify(partyData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Error saving party data." });
    }
    res.json({ message: "Party information updated successfully." });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
