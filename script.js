let searchIcons = document.querySelectorAll(".search-icon");

for (let icon of searchIcons) {
    icon.addEventListener("click", (event) => {
        event.preventDefault();
        getCourses();
    });
}

async function getCoursesFromApi(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        // body: JSON.stringify(data)
    });
    return response.json();
}

let apiPromise = getCoursesFromApi('http://localhost:3000/courses/');


let coursesContainer = document.querySelector(".course-card-container");
for (let course of coursesContainer.querySelectorAll(".course-card")) {
    coursesContainer.removeChild(course);
}
coursesContainer = document.querySelector(".course-card-container");
console.log(coursesContainer);

function addCourseDiv(course) {
    coursesContainer = document.querySelector(".course-card-container");
    let courseCard = document.createElement("div");
    coursesContainer.appendChild(courseCard);
    courseCard.classList.add("course-card");

    let image = document.createElement("img");
    courseCard.appendChild(image);
    image.classList.add("course-image");
    image.setAttribute("alt", course["title"]);
    image.setAttribute("src", course["image"]);

    let link = document.createElement("a");
    courseCard.appendChild(link);
    link.classList.add("course-title");

    let title = document.createElement("h3");
    link.appendChild(title);
    title.textContent = course["title"];

    let author = document.createElement("h5");
    courseCard.appendChild(author);
    author.classList.add("instructors");
    author.textContent = course["author"];

    let price = document.createElement("h4");
    courseCard.appendChild(price);
    price.classList.add("course-price");
    price.textContent = course["price"];
}

apiPromise.then((data) => {
    for (let course of data) {
        addCourseDiv(course);
    }
});



function getCourses() {
    coursesContainer = document.querySelector(".course-card-container");
    for (let course of coursesContainer.querySelectorAll(".course-card")) {
        coursesContainer.removeChild(course);
    }
    let searchText = document.querySelector(".search-text").value.trim();
    coursesContainer = document.querySelector(".course-card-container");
    apiPromise.then((data) => {
        for (let course of data) {
            if (searchText === "" || course["title"].toLowerCase().indexOf(searchText.toLowerCase()) != -1)
                addCourseDiv(course);
        }
    });
}