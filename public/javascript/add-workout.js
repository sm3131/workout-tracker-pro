async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="workout-title"]').value;
    const workout_description = document.querySelector('input[name="workout-description"]').value;
    const workout_length = document.querySelector('input[name="workout-length"]').value;
    const workout_date = document.querySelector('input[name="workout-date"]').value;

    const response = await fetch(`/api/workouts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        workout_description,
        workout_date,
        workout_length
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-workout-form').addEventListener('submit', newFormHandler);
  