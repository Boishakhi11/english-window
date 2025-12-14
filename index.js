const url = "https://openapi.programming-hero.com/api/levels/all"; 

const loadLesson = () => {
    fetch(url)
    .then(res => res.json())
    .then(json => displayLessons(json.data)); 
}

const loadLevelWord = (levelNo) => {
    fetch(`https://openapi.programming-hero.com/api/level/${levelNo}`)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data));
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = 
        `<div class="col-span-3 text-center space-y-5">
            <img class="mx-auto" src="./assets/alert-error.png">
            <p class="text-2xl text-gray-600">No Word is Added to This Lesson Yet</p>
            <h2 class="text-4xl">Go to Another Lesson</h2>
        </div>`;
        return;
    }

     for (const word of words) {
        const card = document.createElement("div");
        card.innerHTML = `<div class="bg-gray-200 border border-gray-400 p-4 text-center rounded-md shadow-md space-y-4" >
            <h1 class="text-[32px] font-bold">${word.word ? word.word : "No word Found"}</h1>
            <p class="text-[20px] font-semibold"> Meaning/Pronounciation</p>
            <p class="text-[28px] font-bold" >"${word.meaning ? word.meaning : "No Word Meaning Found"}/ ${word.pronunciation ? word.pronunciation : "No Pronunciation Found"
            }"</p>
            <div class="flex justify-between items-center">
                <i class="fa-solid fa-circle-info bg-[#1A91FF10] cursor-pointer hover:bg-[#1A91FF80]"></i>
                <i class="fa-solid fa-volume-high bg-[#1A91FF10] cursor-pointer hover:bg-[#1A91FF80]"></i>
            </div>
        </div>`

        wordContainer.append(card);
     }
    }


const displayLessons = (lessons) => {

    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    for (const lesson of lessons) {
        console.log(lesson);
        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML = 
        `<button onClick="loadLevelWord(${lesson.level_no})" class="flex gap-1 items-center border border-[#422AD5] rounded-md p-2 cursor-pointer"> 
        <img src="./assets/fa-book-open.png">
         Learn ${lesson.level_no}
         </button>`

        lessonContainer.append(lessonDiv);
    }
};

loadLesson();