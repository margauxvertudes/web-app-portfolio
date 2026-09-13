import { useState, useEffect } from "react";
import "./index.css";

const NAVIGATIONS = ["About", "Projects", "Skills", "Contact"];

const ABOUT = {
    profilePicture: "/profilePics/profile-picture-1.png",
    position: "Frontend Developer",
    username: "Cha",
    name: "Margaux Ayezzalyne L. Vertudes",
    email: "vertudesmargaux2003@gmail.com",
    resume: "Resume_Vertudes.pdf",
    get title() { return `Hi, I'm ${this.username} — I build🔨 fast, responsive, and scalable web applications.`; },
    description: "I specialize in building easy-to-use interfaces, clean component architectures, and responsive web applications using React, Tailwind CSS, and Sass. My focus is on writing clean, maintainable code, keeping performance fast, and delivering smooth digital experiences from design to deployment."
};

const PROJECTS = [
    {
        id: 1,
        title: "RetroCalc – Retro Themed Web Calculator",
        description: "Retro-themed web calculator with keyboard support, persistent user themes, and custom audio feedback.",
        tags: ["JavaScript", "CSS / Sass", "LocalStorage", "Caching", "Web API", "HTML"],
        demoUrl: "#",
        githubUrl: "#"
    },
    {
        id: 2,
        title: "LovKey – Quiz-Locked Digital Love Letter App",
        description: "Digital love letter app featuring custom riddle-locked access, photo attachments, and shareable links.",
        tags: ["JavaScript", "CSS / Sass", "URL Parameter", "Cloud Image Hosting", "Web API", "HTML"],
        demoUrl: "#",
        githubUrl: "#"
    },
    {
        id: 3,
        title: "DevPortfolio – My Personal Web App Portfolio",
        description: "Responsive web app portfolio showcasing personal projects, technical skills, and interactive contact features.",
        tags: ["React", "JavaScript", "Vite", "Tailwind CSS", "CSS", "HTML"],
        demoUrl: "#",
        githubUrl: "#"
    }
];

const SKILLS = {
    Languages: ["React", "JavaScript (ES6+)", "Tailwind CSS", "Sass", "CSS3", "HTML5", "PostgreSQL", "MySQL"],
    Concepts: ["State Management", "Async/Await", "DOM Manipulation", "Event Delegation", "DOM Caching", "LocalStorage", "Cloud Media Hosting", "Progressive Web Apps (PWA)", "Offline Caching", "Responsive Design", "Web Accessibility (a11y)", "SEO Optimization", "Performance Optimization"],
    Tools: ["ChatGPT", "Gemini", "Git / GitHub", "VS Code", "Chrome DevTools", "Responsively App"]
};

const CERTIFICATES = [
    "/certificates/certificate-1.jpg",
    "/certificates/certificate-2.jpg",
    "/certificates/certificate-3.jpg",
    "/certificates/certificate-4.jpg",
];

export default function App() {
    const savedTheme = localStorage.getItem("savedTheme");
    const [theme, setTheme] = useState(savedTheme || "dark");
    const [activeCategory, setActiveCategory] = useState(null);
    const [currCert, setCurrCert] = useState(0);

    useEffect(() => {
        localStorage.setItem("savedTheme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }

    function arrowLeftCert() {
        if (currCert > 0) setCurrCert((prevCert) => prevCert - 1);
    }

    function arrowRightCert() {
        if (currCert < CERTIFICATES.length - 1) setCurrCert((prevCert) => prevCert + 1);
    }

    return (
        <div className={`app ${theme} bg-(--bg-color) text-(--txt-main-color) min-h-screen transition-colors duration-300`}>
            <nav className="flex justify-between items-center py-5 px-8 border-b border-(--cntnr-border-color) sticky top-0 bg-(--bg-color)">
                <div className="font-bold text-sm min-[525px]:text-lg sm:text-xl text-(--accent)"><p><a href="./App.jsx">&lt;DevPortfolio /&gt;</a></p></div>

                <div className="flex items-center gap-[0.8rem] sm:gap-6 text-[0.85rem] sm:text-[1rem]">
                    {NAVIGATIONS.map((nav) => (
                        <a href={`#${nav.toLowerCase()}`} key={nav} className="text-(--txt-muted-color) text-[0.95rem] transition-colors duration-200 hover:text-(--txt-main-color)">{nav}</a>
                    ))}

                    <button onClick={toggleTheme} className="bg-transparent border border-(--cntnr-border-color) text-(--txt-main-color) py-[0.4rem] px-[0.8rem] rounded-md cursor-pointer">
                        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>
            </nav>

            <header className="max-w-220 mx-auto pt-24 px-8 pb-16 text-[0.8rem] min-[525px]:text-[1rem]" id="about">
                <div className="flex flex-col">
                    <div className="flex gap-7 mb-6 flex-col sm:flex-row items-center">
                        <img src={ABOUT.profilePicture} alt="Developer's Profile Picture" className="w-60 h-60 rounded-full border border-(--accent) sm:w-50 sm:h-50" />
                        <div className="flex flex-col gap-4 justify-center items-start">
                            <span className="bg-(--cntnr-color) text-(--accent) border border-(--cntnr-border-color) py-[0.3rem] px-[0.8rem] rounded-[20px] text-[0.85rem]">{ABOUT.position}</span>
                            <h1 className="text-[2.5rem] leading-[1.2]">{ABOUT.title}</h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <p className="text-(--txt-muted-color) text-[1.15rem]/[1.6]">{ABOUT.description}</p>
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex gap-4">
                                <a href="#projects" className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--accent) text-(--cntnr-color) hover:bg-(--accent-hover)">View Projects</a>
                                <a href="#contact" className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--cntnr-color) text-(--txt-main-color) border border-(--cntnr-border-color)">Get In Touch</a>
                            </div>

                            <a href={`/${ABOUT.resume}`} download={ABOUT.resume} className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--cntnr-color) text-(--txt-main-color) border border-(--cntnr-border-color)">Download Resume <i className="fa-solid fa-file-arrow-down"></i></a>
                        </div>
                    </div>
                </div>
            </header>

            <section className="max-w-250 mx-auto py-16 px-8" id="projects">
                <h2 className="text-2xl mb-6 md:mb-8 border-b-2 border-(--cntnr-border-color) pb-2">Featured Projects</h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                    {PROJECTS.map((project) => (
                        <div key={project.id} className="bg-(--cntnr-color) border border-(--cntnr-border-color) p-6 rounded-xl flex flex-col">
                            <h3 className="mb-2">{project.title}</h3>
                            <p className="text-(--txt-muted-color) text-[0.95rem]/[1.5] mb-5 grow">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="bg-(--bg-color) border border-(--cntnr-border-color) text-xs py-[0.2rem] px-[0.6rem] rounded">{tag}</span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <a href={project.demoUrl} className="text-(--accent) text-[0.9rem] font-semibold">Live Demo &rarr;</a>
                                <a href={project.githubUrl} className="text-(--accent) text-[0.9rem] font-semibold">GitHub &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-250 mx-auto py-16 px-8" id="skills">
                <h2 className="text-2xl mb-6 md:mb-8 border-b-2 border-(--cntnr-border-color) pb-2">Technical Skills</h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
                    {Object.entries(SKILLS).map(([category, items]) => (
                        <div key={category} className="bg-(--cntnr-color) border border-(--cntnr-border-color) p-6 rounded-xl">
                            <h3 className="text-(--accent) text-[1.1rem] mb-4">{category}</h3>

                            <ul className="list-none">
                                {items.slice(0, 5).map((item) => (
                                    <li key={item} className="text-(--txt-muted-color) text-[0.95rem] mb-2">{item}</li>
                                ))}
                            </ul>

                            <a href="#skills" onClick={() => setActiveCategory(category)} className="text-(--accent) text-[0.9rem] font-semibold inline-block mt-3">Show More &rarr;</a>
                        </div>
                    ))}
                </div>

                {activeCategory && (
                    <div onClick={() => setActiveCategory(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-7">
                        <div onClick={(e) => e.stopPropagation()} className="bg-(--cntnr-color) border border-(--cntnr-border-color) rounded-xl p-6 w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-(--accent) text-xl font-bold">{activeCategory}</h2>
                                <button onClick={() => setActiveCategory(null)} className="text-(--txt-muted-color) hover:text-white text-xl font-bold cursor-pointer mr-2">&times;</button>
                            </div>

                            <div className="overflow-y-auto flex-1 pr-2">
                                <ul className="list-none">
                                    {SKILLS[activeCategory].map((item) => (
                                        <li key={item} className="text-(--txt-muted-color) text-base py-2">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <section className="max-w-250 mx-auto py-16 px-8" id="certificates">
                <h2 className="text-2xl mb-6 md:mb-8 border-b-2 border-(--cntnr-border-color) pb-2">Certifications</h2>

                <div className="flex items-center justify-center gap-2 sm:gap-4">
                    <button onClick={arrowLeftCert} aria-label="Previous Certificate" className="flex items-center justify-center p-3 rounded-lg text-(--txt-muted-color) hover:text-(--accent) transition-colors shrink-0">
                        <i className="fa-solid fa-chevron-left text-lg"></i>
                    </button>

                    <div className="w-full max-w-3xl aspect-4/3 sm:aspect-16/10 flex items-center justify-center overflow-hidden">
                        <img src={CERTIFICATES[currCert]} alt="Developer's Certificate" className="max-w-full max-h-full w-auto h-auto object-contain" />
                    </div>

                    <button onClick={arrowRightCert} aria-label="Next Certificate" className="flex items-center justify-center p-3 rounded-lg text-(--txt-muted-color) hover:text-(--accent) transition-colors shrink-0">
                        <i className="fa-solid fa-chevron-right text-lg"></i>
                    </button>
                </div>
            </section>

            <section className="max-w-250 mx-auto py-16 px-8" id="contact">
                <h2 className="text-2xl mb-6 md:mb-8 border-b-2 border-(--cntnr-border-color) pb-2">Get In Touch</h2>

                <div className="bg-(--cntnr-color) border border-(--cntnr-border-color) p-12 rounded-xl text-center">
                    <p className="text-(--txt-muted-color) mb-6">Interested in collaborating or discussing web development opportunities?</p>
                    <a href={`mailto:${ABOUT.email}`} className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--accent) text-(--cntnr-color) hover:bg-(--accent-hover)">Send an Email</a>
                </div>
            </section>

            <footer className="text-center p-8 text-(--txt-muted-color) text-[0.85rem] border-t border-(--cntnr-border-color)">
                <p>&copy; {new Date().getFullYear()} {ABOUT.name}. Built with React & Tailwind CSS.</p>
            </footer>
        </div>
    );
}