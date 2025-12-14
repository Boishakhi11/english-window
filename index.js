

const url = "https://openapi.programming-hero.com/api/levels/all";

const loadLesson = () => {
    fetch(url)
    .then(res => res.json())
    .then(json => displayLessons(json.data)); 
}

const displayLessons = (lessons) => {

    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    for (const lesson of lessons) {
        console.log(lesson);
        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML = 
        `<button class="flex gap-1 items-center border border-[#422AD5] rounded-md p-2 cursor-pointer"> 
        <img src="./assets/fa-book-open.png">
         Learn ${lesson.level_no}
         </button>`

        lessonContainer.append(lessonDiv);
    }
};

loadLesson();