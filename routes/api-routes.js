var db = require("../models");

module.exports = function (app) {


    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            // .then(dbNote => {
            //     res.json(dbNote);
            // })
            // .catch(err => {
            //     res.json(err);
            // });
    });

    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body)
            // .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
            // .then(dbUser => {
            //     res.json(dbUser);
            // })
            // .catch(err => {
            //     res.json(err);
            // });
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.update(
            // {
            //     _id: mongojs.ObjectId(req.params.id)
            // },
            // {
            //     $set: {
            //         title: req.body.title,
            //         note: req.body.note,
            //         modified: Date.now()
            //     }
            // },
            // (error, data) => {
            //     if (error) {
            //         res.send(error);
            //     } else {
            //         res.send(data);
            //     }
            // }
        );
    });
};  