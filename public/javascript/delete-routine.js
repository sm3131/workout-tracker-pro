//Deleting workout routine and associated exercises from database
async function deleteRoutineHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const name = document.querySelector('.routine-name').textContent;

    const response = await fetch(`/api/routines/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
        swal(`${name} Deleted!`)
        .then(() => {
            document.location.replace('/create');
        })
    } else {
      alert(response.statusText);
    }
}

document.querySelector('.delete-workout').addEventListener('click', deleteRoutineHandler);