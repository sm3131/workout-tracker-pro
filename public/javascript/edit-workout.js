//Edit workout post (name, duration, description)
async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="workout-title"]').value;
    const workout_length = document.querySelector('select[name="length"]').value;
    const workout_description = document.querySelector('textarea[name="workout-body"]').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/workouts/${id}`, {
      method: 'PUT',
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
  
  document.querySelector('.edit-workout-form').addEventListener('submit', editFormHandler);