import { useState, useEffect } from "react";
import "./index.css";

const NAVIGATIONS = ["About", "Projects", "Skills", "Contact"];

const ABOUT = {
    profilePicture: "../public/profile-picture-1.png",
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

export default function App() {
    const savedTheme = localStorage.getItem("savedTheme");
    const [theme, setTheme] = useState(savedTheme || "dark");

    useEffect(() => {
        localStorage.setItem("savedTheme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return (
        <div className={`app ${theme} bg-(--bg) text-(--text-main) min-h-screen transition-colors duration-300`}>
            <nav className="flex justify-between items-center py-5 px-8 border-b border-(--surface-border) sticky top-0 bg-(--bg)">
                <div className="font-bold text-xl text-(--accent) max-[640px]:text-lg max-[525px]:text-sm"><p><a href="./App.jsx">&lt;DevPortfolio /&gt;</a></p></div>

                <div className="flex gap-6 items-center max-[640px]:gap-[0.8rem] max-[640px]:text-[0.85rem]">
                    {NAVIGATIONS.map((nav) => (
                        <a href={`#${nav.toLowerCase()}`} className="text-(--text-muted) text-[0.95rem] transition-colors duration-200 hover:text-(--text-main)" key={nav}>{nav}</a>
                    ))}

                    <button className="bg-transparent border border-(--surface-border) text-(--text-main) py-[0.4rem] px-[0.8rem] rounded-md cursor-pointer" onClick={toggleTheme}>
                        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>
            </nav>

            <header className="max-w-220 mx-auto pt-24 px-8 pb-16 max-[640px]:text-[1.8rem]" id="about">
                <div>
                    <div className="flex gap-7 mb-6 max-[640px]:flex-col max-[640px]:items-center">
                        <img src={ABOUT.profilePicture} alt="Developer's Profile Picture" className="w-50 h-50 rounded-full border border-(--accent) max-[640px]:w-65 max-[640px]:h-65"/>
                        <div className="flex flex-col gap-4 justify-center items-start">
                            <span className="bg-(--surface) text-(--accent) border border-(--surface-border) py-[0.3rem] px-[0.8rem] rounded-[20px] text-[0.85rem]">{ABOUT.position}</span>
                            <h1 className="text-[2.5rem] leading-[1.2]">{ABOUT.title}</h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <p className="text-(--text-muted) text-[1.15rem]/[1.6]">{ABOUT.description}</p>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4">
                                <a href="#projects" className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--accent) text-[#ffffff] hover:bg-(--accent-hover)">View Projects</a>
                                <a href="#contact" className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--surface) text-(--text-main) border border-(--surface-border)">Get In Touch</a>
                            </div>

                            <a href={`../public/${ABOUT.resume}`} download={ABOUT.resume} className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--surface) text-(--text-main) border border-(--surface-border)">Download Resume <i className="fa-solid fa-file-arrow-down"></i></a>
                        </div>
                    </div>
                </div>
            </header>

            <section className="max-w-250 mx-auto py-16 px-8" id="projects">
                <h2 className="text-2xl mb-8 border-b-2 border-(--surface-border) pb-2">Featured Projects</h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                    {PROJECTS.map((project) => (
                        <div key={project.id} className="bg-(--surface) border border-(--surface-border) p-6 rounded-xl flex flex-col">
                            <h3 className="mb-2">{project.title}</h3>
                            <p className="text-(--text-muted) text-[0.95rem]/[1.5] mb-5 grow">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="bg-(--bg) border border-(--surface-border) text-xs py-[0.2rem] px-[0.6rem] rounded">{tag}</span>
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
                <h2 className="text-2xl mb-8 border-b-2 border-(--surface-border) pb-2">Technical Skills</h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
                    {Object.entries(SKILLS).map(([category, items]) => (
                        <div key={category} className="bg-(--surface) border border-(--surface-border) p-6 rounded-xl">
                            <h3 className="text-(--accent) text-[1.1rem] mb-4">{category}</h3>

                            <ul className="list-none">
                                {items.map((item) => (
                                    <li key={item} className="text-(--text-muted) text-[0.95rem] mb-2">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-250 mx-auto py-16 px-8" id="contact">
                <h2 className="text-2xl mb-8 border-b-2 border-(--surface-border) pb-2">Get In Touch</h2>

                <div className="bg-(--surface) border border-(--surface-border) p-12 rounded-xl text-center">
                    <p className="text-(--text-muted) mb-6">Interested in collaborating or discussing web development opportunities?</p>
                    <a href={`mailto:${ABOUT.email}`} className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--accent) text-[#ffffff] hover:bg-(--accent-hover)">Send an Email</a>
                </div>
            </section>

            <footer className="text-center p-8 text-(--text-muted) text-[0.85rem] border-t border-(--surface-border)">
                <p>&copy; {new Date().getFullYear()} {ABOUT.name}. Built with React & Tailwind CSS.</p>
            </footer>
        </div>
    );
}