import * as exercises from './workout_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

// Create a new exercise with a name, reps, weight, unit, and date.
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ Error: 'Request Failed' })
        })
});


// Retrieve all of the exercises in the database.
app.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercise => {
            res.json(exercise)
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ Error: 'Request Failed' })
        })
});


// Update the exercise corresponding to the provided ID.
app.put('/exercises/:_id', (req, res) => {
    exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Exercise Not Found' })
            }
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ Error: 'Request Failed' })
        })
});

// Delete the exercise corresponding to the provided ID.
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send()
            } else {
                res.status.json({ Error: 'Exercise Not Found' })
            }
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ Error: 'Request Failed' })
        })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});