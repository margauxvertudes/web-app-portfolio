import { useState, useRef, useEffect } from "react";
import { useFloating, autoUpdate, offset, flip, shift, arrow, FloatingArrow } from "@floating-ui/react";
import { FaEnvelope, FaPhone, FaFacebook } from "react-icons/fa6";
import "./index.css";

const NAVIGATIONS = ["About", "Projects", "Skills", "Contacts"];

const ABOUT = {
    name: "Margaux Ayezzalyne L. Vertudes",
    username: "Cha",
    position: "Frontend Developer",
    profilePicture: "/profilePics/profile-picture-1.png",
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

const descriptions = {
    "State Management": "Tracking and controlling application data as it changes over time to ensure the user interface accurately reflects the current state across different components.",
    "Async/Await": "Syntactic sugar built on JavaScript Promises that lets you write asynchronous code in a clean, synchronous-looking style using async and await.",
    "DOM Manipulation": "Using JavaScript to dynamically read, modify, add, or delete elements, attributes, and styles within a web page's Document Object Model.",
    "Event Delegation": "A performance pattern where a single event listener is attached to a parent element to handle events triggered by present or future child elements via event bubbling.",
    "DOM Caching": "Storing references to frequently accessed DOM elements in JavaScript variables to prevent expensive, repeated searches through the document tree.",
    "LocalStorage": "A key-value browser storage API that saves up to 5–10MB of persistent, text-based data per domain with no expiration date.",
    "Cloud Media Hosting": "Storing and serving media assets (images, videos, audio) on remote cloud infrastructure optimized for fast delivery, transformation, and scalability.",
    "Progressive Web Apps (PWA)": "Web applications that leverage modern APIs, service workers, and web app manifests to deliver native-app-like features such as push notifications and offline access.",
    "Offline Caching": "Storing essential assets and network responses locally (typically using Service Workers and the Cache API) so a web app remains functional without internet connectivity.",
    "Responsive Design": "An approach using flexible layouts, fluid images, and CSS media queries to ensure web content automatically adapts cleanly to any screen size or device type.",
    "Web Accessibility (a11y)": "Designing and building web applications so people with disabilities—including visual, auditory, motor, or cognitive impairments—can navigate and interact with them effectively.",
    "SEO Optimization": "Structuring and refining web pages, content, and metadata to improve their visibility and ranking in search engine results pages.",
    "Performance Optimization": "A set of techniques—like minification, lazy loading, and code splitting—used to decrease page load times and improve interaction speed and smoothness."
};

const CERTIFICATES = [
    "/certificates/certificate-1.jpg",
    "/certificates/certificate-2.jpg",
    "/certificates/certificate-3.jpg",
    "/certificates/certificate-4.jpg",
];

const CONTACTS = [
    {
        email: "vertudesmargaux2003@gmail.com",
        title: "Send an Email",
        description: "Want to talk or ask something? Send an email anytime and let's chat."
    },
    {
        phone: "+63 955 942 6287",
        title: "Give Me a Call",
        description: "Prefer a direct conversation? You can reach me during business hours."
    },
    {
        facebook: "https://www.facebook.com/ayezza.margaux",
        title: "Connect on Social Media",
        description: "Follow me for updates and feel free to send a message."
    }
];

function TechnicalSkillsModal({ activeCategory, setActiveCategory }) {
    const dialogRef = useRef(null);

    function handleBackdropClick(e) {
        if (e.target === dialogRef.current) setActiveCategory(null);
    }

    useEffect(() => {
        if (dialogRef.current && activeCategory) dialogRef.current.showModal();
    }, [activeCategory]);

    return (
        <dialog ref={dialogRef} onCancel={() => setActiveCategory(null)} onClick={handleBackdropClick} className="bg-(--cntnr-color) w-full max-w-sm min-[515px]:max-w-md min-[570px]:max-w-lg max-h-[80vh] m-auto border border-(--cntnr-border-color) rounded-xl shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm">
            <div className="p-6 rounded-xl flex flex-col">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-(--accent) text-xl font-bold">{activeCategory}</h2>
                    <button onClick={() => setActiveCategory(null)} aria-label="Close" className="text-(--txt-muted-color) px-2 text-lg font-bold rounded-md cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
                </div>

                <div className="pr-2 overflow-y-auto flex-1">
                    <ul className="list-none">
                        {SKILLS[activeCategory].map((item) => (
                            <li key={item} className="text-(--txt-muted-color) py-2 text-base flex items-center gap-2">
                                {item}
                                {activeCategory === "Concepts" && (
                                    <DynamicToolTip description={descriptions[item]}>
                                        <i className="fa-solid fa-circle-question text-(--txt-muted-color) text-sm opacity-45 transition-colors hover:text-(--accent)"></i>
                                    </DynamicToolTip>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </dialog>
    );
}

function DynamicToolTip({ description, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const arrowRef = useRef(null);

    const { refs: toolTipRefs, floatingStyles: toolTipStyles, context } = useFloating({
        placement: "top-end",
        open: isOpen,
        middleware: [offset(12), flip(), shift({ padding: 8 }), arrow({ element: arrowRef, padding: 12 })],
        whileElementsMounted: autoUpdate
    });

    return (
        <span ref={toolTipRefs.setReference} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className="cursor-pointer relative">
            {children}
            {isOpen && (
                <div ref={toolTipRefs.setFloating} style={toolTipStyles} className="bg-(--cntnr-color) text-(--txt-main-color) w-max max-w-xs p-2.5 text-xs border border-(--cntnr-border-color) rounded-lg shadow-lg z-1">
                    <p className="leading-relaxed">{description}</p>
                    <FloatingArrow ref={arrowRef} context={context} fill="var(--cntnr-color)" stroke="var(--cntnr-border-color)" strokeWidth={1}></FloatingArrow>
                </div>
            )}
        </span>
    );
}

function CertificationsModal({ certIndex, activeCert, setActiveCert }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (dialogRef.current && activeCert) dialogRef.current.showModal();
    }, [activeCert]);

    return (
        <dialog ref={dialogRef} onCancel={() => setActiveCert(null)} onClick={() => setActiveCert(false)} className="bg-transparent w-[90vw] max-w-250 max-h-[90vh] m-auto p-0 border-none outline-none flex justify-center items-center backdrop:bg-black/60 backdrop:backdrop-blur-sm">
            <img src={CERTIFICATES[certIndex]} alt="Developer's Certificate" className="max-w-full max-h-full w-auto h-auto rounded-md cursor-pointer object-contain" />
        </dialog>
    );
}

export default function App() {
    const savedTheme = localStorage.getItem("savedTheme");
    const [theme, setTheme] = useState(savedTheme || "dark");
    const [activeCategory, setActiveCategory] = useState(null);
    const [certIndex, setCertIndex] = useState(0);
    const [activeCert, setActiveCert] = useState(false);

    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }

    function handleArrowLeft() {
        if (certIndex > 0) setCertIndex((prevCertIndex) => prevCertIndex - 1);
    }

    function handleArrowRight() {
        if (certIndex < CERTIFICATES.length - 1) setCertIndex((prevCertIndex) => prevCertIndex + 1);
    }

    useEffect(() => {
        localStorage.setItem("savedTheme", theme);
    }, [theme]);

    return (
        <div className={`app ${theme} bg-(--bg-color) text-(--txt-main-color) min-h-screen transition-colors duration-300`}>
            <nav className="bg-(--bg-color) py-5 px-8 border-b border-(--cntnr-border-color) flex justify-between items-center sticky top-0">
                <div className="text-(--accent) font-bold text-xs min-[525px]:text-lg sm:text-xl"><p><a href="./App.jsx">&lt;DevPortfolio /&gt;</a></p></div>

                <div className="text-[0.75rem] sm:text-[1rem] flex items-center gap-[0.6rem] sm:gap-6">
                    {NAVIGATIONS.map((nav) => (
                        <a href={`#${nav.toLowerCase()}`} key={nav} className="text-(--txt-muted-color) transition-colors duration-200 hover:text-(--txt-main-color)">{nav}</a>
                    ))}

                    <button onClick={toggleTheme} className="bg-transparent text-(--txt-main-color) py-[0.4rem] px-[0.8rem] border border-(--cntnr-border-color) rounded-md cursor-pointer">
                        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </div>
            </nav>

            <header className="max-w-220 mx-auto pt-24 px-8 pb-16 text-[0.8rem] min-[525px]:text-[1rem]" id="about">
                <div className="flex flex-col">
                    <div className="mb-6 flex items-center flex-col sm:flex-row gap-7">
                        <img src={ABOUT.profilePicture} alt="Developer's Profile Picture" className="w-60 sm:w-50 h-60 sm:h-50 border border-(--accent) rounded-full" />
                        <div className="flex justify-center items-start flex-col gap-4">
                            <span className="bg-(--cntnr-color) text-(--accent) py-[0.3rem] px-[0.8rem] text-[0.85rem] border border-(--cntnr-border-color) rounded-[20px]">{ABOUT.position}</span>
                            <h1 className="text-[2.5rem] leading-[1.2]">{ABOUT.title}</h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <p className="text-(--txt-muted-color) text-[1.15rem]/[1.6]">{ABOUT.description}</p>
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex gap-4">
                                <a href="#projects" className="bg-(--accent) text-(--cntnr-color) py-3 px-6 font-semibold rounded-lg inline-block transition-colors duration-200 hover:bg-(--accent-hover)">View Projects</a>
                                <a href="#contacts" className="bg-(--cntnr-color) text-(--txt-main-color) py-3 px-6 font-semibold border border-(--cntnr-border-color) rounded-lg inline-block transition-colors duration-200">Get In Touch</a>
                            </div>

                            <a href={`/${ABOUT.resume}`} download={ABOUT.resume} className="bg-(--cntnr-color) text-(--txt-main-color) py-3 px-6 font-semibold border border-(--cntnr-border-color) rounded-lg inline-block transition-colors duration-200">Download Resume <i className="fa-solid fa-file-arrow-down"></i></a>
                        </div>
                    </div>
                </div>
            </header>

            <section className="max-w-250 mx-auto py-16 px-8" id="projects">
                <h2 className="mb-6 md:mb-8 pb-2 text-2xl border-b-2 border-(--cntnr-border-color)">Featured Projects</h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                    {PROJECTS.map((project) => (
                        <div key={project.id} className="bg-(--cntnr-color) p-6 border border-(--cntnr-border-color) rounded-xl flex flex-col">
                            <h3 className="mb-2">{project.title}</h3>
                            <p className="text-(--txt-muted-color) mb-5 text-[0.95rem]/[1.5] grow">{project.description}</p>

                            <div className="mb-5 flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="bg-(--bg-color) py-[0.2rem] px-[0.6rem] text-xs border border-(--cntnr-border-color) rounded">{tag}</span>
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
                <h2 className="mb-6 md:mb-8 pb-2 text-2xl border-b-2 border-(--cntnr-border-color)">Technical Skills</h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
                    {Object.entries(SKILLS).map(([category, items]) => (
                        <div key={category} className="bg-(--cntnr-color) p-6 border border-(--cntnr-border-color) rounded-xl">
                            <h3 className="text-(--accent) mb-4 text-[1.1rem]">{category}</h3>

                            <ul className="list-none">
                                {items.slice(0, 5).map((item) => (
                                    <li key={item} className="text-(--txt-muted-color) mb-2 text-[0.95rem]">{item}</li>
                                ))}
                            </ul>

                            <a href="#skills" onClick={() => setActiveCategory(category)} className="text-(--accent) mt-3 text-[0.9rem] font-semibold inline-block">Show More &rarr;</a>
                        </div>
                    ))}
                </div>

                {activeCategory && <TechnicalSkillsModal activeCategory={activeCategory} setActiveCategory={setActiveCategory}></TechnicalSkillsModal>}
            </section>

            <section className="max-w-250 mx-auto py-16 px-8" id="certificates">
                <h2 className="mb-6 md:mb-8 pb-2 text-2xl border-b-2 border-(--cntnr-border-color)">Certifications</h2>

                <div className="flex justify-center items-center gap-2 sm:gap-4">
                    <button onClick={handleArrowLeft} aria-label="Previous Certificate" className="text-(--txt-muted-color) p-3 cursor-pointer flex justify-center items-center rounded-lg transition-colors shrink-0 hover:text-(--accent)">
                        <i className="fa-solid fa-chevron-left text-lg"></i>
                    </button>

                    <div className="w-full max-w-3xl aspect-4/3 sm:aspect-16/10 flex justify-center items-center overflow-hidden">
                        <img src={CERTIFICATES[certIndex]} alt="Developer's Certificate" onClick={() => setActiveCert(true)} className="max-w-full max-h-full w-auto h-auto rounded-md cursor-pointer object-contain" />
                    </div>

                    <button onClick={handleArrowRight} aria-label="Next Certificate" className="text-(--txt-muted-color) p-3 cursor-pointer flex justify-center items-center rounded-lg transition-colors shrink-0 hover:text-(--accent)">
                        <i className="fa-solid fa-chevron-right text-lg"></i>
                    </button>

                    {activeCert && <CertificationsModal certIndex={certIndex} activeCert={activeCert} setActiveCert={setActiveCert}></CertificationsModal>}
                </div>
            </section>

            <section className="max-w-250 mx-auto py-16 px-8" id="contacts">
                <h2 className="mb-6 md:mb-8 pb-2 text-2xl border-b-2 border-(--cntnr-border-color)">Get In Touch</h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
                    {CONTACTS.map((category, index) => {
                        const isEmail = "email" in category;
                        const isPhone = "phone" in category;
                        const isFacebook = "facebook" in category;

                        return (
                            <div key={index} className="bg-(--cntnr-color) p-6 text-center border border-(--cntnr-border-color) rounded-xl">
                                {isEmail && <FaEnvelope className="text-(--accent) mx-auto text-3xl"></FaEnvelope>}
                                {isPhone && <FaPhone className="text-(--accent) mx-auto text-3xl"></FaPhone>}
                                {isFacebook && <FaFacebook className="text-(--accent) mx-auto text-3xl"></FaFacebook>}

                                <h2 className="text-(--accent) pt-3 pb-2">{category.title}</h2>
                                <p className="pb-4 text-[0.9rem]">{category.description}</p>

                                {isEmail && <a href={`mailto:${CONTACTS.email}`} className="bg-(--accent) text-(--cntnr-color) py-3 px-6 text-[0.85rem] font-semibold rounded-lg inline-block transition-colors duration-200 hover:bg-(--accent-hover)">Send an Email</a>}
                                {isPhone && (
                                    <>
                                        <p className="text-(--accent)">{category.phone}</p>
                                        <p className="text-(--txt-muted-color) text-xs">[Note: Best for urgent matters.]</p>
                                    </>
                                )}
                                {isFacebook && <a href="https://www.facebook.com/ayezza.margaux" target="_blank" className="max-w-full text-sm break-all inline-block">[<span className="text-(--accent)">https://www.facebook.com/ayezza.margaux</span>]</a>}
                            </div>
                        );
                    })}
                </div>
            </section>

            <footer className="text-(--txt-muted-color) p-8 text-[0.85rem] text-center border-t border-(--cntnr-border-color)">
                <p>&copy; {new Date().getFullYear()} {ABOUT.name}. Built with React & Tailwind CSS.</p>
            </footer>
        </div>
    );
}