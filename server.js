const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useFindAndModify: false });

// require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.get("/api/workouts", (req, res) => {
  console.log("GET")
  db.Workout.find({})
      .then(dbWorkout => {
          console.log(dbWorkout)
          res.json(dbWorkout);
      })
      .catch(err => {
          res.json(err);
      });
});

app.post("/api/workouts", ({ body }, res) => {
  console.log("POST")
  db.Workout.create()
     .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
      .then(dbWorkout => {
          console.log(dbWorkout)
          res.json(dbWorkout);
      })
      .catch(err => {
          res.json(err);
      });
});

app.put("/api/workouts/:id", (req, res) => {
  console.log("PUT:", req.params, req.body)
  db.Workout.findByIdAndUpdate(req.params.id, {
      $push: { exercises: req.body }
  }, function (err) {
      if (err) {
          return res.send(err);
      }
      console.log({ message: "workout updated" });
  });
});


app.get("/api/workouts/range", (req, res) => {
  console.log("get range:", req.params)
  const id = req.params.id;
  const days = parseInt(req.params.days);

  db.Workout.find({})
      .limit(7).then(dbWorkout => {
          console.log(dbWorkout);
          res.json(dbWorkout);
      }).catch(err => {
          res.json(err);
      });

});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });