document.addEventListener("DOMContentLoaded", () => {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    const name = "NOEL";
    const surname = "TAYLOR";

    firstName.textContent = name;
    lastName.textContent = surname;

    const skillsContainer = document.getElementById("skillsContainer");

    const skills = [
        { name: "Adobe Photoshop", value: 75 },
        { name: "Adobe Illustrator", value: 70 },
        { name: "Microsoft PowerPoint", value: 60 },
        { name: "Microsoft Word", value: 65 },
        { name: "HTML-5/CSS-3", value: 80 }
    ];

    skills.forEach(skill => {
        const div = document.createElement("div");
        div.className = "skill";

        div.innerHTML = `
            <span>${skill.name}</span>
            <input type="range" value="${skill.value}" max="100">
        `;

        skillsContainer.appendChild(div);
    });

    const langBox = document.getElementById("languageContainer");

    const languages = ["ENGLISH", "SPANISH", "FRENCH"];

    languages.forEach(lang => {
        const div = document.createElement("div");
        div.className = "lang";
        div.textContent = lang;
        langBox.appendChild(div);
    });

    const hobbiesBox = document.getElementById("hobbies");

    const hobbies = [
        "Book Reading",
        "Traveling",
        "Playing Chess"
    ];

    hobbies.forEach(hobby => {
        const wrapper = document.createElement("div");
        wrapper.className = "skill";

        const span = document.createElement("span");
        span.textContent = hobby;

        const input = document.createElement("input");
        input.type = "range";
        input.value = 60;
        input.max = 100;

        wrapper.appendChild(span);
        wrapper.appendChild(input);
        hobbiesBox.appendChild(wrapper);
    });

    const header = document.querySelector(".about-header");
    const content = document.querySelector(".about-content");

    header.addEventListener("click", () => {
        header.classList.toggle("active");
        content.classList.toggle("open");
    });
});