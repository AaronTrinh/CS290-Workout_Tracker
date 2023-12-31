import React from 'react';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory()

    const loadExercises = async () => {
        const response = await fetch('/exercises')
        const exerciseData = await response.json()
        setExercises(exerciseData)
    }

    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' })
        if (response.status === 204) {
            setExercises(exercises.filter(m => m._id !== _id))
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        history.push("/edit-exercise")
    }

    useEffect(() => {
        loadExercises()
    }, [])

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        </>
    );
}

export default HomePage;