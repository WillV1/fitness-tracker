const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    
    //   day: new Date().setDate(new Date().getDate()-10),
      exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
      ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;