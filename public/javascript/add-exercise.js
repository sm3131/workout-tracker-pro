//Add exercise to workout routine
function addToWorkoutPlan() {

    let workoutDiv = document.querySelector('#workout-plan');
    if(workoutDiv.className === 'display-on') {

    //Selecting the exercise name, gif, and equipment from the page
    let exerciseName = document.querySelector('.name').textContent;
    let exerciseGif = document.getElementById("gif-link").href;
    let exerciseEquip = document.querySelector('.equipment').textContent;

    //Creating a paragraph to store the name
    let namePara = document.createElement('p');
    namePara.textContent = exerciseName;

    //Creating a paragraph and anchor tag to store the gif link
    let gifPara = document.createElement('p');
    let gifAnchor = document.createElement('a');
    gifAnchor.id = 'gif-wrap';
    gifAnchor.href = exerciseGif;
    gifAnchor.target = '_blank';
    gifAnchor.textContent = exerciseGif
    gifPara.appendChild(gifAnchor);

    //Creating a paragraph to store the equipment
    let equipPara = document.createElement('p');
    equipPara.textContent = exerciseEquip;

    //Selecting workout-list which is the ordered list of exercises under the workout routine name
    let workoutList = document.querySelector('.workout-list');

    //Creating a list element to store the exercise name, gif, and equipment
    let exerciseItem = document.createElement('li');
    exerciseItem.className = 'exercise-item';
    exerciseItem.append(namePara, gifPara, equipPara);
    console.log(exerciseItem);

    //Adding a delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.classList = 'delete-exercise log-btn'
    deleteBtn.textContent = "Delete Exercise";
    exerciseItem.appendChild(deleteBtn);

    //Adding list element exercise to ordered list under routine name
    workoutList.appendChild(exerciseItem);
    console.log(workoutList);

    //Click listener to delete button
    document.querySelectorAll('.delete-exercise').forEach(item => { item.addEventListener('click', deleteExercise) });

    //Selecting save button to turn on display once first exercise is added
    saveBtn = document.querySelector('#save');
    saveBtnClass = document.querySelector('#save').className;
    console.log(saveBtnClass);

    if(saveBtnClass === 'display-off') {
        saveBtn.className = 'display-on';
    } 
    }
    else {
        return;
    }
}

//Delete an exercise from the workout routine list
function deleteExercise(event) {
    deleteExBtn = event.currentTarget;
    console.log(deleteExBtn);

    let listItem = deleteExBtn.parentNode;
    console.log(listItem);
    let workoutList = document.querySelector('.workout-list');
    workoutList.removeChild(listItem);

    // fetch(`/api/exercises/${id}`, {
    //     method: 'DELETE'
    // })
    // .then(response => {
    //     if(response.ok) {
    //         console.log('Deleted!')
    //     } else {
    //         alert(response.statusText);
    //     }
    // })
}

document.querySelector('#exercise-name').addEventListener('click', addToWorkoutPlan);