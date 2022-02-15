async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="workout-title"]').value;
    const workout_length = document.querySelector('select[name="length"]').value;
    const workout_description = document.querySelector('textarea[name="workout-body"]').value;
    const user_id =1;

    const response = await fetch(`/api/workouts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        workout_description,
        workout_length,
        user_id
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
  