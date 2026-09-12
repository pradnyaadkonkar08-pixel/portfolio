document.addEventListener("DOMContentLoaded", () => {
    loadPortfolio();
});


async function loadPortfolio() {

    try {

        const response = await fetch("database.json");

        if (!response.ok) {
            throw new Error(
                `Could not load database.json (${response.status})`
            );
        }

        const data = await response.json();

        populatePortfolio(data);

    } catch (error) {

        console.error("Portfolio loading error:", error);

        showError();

    }

}


/* =========================================================
   MAIN POPULATOR
========================================================= */

function populatePortfolio(data) {

    populatePersonal(data.personal);

    populateSocials(data.socials);

    populateEducation(data.education);

    populateSkills(data.skills);

    populateProjects(data.projects);

    populateExperience(data.experience);

    populateAchievements(data.achievements);

    populateInterests(data.interests);

    populateContact(data.contact);

}


/* =========================================================
   PERSONAL INFORMATION
========================================================= */

function populatePersonal(personal) {

    setText("heroName", personal.name);

    setText("heroRole", personal.role);

    setText("heroTagline", personal.tagline);

    setText("aboutText", personal.about);

    setText("aboutName", personal.name);

    setText("aboutLocation", personal.location);

    setText("aboutEmail", personal.email);

    setText("footerName", personal.name);

    const profileImage =
        document.getElementById("profileImage");

    if (profileImage && personal.profileImage) {

        profileImage.src = personal.profileImage;

        profileImage.alt =
            `${personal.name} profile photo`;

    }

    const resumeButton =
        document.querySelector(".hero-buttons");

    if (resumeButton && personal.resume && personal.resume !== "#") {

        const link = document.createElement("a");

        link.href = personal.resume;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.className = "btn btn-secondary";

        link.textContent = "Download Resume";

        resumeButton.appendChild(link);

    }

    document.title =
        `${personal.name} | ${personal.role}`;

}


/* =========================================================
   SOCIAL LINKS
========================================================= */

function populateSocials(socials) {

    const container =
        document.getElementById("socialLinks");

    if (!container || !socials) return;

    container.innerHTML = "";

    Object.entries(socials).forEach(
        ([platform, url]) => {

            if (!url || url === "#") return;

            const link =
                document.createElement("a");

            link.href = url;

            link.target = "_blank";

            link.rel = "noopener noreferrer";

            link.textContent = capitalize(platform);

            container.appendChild(link);

        }
    );

}


/* =========================================================
   EDUCATION
========================================================= */

function populateEducation(education) {

    const container =
        document.getElementById(
            "educationTimeline"
        );

    if (!container || !Array.isArray(education)) return;

    container.innerHTML = "";

    education.forEach(item => {

        const element =
            document.createElement("article");

        element.className = "timeline-item";

        element.innerHTML = `
            <div class="timeline-dot"></div>

            <div class="timeline-duration">
                ${escapeHTML(item.duration)}
            </div>

            <h3>
                ${escapeHTML(item.degree)}
            </h3>

            <div class="timeline-institution">
                ${escapeHTML(item.institution)}
                ${item.location
                    ? ` · ${escapeHTML(item.location)}`
                    : ""}
            </div>

            <p class="timeline-description">
                ${escapeHTML(item.description)}
            </p>
        `;

        container.appendChild(element);

    });

}


/* =========================================================
   SKILLS
========================================================= */

function populateSkills(skills) {

    const container =
        document.getElementById("skillsGrid");

    if (!container || !Array.isArray(skills)) return;

    container.innerHTML = "";

    skills.forEach(skill => {

        const element =
            document.createElement("article");

        element.className = "skill-card";

        element.innerHTML = `
            <h3>
                ${escapeHTML(skill.name)}
            </h3>

            <p class="skill-level">
                ${escapeHTML(skill.level)}
            </p>
        `;

        container.appendChild(element);

    });

}


/* =========================================================
   PROJECTS
========================================================= */

function populateProjects(projects) {

    const container =
        document.getElementById("projectsGrid");

    if (!container || !Array.isArray(projects)) return;

    container.innerHTML = "";

    projects.forEach(project => {

        const tags =
            Array.isArray(project.technologies)
                ? project.technologies
                : [];

        const tagsHTML =
            tags
                .map(tag => `
                    <span class="project-tag">
                        ${escapeHTML(tag)}
                    </span>
                `)
                .join("");

        const linkHTML =
            project.link &&
            project.link !== "#"
                ? `
                    <a
                        class="project-link"
                        href="${escapeAttribute(project.link)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Project →
                    </a>
                `
                : "";

        const element =
            document.createElement("article");

        element.className = "project-card";

        element.innerHTML = `
            <div class="project-category">
                ${escapeHTML(project.category)}
            </div>

            <h3>
                ${escapeHTML(project.title)}
            </h3>

            <p>
                ${escapeHTML(project.description)}
            </p>

            <div class="project-tags">
                ${tagsHTML}
            </div>

            ${linkHTML}
        `;

        container.appendChild(element);

    });

}


/* =========================================================
   EXPERIENCE
========================================================= */

function populateExperience(experience) {

    const container =
        document.getElementById("experienceList");

    if (!container || !Array.isArray(experience)) return;

    container.innerHTML = "";

    experience.forEach(item => {

        const element =
            document.createElement("article");

        element.className = "experience-card";

        element.innerHTML = `
            <div class="experience-header">

                <div>

                    <h3>
                        ${escapeHTML(item.position)}
                    </h3>

                    <div class="experience-organization">
                        ${escapeHTML(item.organization)}
                    </div>

                </div>

                <div class="experience-duration">
                    ${escapeHTML(item.duration)}
                </div>

            </div>

            <p class="experience-description">
                ${escapeHTML(item.description)}
            </p>
        `;

        container.appendChild(element);

    });

}


/* =========================================================
   ACHIEVEMENTS
========================================================= */

function populateAchievements(achievements) {

    const container =
        document.getElementById(
            "achievementsGrid"
        );

    if (!container || !Array.isArray(achievements)) {
        return;
    }

    container.innerHTML = "";

    achievements.forEach(
        (achievement, index) => {

            const number =
                String(index + 1)
                    .padStart(2, "0");

            const element =
                document.createElement("article");

            element.className =
                "achievement-card";

            element.innerHTML = `
                <div class="achievement-number">
                    ${number}
                </div>

                <h3>
                    ${escapeHTML(achievement.title)}
                </h3>

                <p>
                    ${escapeHTML(
                        achievement.description
                    )}
                </p>
            `;

            container.appendChild(element);

        }
    );

}


/* =========================================================
   INTERESTS
========================================================= */

function populateInterests(interests) {

    const container =
        document.getElementById(
            "interestsList"
        );

    if (!container || !Array.isArray(interests)) {
        return;
    }

    container.innerHTML = "";

    interests.forEach(interest => {

        const element =
            document.createElement("span");

        element.className = "interest";

        element.textContent = interest;

        container.appendChild(element);

    });

}


/* =========================================================
   CONTACT
========================================================= */

function populateContact(contact) {

    if (!contact) return;

    setText(
        "contactHeading",
        contact.heading
    );

    setText(
        "contactDescription",
        contact.description
    );

    const emailButton =
        document.getElementById(
            "contactEmail"
        );

    if (emailButton && contact.email) {

        emailButton.href =
            `mailto:${contact.email}`;

    }

}
