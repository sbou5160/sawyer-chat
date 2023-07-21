const express = require("express"); //express runs http server
const cors = require("cors"); //allows calls to server from any origin
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try{
    const r = await axios.put( // getting username if already exists or creating new one
        'https://api.chatengine.io/users/',
        {username: username, secret: username, first_name: username},
        {headers: {"private-key": "8d1e7d74-241b-4d7d-b979-f1e65c1acaae "}} //allows create or destroy users
    )
    return res.status(r.status).json(r.data);
  }  catch (e) {
     return res.status(e.response.status).json(e.response.data);   
  }
});

app.listen(3001);