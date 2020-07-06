var db = require("../models");

module.exports = function (app) {


    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", ({ body }, res) => {
        db.Exercise.create(body)
            .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(req.params.id, {
            type: "resistance", name: "bench",
            duration: 20, weight: 200, reps: 3, sets: 1
        }, function (err) {
            if (err) {
                return res.send(err);
            }
            console.log({ message: "workout updated" });
        });
    });


app.get("/api/workouts/range", (req, res) => {
    const id = req.params.id;
    const days = parseInt(req.params.days);

    let now = new Date(),
        firstDate = new Date(now.valueOf() - (1000 * 60 * 60 * 24 * days));

    Workout.aggregate([
        {
            "$match": {
                "_id": ObjectId(id),
                "workoutStats": {
                    "$elemMatch": { "createdOn": { "$gte": firstDate, "$lt": now } }
                }
            }
        },
        {
            "$project": {
                "workoutStats": {
                    "$filter": {
                        "input": "$workoutStats",
                        "as": "el",
                        "cond": {
                            "$and": [
                                { "$gte": ["$$el.createdOn", firstDate] },
                                { "$lt": ["$$el.createdOn", now] }
                            ]
                        }
                    }
                }
            }
        }
    ], function (err, res) {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.json(err);
        });

});
};

