import mongoose from 'mongoose';

// Prepare the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Define the schema for exercises
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

// Create a model from our schema
const Exercise = mongoose.model("Exercise", exerciseSchema);

// Function to create an exercise
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date })
    return exercise.save()
}

// Function to get all exercises
const findExercises = async () => {
    const query = Exercise.find()
    return query.exec()
}


// Function to update an exercise with a specific ID.
const updateExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.findOneAndUpdate({ _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date })
    if (result !== null) {
        return 1
    } else {
        return error
    }
}

// Function to delete an exercise with a specific ID.
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id })
    return result.deletedCount
}

export { createExercise, findExercises, updateExercise, deleteExercise }