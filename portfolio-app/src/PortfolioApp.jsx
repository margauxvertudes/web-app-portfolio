import { useState, useRef, useEffect } from "react";
import { useFloating, autoUpdate, offset, flip, shift, arrow, FloatingArrow } from "@floating-ui/react";
import { FaEnvelope, FaPhone, FaFacebook } from "react-icons/fa6";
import "./index.css";

const NAVIGATIONS = ["About", "Projects", "Skills", "Contacts"];

const ABOUT = {
    name: "Margaux Ayezzalyne L. Vertudes",
    username: "Cha",
    position: "Frontend Developer",
    profilePicture: "/profilePics/profile-picture-3.png",
    resume: "Resume_Vertudes.pdf",
    get title() { return `Hi, I'm ${this.username} — I build🔨 fast, responsive, and scalable web applications.`; },
    description: "I specialize in building easy-to-use interfaces, clean component architectures, and responsive web applications using React, Tailwind CSS, and Sass. My focus is on writing clean, maintainable code, keeping performance fast, and delivering smooth digital experiences from design to deployment."
};

const RetroCalc = "/slides/RetroCalc";
const LovKey = "/slides/LovKey";
const MA_Codeworks = "/slides/MA_Codeworks";

const PROJECTS = [
    {
        id: "RetroCalc",
        icon: `${RetroCalc}/slide-1.png`,
        title: "RetroCalc – Retro Themed Web Calculator",
        description: "Retro-themed web calculator with keyboard support, persistent user themes, and custom audio feedback.",
        tags: ["JavaScript", "CSS / Sass", "LocalStorage", "Caching", "Web API", "HTML"],
        githubUrl: "https://github.com/deyl-1999/retro-calculator.git",
        deployedUrl: "https://retro-calc.vercel.app/"
    },
    {
        id: "LovKey",
        icon: `${LovKey}/slide-1.png`,
        title: "LovKey – Quiz-Locked Digital Love Letter App",
        description: "Digital love letter app featuring custom riddle-locked access, photo attachments, and shareable links.",
        tags: ["JavaScript", "CSS / Sass", "URL Parameter", "Cloud Image Hosting", "Web API", "HTML"],
        githubUrl: "https://github.com/deyl-1999/love-letter.git",
        deployedUrl: "https://lovkey.vercel.app/"
    },
    {
        id: "MA Codeworks",
        icon: `${MA_Codeworks}/slide-1.png`,
        title: "MA Codeworks – My Personal Web App Portfolio",
        description: "Responsive web app portfolio showcasing personal projects, technical skills, and interactive contact features.",
        tags: ["React", "JavaScript", "Vite", "Tailwind CSS", "CSS", "HTML"],
        githubUrl: "https://github.com/deyl-1999/portfolio-app.git",
        deployedUrl: "#"
    }
];

const PROJECTS_slides = {
    "RetroCalc": [`${RetroCalc}/slide-1.png`, `${RetroCalc}/slide-2.png`, `${RetroCalc}/slide-3.png`, `${RetroCalc}/slide-4.png`, `${RetroCalc}/slide-5.png`, `${RetroCalc}/slide-6.png`],
    "LovKey": [`${LovKey}/slide-1.png`, `${LovKey}/slide-2.png`, `${LovKey}/slide-3.png`, `${LovKey}/slide-4.png`, `${LovKey}/slide-5.png`, `${LovKey}/slide-6.png`, `${LovKey}/slide-7.png`],
    "MA Codeworks": [`${MA_Codeworks}/slide-1.png`, `${MA_Codeworks}/slide-2.png`, `${MA_Codeworks}/slide-3.png`, `${MA_Codeworks}/slide-4.png`, `${MA_Codeworks}/slide-5.png`, `${MA_Codeworks}/slide-6.png`, `${MA_Codeworks}/slide-7.png`, `${MA_Codeworks}/slide-8.png`, `${MA_Codeworks}/slide-9.png`, `${MA_Codeworks}/slide-10.png`]
};

const PROJECTS_descriptions = {
    "RetroCalc": [
        "This is the RetroCalc app icon, featuring a custom 3D mechanical keycap design that sets the playful aesthetic of the project.",
        "This screen displays the main calculator interface, complete with an active math expression display and quick utility controls.",
        "This module enables users to switch visual themes on the fly, offering options like Default, Retro, and Candy modes in both light and dark variations.",
        "This feature lets users select custom mechanical keyboard audio feedback, choosing sound profiles like \"Clicky,\" \"Thocky,\" or \"Creamy\" for keypresses.",
        "This preview shows the calculator interface styled in the Retro Light theme with muted vintage keycaps.",
        "This preview showcases the high-contrast Candy Dark theme, optimized for dark mode with pastel accent colors."
    ],
    "LovKey": [
        "This is the LovKey app icon, featuring a custom golden key and heart emblem that defines the romantic theme of the application.",
        "This screen serves as the main landing UI, featuring a sealed interactive wax-stamped envelope and quick options to compose or share a letter.",
        "This modal allows creators to compose a personalized message, set up custom quiz riddles, and optionally upload a photo attachment.",
        "This step enables creators to define multiple-choice answers for their custom riddle and set the correct key to unlock the note.",
        "This interactive challenge modal prompts recipients to solve a personalized riddle and select the correct answer to unlock the hidden message.",
        "This view reveals the unlocked digital love letter written by the sender, complete with floating background particle effects.",
        "This view presents the optional photo attachment formatted as a classic Polaroid picture frame alongside the message content."
    ],
    "MA Codeworks": [
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, expedita temporibus ipsam nemo molestiae totam quo.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, expedita temporibus ipsam nemo molestiae totam quo.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, expedita temporibus ipsam nemo molestiae totam quo.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, expedita temporibus ipsam nemo molestiae totam quo.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, expedita temporibus ipsam nemo molestiae totam quo.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, expedita temporibus ipsam nemo molestiae totam quo.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, expedita temporibus ipsam nemo molestiae totam quo.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, expedita temporibus ipsam nemo molestiae totam quo.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, expedita temporibus ipsam nemo molestiae totam quo.",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, expedita temporibus ipsam nemo molestiae totam quo."
    ]
};

const SKILLS = {
    Languages: ["React", "JavaScript (ES6+)", "Tailwind CSS", "Sass", "CSS3", "HTML5", "PostgreSQL", "MySQL"],
    Concepts: ["State Management", "Async/Await", "DOM Manipulation", "Event Delegation", "DOM Caching", "LocalStorage", "Cloud Media Hosting", "Progressive Web Apps (PWA)", "Offline Caching", "Responsive Design", "Web Accessibility (a11y)", "SEO Optimization", "Performance Optimization"],
    Tools: ["ChatGPT", "Gemini", "Git / GitHub", "VS Code", "Chrome DevTools", "Responsively App"]
};

const SKILLS_descriptions = {
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

const CERTIFICATES_descriptions = [
    "This is a Certificate of Completion awarded for successfully finalizing all requirements for the 'Agile Workflow Optimization Project' (Issued: August 14, 2025).",
    "This is an Award of Excellence in Coding presented in recognition of outstanding performance and contribution to high-quality code implementation (Issued: October 26, 2026).",
    "This is a Certificate of Achievement acknowledging successful completion of the program in Advanced Cloud Architecture (Issued: March 10, 2026).",
    "This is an Innovation & Problem Solving Award given for demonstrating exceptional creativity and problem-solving skills in software development challenges (Issued: June 02, 2026)."
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

function FeaturedProjectsModal({ activeDemo, setActiveDemo, theme }) {
    const [slideIndex, setSlideIndex] = useState(0);
    const dialogRef = useRef(null);

    function handleArrowLeft() {
        if (slideIndex > 0) setSlideIndex((prevSlideIndex) => prevSlideIndex - 1);
    }

    function handleArrowRight() {
        if (slideIndex < PROJECTS_slides[activeDemo].length - 1) setSlideIndex((prevSlideIndex) => prevSlideIndex + 1);
    }

    function handleBackdropClick(e) {
        if (e.target === dialogRef.current) setActiveDemo(null);
    }

    useEffect(() => {
        if (dialogRef.current && activeDemo) dialogRef.current.showModal();
    }, [activeDemo]);

    return (
        <dialog ref={dialogRef} onCancel={() => setActiveDemo(null)} onClick={handleBackdropClick} className="bg-(--cntnr-color)/40 w-full max-w-sm min-[575px]:max-w-lg min-[640px]:max-w-xl min-[730px]:max-w-2xl min-[830px]:max-w-3xl min-[960px]:max-w-4xl max-h-[80vh] m-auto rounded-xl backdrop:bg-black/60 backdrop:backdrop-blur-sm">
            <div className="flex flex-col gap-5">
                <header className="px-5 pt-3 flex justify-between items-center">
                    <h2 className={`${theme === "dark" ? "text-(--accent)" : "text-gray-800"} text-xl font-bold`}>{activeDemo}</h2>
                    <button onClick={() => setActiveDemo(null)} aria-label="Close" className={`${theme === "dark" ? "text-(--txt-muted-color)" : "text-white"} px-2 text-lg font-bold rounded-md cursor-pointer`}><i className="fa-solid fa-xmark"></i></button>
                </header>

                <section className="px-10 flex justify-center items-center gap-2 sm:gap-4">
                    <button onClick={handleArrowLeft} aria-label="Previous Slide" className="text-white p-3 cursor-pointer flex justify-center items-center rounded-lg transition-colors shrink-0 hover:text-(--accent)">
                        <i className="fa-solid fa-chevron-left text-lg"></i>
                    </button>

                    <div className="w-full max-w-3xl aspect-4/3 sm:aspect-16/10 flex justify-center items-center overflow-hidden">
                        <img src={PROJECTS_slides[activeDemo][slideIndex]} alt={`${activeDemo}'s User Interface`} className="text-(--txt-muted-color) max-w-full max-h-full w-auto h-auto rounded-md object-contain" />
                    </div>

                    <button onClick={handleArrowRight} aria-label="Next Slide" className="text-white p-3 cursor-pointer flex justify-center items-center rounded-lg transition-colors shrink-0 hover:text-(--accent)">
                        <i className="fa-solid fa-chevron-right text-lg"></i>
                    </button>
                </section>

                <div className="bg-(--cntnr-color) px-10 py-5 rounded-bl-xl rounded-br-xl">
                    <p className={`${theme === "dark" ? "text-(--txt-muted-color)" : "text-gray-800"}`}>{PROJECTS_descriptions[activeDemo][slideIndex]}</p>
                </div>
            </div>
        </dialog>
    );
}

function TechnicalSkillsModal({ activeSkill, setActiveSkill }) {
    const dialogRef = useRef(null);

    function handleBackdropClick(e) {
        if (e.target === dialogRef.current) setActiveSkill(null);
    }

    useEffect(() => {
        if (dialogRef.current && activeSkill) dialogRef.current.showModal();
    }, [activeSkill]);

    return (
        <dialog ref={dialogRef} onCancel={() => setActiveSkill(null)} onClick={handleBackdropClick} className="bg-(--cntnr-color) w-full max-w-sm min-[515px]:max-w-md min-[570px]:max-w-lg max-h-[80vh] m-auto border border-(--cntnr-border-color) rounded-xl shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm">
            <div className="p-6 rounded-xl flex flex-col">
                <header className="mb-6 flex justify-between items-center">
                    <h2 className="text-(--accent) text-xl font-bold">{activeSkill}</h2>
                    <button onClick={() => setActiveSkill(null)} aria-label="Close" className="text-(--txt-muted-color) px-2 text-lg font-bold rounded-md cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
                </header>

                <section className="pr-2 overflow-y-auto flex-1">
                    <ul className="list-none">
                        {SKILLS[activeSkill].map((item) => (
                            <li key={item} className="text-(--txt-muted-color) py-2 text-base flex items-center gap-2">
                                {item}
                                {activeSkill === "Concepts" && (
                                    <DynamicToolTip description={SKILLS_descriptions[item]}>
                                        <i className="fa-solid fa-circle-question text-(--txt-muted-color) text-sm opacity-45 transition-colors hover:text-(--accent)"></i>
                                    </DynamicToolTip>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
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
                    <FloatingArrow ref={arrowRef} context={context} fill="var(--cntnr-color)" stroke="var(--cntnr-border-color)" strokeWidth={1} />
                </div>
            )}
        </span>
    );
}

function CertificationsModal({ certIndex, isCertActive, setIsCertActive }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (dialogRef.current && isCertActive) dialogRef.current.showModal();
    }, [isCertActive]);

    return (
        <dialog ref={dialogRef} onCancel={() => setIsCertActive(false)} onClick={() => setIsCertActive(false)} className="bg-transparent w-[90vw] max-w-250 max-h-[90vh] m-auto p-0 border-none outline-none flex justify-center items-center backdrop:bg-black/60 backdrop:backdrop-blur-sm">
            <img src={CERTIFICATES[certIndex]} alt="Developer's Certificate" className="max-w-full max-h-full w-auto h-auto rounded-md cursor-pointer object-contain" />
        </dialog>
    );
}

export default function PortfolioApp() {
    const savedTheme = localStorage.getItem("savedTheme");
    const [theme, setTheme] = useState(savedTheme || "light");
    const [activeDemo, setActiveDemo] = useState(null);
    const [isProjExtended, setIsProjExtended] = useState(false);
    const [activeSkill, setActiveSkill] = useState(null);
    const [certIndex, setCertIndex] = useState(0);
    const [isCertActive, setIsCertActive] = useState(false);

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
                <div className="text-(--accent) font-bold text-xs min-[525px]:text-lg sm:text-xl"><p><a href="./App.jsx">&lt;MA Codeworks /&gt;</a></p></div>

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
                    {(isProjExtended ? PROJECTS : PROJECTS.slice(0, 3)).map((project) => {
                        const isDeployed = Boolean(project.deployedUrl && project.deployedUrl !== "#");

                        return (
                            <div key={project.id} className="bg-(--cntnr-color) p-6 border border-(--cntnr-border-color) rounded-xl flex flex-col">
                                <div className="mb-2 flex items-center gap-1">
                                    <img src={(project.icon && project.icon !== "#") ? project.icon : "/default-icon.png"} alt="Application's Icon" className="w-12 h-12" />
                                    <h3>{project.title}</h3>
                                </div>

                                <p className="text-(--txt-muted-color) mb-5 text-[0.95rem]/[1.5] grow">{project.description}</p>

                                <div className="mb-5 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="bg-(--bg-color) py-[0.2rem] px-[0.6rem] text-xs border border-(--cntnr-border-color) rounded">{tag}</span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <a href="#projects" onClick={() => setActiveDemo(project.id)} className="text-(--accent) text-[0.9rem] font-semibold">Demo &rarr;</a>
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-(--accent) text-[0.9rem] font-semibold">GitHub &rarr;</a>
                                    {isDeployed && <a href={project.deployedUrl} target="_blank" rel="noopener noreferrer" className="text-(--accent) ml-auto text-[0.9rem] font-semibold">Open &rarr;</a>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-5 flex justify-end items-center">
                    {PROJECTS.length > 3 && (
                        isProjExtended ? (
                            <a href="#projects" onClick={() => setIsProjExtended(false)} className="text-(--accent) text-[0.9rem] font-semibold">Show Less</a>
                        ) : (
                            <a href="#projects" onClick={() => setIsProjExtended(true)} className="text-(--accent) text-[0.9rem] font-semibold">Show More &rarr;</a>
                        )
                    )}
                </div>

                {activeDemo && <FeaturedProjectsModal activeDemo={activeDemo} setActiveDemo={setActiveDemo} theme={theme} />}
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

                            <a href="#skills" onClick={() => setActiveSkill(category)} className="text-(--accent) mt-3 text-[0.9rem] font-semibold inline-block">Show More &rarr;</a>
                        </div>
                    ))}
                </div>

                {activeSkill && <TechnicalSkillsModal activeSkill={activeSkill} setActiveSkill={setActiveSkill} />}
            </section>

            <section className="max-w-250 mx-auto py-16 px-8" id="certificates">
                <h2 className="mb-6 md:mb-8 pb-2 text-2xl border-b-2 border-(--cntnr-border-color)">Certifications</h2>

                <div className="flex justify-center items-center gap-2 sm:gap-4">
                    <button onClick={handleArrowLeft} aria-label="Previous Certificate" className="text-(--txt-muted-color) p-3 cursor-pointer flex justify-center items-center rounded-lg transition-colors shrink-0 hover:text-(--accent)">
                        <i className="fa-solid fa-chevron-left text-lg"></i>
                    </button>

                    <div className="w-full max-w-3xl aspect-4/3 sm:aspect-16/10 flex justify-center items-center overflow-hidden">
                        <img src={CERTIFICATES[certIndex]} alt="Developer's Certificate" onClick={() => setIsCertActive(true)} className="max-w-full max-h-full w-auto h-auto rounded-md cursor-pointer object-contain" />
                    </div>

                    <button onClick={handleArrowRight} aria-label="Next Certificate" className="text-(--txt-muted-color) p-3 cursor-pointer flex justify-center items-center rounded-lg transition-colors shrink-0 hover:text-(--accent)">
                        <i className="fa-solid fa-chevron-right text-lg"></i>
                    </button>

                    {isCertActive && <CertificationsModal certIndex={certIndex} isCertActive={isCertActive} setIsCertActive={setIsCertActive} />}
                </div>

                <div className="bg-(--cntnr-color) mt-6 px-15 md:px-25 py-6 text-center border border-(--cntnr-border-color) rounded-xl">
                    <p className="text-[0.55rem] sm:text-[0.9rem]">{CERTIFICATES_descriptions[certIndex]}</p>
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
                                {isEmail && <FaEnvelope className="text-(--accent) mx-auto text-3xl" />}
                                {isPhone && <FaPhone className="text-(--accent) mx-auto text-3xl" />}
                                {isFacebook && <FaFacebook className="text-(--accent) mx-auto text-3xl" />}

                                <h2 className="text-(--accent) pt-3 pb-2">{category.title}</h2>
                                <p className="pb-4 text-[0.9rem]">{category.description}</p>

                                {isEmail && <a href={`mailto:${CONTACTS.email}`} className="bg-(--accent) text-(--cntnr-color) py-3 px-6 text-[0.85rem] font-semibold rounded-lg inline-block transition-colors duration-200 hover:bg-(--accent-hover)">Send an Email</a>}
                                {isPhone && (
                                    <>
                                        <p className="text-(--accent)">{category.phone}</p>
                                        <p className="text-(--txt-muted-color) text-xs">[Note: For urgent matters.]</p>
                                    </>
                                )}
                                {isFacebook && <a href="https://www.facebook.com/ayezza.margaux" target="_blank" rel="noopener noreferrer" className="max-w-full text-sm break-all inline-block">[<span className="text-(--accent)">https://www.facebook.com/ayezza.margaux</span>]</a>}
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