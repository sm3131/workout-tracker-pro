//add a workout post
async function newFormHandler(event) {
  event.preventDefault();

  //grab user input data from form
  const title = document.querySelector('input[name="workout-title"]').value;
  const workout_length = document.querySelector('select[name="length"]').value;
  const workout_description = document.querySelector('textarea[name="workout-body"]').value;

  //send post request to server to create workout post
  const response = await fetch(`/api/workouts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      workout_description,
      workout_length
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    swal("Missing Field!", "Do not leave any fields blank!", "error");
  }
}

document.querySelector('.new-workout-form').addEventListener('submit', newFormHandler);
