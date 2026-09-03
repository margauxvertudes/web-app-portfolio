import { useState } from "react";
import "./App.css";

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
        <div className={`app ${theme}`}>
            <nav className="navbar">
                <div className="logo">&lt;DevPortfolio /&gt;</div> {/* SHOULD WRAP IT IN TEXT TAG */}

                <div className="nav-links">
                    <a href="#about">About</a>
                    <a href="#projects">Projects</a>
                    <a href="#skills">Skills</a>
                    <a href="#contact">Contact</a>

                    <button className="theme-toggle" onClick={toggleTheme}>
                        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>
            </nav>

            <header className="hero" id="about">
                <div className="hero-content">
                    <span className="badge">Frontend Developer</span>
                    <h1>Building responsive, high-performance web applications.</h1>
                    <p>I specialize in crafting clean user interfaces, modular architecture, and interactive web experiences using modern JavaScript and React.</p>

                    <div className="hero-cta">
                        <a href="#projects" className="btn btn-primary">View Projects</a> {/* THIS SHOULD BE A BUTTON */}
                        <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                    </div>
                </div>
            </header>

            <section className="section" id="projects">
                <h2 className="section-title">Featured Projects</h2>

                <div className="projects-grid">
                    {PROJECTS.map((project) => (
                        <div key={project.id} className="project-card">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>

                            <div className="tags">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>

                            <div className="card-links">
                                <a href={project.demoUrl} className="link">Live Demo &rarr;</a>
                                <a href={project.githubUrl} className="link">GitHub &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section" id="skills">
                <h2 className="section-title">Technical Skills</h2>

                <div className="skills-grid">
                    {Object.entries(SKILLS).map(([category, items]) => (
                        <div key={category} className="skill-category">
                            <h3>{category}</h3>

                            <ul>
                                {items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section" id="contact">
                <h2 className="section-title">Get In Touch</h2>

                <div className="contact-card">
                    <p>Interested in collaborating or discussing web development opportunities?</p>
                    <a href="mailto:your.email@example.com" className="btn btn-primary">Send an Email</a> {/* THIS SHOULD BE A BUTTON */}
                </div>
            </section>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Francis Dale P. Cortez. Built with React & CSS.</p>
            </footer>
        </div>
    );
}