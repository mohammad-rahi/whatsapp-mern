const express = require("express");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const cors = require("cors");
const users = require("./models/users");
const messages = require("./models/messages");

const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: "1545226",
  key: "3981867da7b75ce73d65",
  secret: "ebf21be55a232585eb43",
  cluster: "mt1",
  useTLS: true,
});

app.use(express.json({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

const monogURL =
  "mongodb+srv://admin:0qDrnwsCWDSBVhcM@cluster0.xzqzgyv.mongodb.net/whatsapp?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(monogURL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB is connected..."));

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A chnage occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        massage: messageDetails.massage,
        name: messageDetails.name,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

app.get("/", (req, res) => res.status(200).send("Whatsapp!!"));

app.listen(port, () => console.log(`Server is running on localhost:${port}`));

app.post("/messages/new", (req, res) => {
  messages
    .create(req.body)
    .then((message) =>
      res.status(201).json({ msg: "New message added successfully" })
    )
    .catch((err) =>
      res.status(500).json({ error: "Unable to add this message" })
    );
});

// app.get("/messages/sync", (req, res) => {
//   messages.find((err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

app.get("/messages/sync", (req, res) => {
  messages.find(
    {
      $or: [
        { receiverUid: req.query.receiverUid },
        { senderUid: req.query.senderUid },
      ],
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

app.get("/messages/sync/user", (req, res) => {
  messages.find(
    {
      $or: [{ receiverUid: req.query.uid }, { senderUid: req.query.uid }],
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

app.post("/users/new", (req, res) => {
  users
    .create(req.body)
    .then((user) =>
      res.status(201).json({ msg: "New user added successfully" })
    )
    .catch((err) => res.status(500).json({ msg: "Unable to add this user" }));
});

app.get("/users/sync", (req, res) => {
  users.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/users/sync/:uid", (req, res) => {
  users.findOne({ uid: req.params.uid }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!user) {
        res.json("User not found!");
      } else {
        res.status(200).send(user);
      }
    }
  });
});

app.put("/users/:id", (req, res) => {
  users
    .findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      res.json({ msg: "User successfully updated!" });
    })
    .catch((err) => {
      res.status(400).json({ error: "Undable to update database" });
    });
});

module.exports = app;
