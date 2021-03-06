//Function to confirm if the user wants to create the workout routine name
function confirmCreate(event) {
    event.preventDefault();
    routineName = document.querySelector('input[name="routine"]').value;
    if (routineName === "") {
        swal("Error", "Please enter a valid name", "error");
    } else {
        swal({
            title: "Are you sure you want create this workout?",
            text: "Once you create, you can no longer rename this workout!",
            buttons: [true, "Create"]
        })
            .then((willSave) => {
                if (willSave) {
                    createRoutine();
                } else {
                    return false;
                }
            });
    }
}

//Function to confirm if user wants to save the workout they created
function confirmSave(event) {
    event.preventDefault();
    swal({
        title: "Are you sure you want to save your workout?",
        text: "Once saved, you can no longer edit the workout!",
        buttons: [true, "Save"]
    })
        .then((willSave) => {
            if (willSave) {
                saveWorkout();
            } else {
                return false;
            }
        });
}

//Function to create the workout routine name and display it on the page
let routineId;
function createRoutine() {
    const routineName = document.querySelector('input[name="routine"]').value;

    fetch('/api/routines', {
        method: 'POST',
        body: JSON.stringify({
            routineName
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        routineId = data.id;
                    })
            } else {
                swal("Error!", "Please try entering a different name!", "error");
                return;
            }
            //Change display to none to no longer display routine name form
            let createNameForm = document.querySelector('#create-name');
            createNameForm.className += ' display-off';

            //Change display to block to now display the workout routine name to soon be populated with exercises
            let workoutDiv = document.querySelector('#workout-plan');
            workoutDiv.className = 'display-on';
            let workoutName = document.querySelector('.routine-name');
            workoutName.textContent = routineName;
        })
}

//Function to save the workout the user created
function saveWorkout() {
    //Selecting the ordered list under the routine name with all the exercises add to it
    let saveWrkList = document.querySelectorAll('.exercise-item');

    //Creating an empty array to store the exercises
    let workoutArr = [];

    //Loop through the saved workout list to put each item into an object then into an array
    for (i = 0; i < saveWrkList.length; i++) {
        let exc = saveWrkList[i].innerText;
        let excArr = exc.split('\n\n');

        workoutArr[i] = {
            'name': excArr[0],
            'gif': excArr[1],
            'equipment': excArr[2]
        }
    }

    //For each object in the workout array make a post request to add each exercise to the exercise database table
    workoutArr.forEach(item => {
        const name = item.name;
        const gif = item.gif;
        const equip = item.equipment;

        //Save each exercise to database
        fetch('/api/exercises', {
            method: 'POST',
            body: JSON.stringify({
                name,
                gif,
                equip,
                routineId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                response.json()
                    .then(data => {
                        location.reload();
                    })
            })
    })

}

document.querySelector('#create-name').addEventListener('submit', confirmCreate);

document.querySelector('.save-workout').addEventListener('click', confirmSave);