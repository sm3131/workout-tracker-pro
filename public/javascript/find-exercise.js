//Searching for an exercise from third party Exercise DB API
async function findExercises(event) {

    event.preventDefault();

    //Getting the value from the body part dropdown menu and formatting if necessary to account for spaces
    const bodyPart = document.querySelector('select[name="exercise"]').value;
    let formattedBodyPart;
    if (bodyPart === 'lower arms' || 'lower legs' || 'upper arms' || 'upper legs') {
        formattedBodyPart = bodyPart.replace(/ /g, "%20")
    } else {
        formattedBodyPart = bodyPart
    }
    console.log(formattedBodyPart);

    //fetch request to server api to send request to third party api to get exercises based on body part
    const response = await fetch(`/api/exercisesDb/${formattedBodyPart}`, {
        method: 'GET'
    })

    if (response.ok) {
        response.json()
            .then(exercises => {
                console.log(exercises);
                //API returns array of exercises, so to get one random exercise perform the following
                let randomExercise = exercises[Math.floor(Math.random() * exercises.length)];

                console.log(randomExercise);

                //Making the exercise name upper case
                let lowerName = randomExercise.name
                let upperName = lowerName.charAt(0).toUpperCase() + lowerName.slice(1);
                let gifUrl = randomExercise.gifUrl
                let lowerEquipment = randomExercise.equipment
                let upperEquipment = lowerEquipment.charAt(0).toUpperCase() + lowerEquipment.slice(1);

                //Selecting the list elements on the page that will display the exercise info
                let nameList = document.querySelector('.name');
                let gifList = document.querySelector('.gif');
                let equipmentList = document.querySelector('.equipment');

                //Adding exercise info to list elements on page
                nameList.textContent = upperName;
                gifList.textContent = gifUrl;
                gifList.href = gifUrl;
                equipmentList.textContent = upperEquipment;
            })
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.exercise-form').addEventListener('submit', findExercises);