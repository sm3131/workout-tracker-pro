async function upvoteClickHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/workouts/upvote', {
      method: 'PUT',
      body: JSON.stringify({
        workout_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      swal("You already liked this post!");
    }
  }
  
  document.querySelector('.like-btn').addEventListener('click', upvoteClickHandler);