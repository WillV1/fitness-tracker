const mongoose = require("mongoose");
const Exercise = require("./exercise")

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    
      day: 
      {
        type: Date,
        default: () => new Date()
      },
      exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
      ]
});

WorkoutSchema.virtual('duration').get(function () {
  return this.exercises.reduce(
    ( accumulator, currentValue ) => accumulator + currentValue.duration,
    0)
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;