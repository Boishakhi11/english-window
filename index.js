const url = "https://openapi.programming-hero.com/api/levels/all"; 

const createElement = (arr) => {
    const htmlElements = arr.map(element => `<span class="btn text-gray-500">${element} </span>`);
    return (htmlElements.join(" "));
}

const loadLesson = () => {
    fetch(url)
    .then(res => res.json())
    .then(json => displayLessons(json.data)); 
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach (btn => btn.classList.remove("active"));

}

const loadLevelWord = (levelNo) => {
    fetch(`https://openapi.programming-hero.com/api/level/${levelNo}`)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${levelNo}`);
        clickBtn.classList.add("active");
        displayLevelWord(data.data)});
}

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
    const displayDetails = document.getElementById("display-details-container");
    console.log(displayDetails);
    displayDetails.innerHTML= 
    ` <div class="space-y-5 p-3">
            <h1 class="font-semibold text-2xl"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.meaning})</h1>
            <div>
                <h2 class="font-semibold"> Meaning</h2>
                <p class="text-gray-500"> ${word.meaning}</p>
            </div>
            <div>
                <h2 class="font-semibold"> Example</h2>
                <p class="text-gray-500"> ${word.sentence}</p>
            </div>
            <div>
                <h2 class="font-semibold"> Synonyms</h2
                <div>${createElement(word.synonyms)}</div>
            </div>
    </div>`;
    document.getElementById("modal_box").showModal() ;
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
            <h1 class="text-[32px] font-bold h-[100%]">${word.word ? word.word : "No Word Found"}</h1>
            <p class="text-[20px] font-semibold"> Meaning/Pronounciation</p>
            <p class="text-[28px] font-bold" >"${word.meaning ? word.meaning : "Nothing Found"}/ ${word.pronunciation ? word.pronunciation : "No Pronunciation Found"
            }"</p>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="bg-[#1A91FF10] cursor-pointer hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
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
        `<button id = "lesson-btn-${lesson.level_no}" 
            onClick="loadLevelWord(${lesson.level_no})" 
            class="flex gap-1 items-center border border-[#422AD5] rounded-md p-2 cursor-pointer lesson-btn"> 
            <img src="./assets/fa-book-open.png">
            Learn ${lesson.level_no}
         </button>`

        lessonContainer.append(lessonDiv);
    }
};

loadLesson();

document.getElementById("btn-search").addEventListener("click", ()=> {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data=> {
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter(word=> word.word.toLowerCase().includes(searchValue)
    );
        displayLevelWord(filterWords);
    });

    
})

