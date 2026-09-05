import { useState } from "react";
import "./index.css";

const PROJECTS = [
    {
        id: 1,
        title: "Interactive Web Calculator",
        description: "Feature-rich calculator with keyboard support, persistent user themes, and custom audio feedback.",
        tags: ["JavaScript", "Sass", "LocalStorage", "HTML5"],
        demoUrl: "#",
        githubUrl: "#"
    },
    {
        id: 2,
        title: "Productivity & Task App",
        description: "Dynamic web application featuring state management, filtering, and responsive UI components.",
        tags: ["React", "CSS3", "REST API"],
        demoUrl: "#",
        githubUrl: "#"
    },
    {
        id: 3,
        title: "Weather & Metrics Dashboard",
        description: "Real-time dashboard utilizing asynchronous data fetching and modern component architecture.",
        tags: ["JavaScript", "Async/Await", "CSS Grid"],
        demoUrl: "#",
        githubUrl: "#"
    }
];

const SKILLS = {
    Languages: ["JavaScript (ES6+)", "HTML5", "CSS3 / Sass"],
    Concepts: ["State Management", "Async/Await", "DOM Manipulation", "Responsive Design"],
    Tools: ["Git / GitHub", "VS Code", "Chrome DevTools", "Responsively App"]
};

export default function App() {
    const [theme, setTheme] = useState("dark");

    function toggleTheme() {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    return (
        <div className={`app ${theme} bg-(--bg) text-(--text-main) min-h-screen transition-colors duration-300`}>
            <nav className="flex justify-between items-center py-5 px-8 border-b border-(--surface-border) sticky top-0 bg-(--bg)">
                <div className="font-bold text-xl text-(--accent)"><p>&lt;DevPortfolio /&gt;</p></div>

                <div className="flex gap-6 items-center max-[640px]:gap-[0.8rem] max-[640px]:text-[0.85rem]">
                    <a href="#about" className="text-(--text-muted) text-[0.95rem] transition-colors duration-200 hover:text-(--text-main)">About</a>
                    <a href="#projects" className="text-(--text-muted) text-[0.95rem] transition-colors duration-200 hover:text-(--text-main)">Projects</a>
                    <a href="#skills" className="text-(--text-muted) text-[0.95rem] transition-colors duration-200 hover:text-(--text-main)">Skills</a>
                    <a href="#contact" className="text-(--text-muted) text-[0.95rem] transition-colors duration-200 hover:text-(--text-main)">Contact</a>

                    <button className="bg-transparent border border-(--surface-border) text-(--text-main) py-[0.4rem] px-[0.8rem] rounded-md cursor-pointer" onClick={toggleTheme}>
                        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>
            </nav>

            <header className="max-w-200 mx-auto pt-24 px-8 pb-16 max-[640px]:text-[1.8rem]" id="about">
                <div>
                    <span className="bg-(--surface) text-(--accent) border border-(--surface-border) py-[0.3rem] px-[0.8rem] rounded-[20px] text-[0.85rem] inline-block mb-4">Frontend Developer</span>
                    <h1 className="text-[2.5rem] leading-[1.2] mb-4">Building responsive, high-performance web applications.</h1>
                    <p className="text-(--text-muted) text-[1.15rem]/[1.6] mb-8">I specialize in crafting clean user interfaces, modular architecture, and interactive web experiences using modern JavaScript and React.</p>

                    <div className="flex gap-4">
                        <a href="#projects" className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--accent) text-[#ffffff] hover:bg-(--accent-hover)">View Projects</a>
                        <a href="#contact" className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--surface) text-(--text-main) border border-(--surface-border)">Get In Touch</a>
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
                    <a href="mailto:francis.cortez@cvsu.edu.ph" className="py-3 px-6 rounded-lg font-semibold inline-block transition-colors duration-200 bg-(--accent) text-[#ffffff] hover:bg-(--accent-hover)">Send an Email</a>
                </div>
            </section>

            <footer className="text-center p-8 text-(--text-muted) text-[0.85rem] border-t border-(--surface-border)">
                <p>&copy; {new Date().getFullYear()} Francis Dale P. Cortez. Built with React & CSS.</p>
            </footer>
        </div>
    );
}