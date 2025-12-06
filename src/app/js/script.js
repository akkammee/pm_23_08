document.addEventListener("DOMContentLoaded", () => {

    fetch("json/data.json")
        .then(res => res.json())
        .then(data => {

            document.getElementById("firstName").textContent = data.firstName;
            document.getElementById("lastName").textContent = data.lastName;

            const skillsContainer = document.getElementById("skillsContainer");
            skillsContainer.innerHTML = "";

            data.skills.forEach(skill => {
                const div = document.createElement("div");
                div.className = "skill";

                div.innerHTML = `
                    <span>${skill.name}</span>
                    <input type="range" value="${skill.value}" max="100">
                `;

                skillsContainer.appendChild(div);
            });

            const langBox = document.getElementById("languageContainer");
            langBox.innerHTML = "";

            data.languages.forEach(lang => {
                const div = document.createElement("div");
                div.className = "lang";
                div.textContent = lang;
                langBox.appendChild(div);
            });

            const hobbiesBox = document.getElementById("hobbies");
            hobbiesBox.innerHTML = "";

            data.hobbies.forEach(hobby => {
                const wrapper = document.createElement("div");
                wrapper.className = "skill";

                wrapper.innerHTML = `
                    <span>${hobby.name}</span>
                    <input type="range" value="${hobby.value}" max="100">
                `;

                hobbiesBox.appendChild(wrapper);
            });
        })

        .catch(err => console.error("JSON load error:", err));


    const header = document.querySelector(".about-header");
    const content = document.querySelector(".about-content");

    header.addEventListener("click", () => {
        header.classList.toggle("active");
        content.classList.toggle("open");
    });

});
