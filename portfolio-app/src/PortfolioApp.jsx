import { useState, useRef, useEffect } from "react";
import { useFloating, autoUpdate, offset, flip, shift, arrow, FloatingArrow } from "@floating-ui/react";
import { FaEnvelope, FaPhone, FaFacebook } from "react-icons/fa6";
import "./index.css";

const NAVIGATIONS = ["About", "Projects", "Skills", "Contacts"];

const ABOUT = {
    name: "Margaux Ayezzalyne L. Vertudes",
    username: "Margaux",
    position: "ML Engineer",
    profilePicture: "/profilePics/profile-picture-3.png",
    resume: "Resume_Vertudes.pdf",
    get title() { return `Hi, I'm ${this.username} — I build 🤖 intelligent systems powered by machine learning.`; },
    description: "I specialize in developing and integrating machine learning solutions into modern applications. I work across data processing, model development, API integration, and deployment, with a focus on writing clean, maintainable code and building efficient, scalable AI-powered systems."
};

const Pineapple_App = "/slides/Pineapple_App";
const Golf_Club = "/slides/Golf_Club";
const MA_Codeworks = "/slides/MA_Codeworks";

const PROJECTS = [
    {
        id: "Pineapple App",
        icon: `${Pineapple_App}/slide-1.png`,
        title: "Pineapple Disease and Monitoring App",
        description: "Mobile application powered by a Convolutional Neural Network (CNN) to identify pineapple leaf diseases and monitor plant health through image capture or upload.",
        tags: ["Python", "CNN", "Deep Learning", "Computer Vision", "TensorFlow", "Mobile App"],
        githubUrl: "https://github.com/margauxvertudes/CNN-based-Pineapple-Disease-Identification-",
        deployedUrl: "https://drive.google.com/file/d/16nwsQU_r73czpxlwbxIVNIGRNDSSO1Xq/view?fbclid=IwY2xjawTf8TpleHRuA2FlbQMxMDAAc3J0YwZhcHBfaWQMMzUwNjg1NTMxNzI4AAEeE7_GoChnexfKN9-uunlS-THxdbE0YHq0a1ZvJWMuO1n5f8eW-3RIuGkcvp0_aem_vNTzBqC8QgK3DggUlummFg"
    },
    {
        id: "Golf Club",
        icon: `${Golf_Club}/slide-1.png`,
        title: "Palm Fairway Club | Experience Golf and More!",
        description: "Official web application for Palm Fairway Club featuring online tee time reservations, amenity showcases, dining menus, and event updates.",
        tags: ["WordPress", "Elementor", "Responsiveness", "Plugin Management", "Web Maintenance"],
        githubUrl: "https://github.com/margauxvertudes/Palm-Fairway-Club",
        deployedUrl: "https://palmfairway.com.ph/"
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
    "Pineapple App": [`${Pineapple_App}/slide-1.png`, `${Pineapple_App}/slide-2.jpg`, `${Pineapple_App}/slide-3.jpg`, `${Pineapple_App}/slide-4.jpg`, `${Pineapple_App}/slide-5.jpg`, `${Pineapple_App}/slide-6.jpg`],
    "Golf Club": [`${Golf_Club}/slide-1.png`, `${Golf_Club}/slide-2.png`, `${Golf_Club}/slide-3.png`, `${Golf_Club}/slide-4.png`, `${Golf_Club}/slide-5.png`, `${Golf_Club}/slide-6.png`, `${Golf_Club}/slide-7.png`, `${Golf_Club}/slide-8.png`, `${Golf_Club}/slide-9.png`, `${Golf_Club}/slide-10.png`],
    "MA Codeworks": [`${MA_Codeworks}/slide-1.png`, `${MA_Codeworks}/slide-2.png`, `${MA_Codeworks}/slide-3.png`, `${MA_Codeworks}/slide-4.png`, `${MA_Codeworks}/slide-5.png`, `${MA_Codeworks}/slide-6.png`, `${MA_Codeworks}/slide-7.png`, `${MA_Codeworks}/slide-8.png`, `${MA_Codeworks}/slide-9.png`, `${MA_Codeworks}/slide-10.png`]
};

const PROJECTS_descriptions = {
    "Pineapple App": [
        "This is the official app icon, featuring a vibrant, rounded pineapple illustration set against a soft pastel blue background.",
        "This screen displays the main home dashboard, featuring quick-action buttons for capturing or uploading leaf images and accessing saved folders.",
        "This drawer menu provides quick navigation across the application, allowing users to easily access the About page, Tutorial guide, or exit the app.",
        "This page details the project overview and research background, highlighting its CNN-powered disease detection capabilities and academic credits from Cavite State University.",
        "This step-by-step tutorial guides users through capturing or uploading pineapple leaf photos, analyzing results, and tracking plant health over time.",
        "This module enables users to browse and organize saved plant folders, allowing farmers to monitor disease progression and plant health history over time."
    ],
    "Golf Club": [
        "This is the official Palm Fairway Club app logo, featuring an emblem with a white palm tree silhouette inside a green circular border.",
        "This hero section welcomes visitors to the home page with full-width driving range imagery and a clear 'Book a Tee Time' call to action.",
        "This section showcases the state-of-the-art driving range amenities, inviting golf enthusiasts to refine their skills in a premier setting.",
        "This menu view displays delicious entrée offerings like Bacsilog, Longsilog, and Cornsilog available at the club's resto-bar.",
        "This showcase presents the Srixon Pro Shop, highlighting premium golf gear, equipment, and apparel available on-site.",
        "This section details professional coaching programs and video lessons led by certified teaching pros for players of all skill levels.",
        "This page highlights upcoming club events and competitive tournaments designed to foster sportsmanship and community.",
        "This interactive reservation form allows guests to select service types, enter contact details, and book tee times in a few simple steps.",
        "This contact page displays location details, phone numbers, email info, and operating hours for both the golf range and restaurant.",
        "This introduction section outlines the club's mission, values, and facilities, welcoming guests to the Palm Fairway community."
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
    Languages: ["HTML5", "CSS3", "Python", "C++", "Java", "PHP", "MySQL"],
    Concepts: ["Data Structures & Algorithms", "Statistics & Probability", "Data Preprocessing", "Exploratory Data Analysis", "Feature Engineering", "Machine Learning Algorithms", "Supervised Learning", "Model Training", "Model Evaluation", "Hyperparameter Tuning", "Neural Networks", "Convolutional Neural Networks (CNN)", "Model Deployment"],
    Tools: ["ChatGPT", "Git / GitHub", "VS Code", "Chrome DevTools", "WordPress", "TensorFlow", "Keras", "PyTorch", "Android Studio"]
};

const SKILLS_descriptions = {
    "Data Structures & Algorithms": "Basic methods for organizing data and solving problems efficiently using structures like arrays, lists, stacks, queues, and algorithms.",
    "Statistics & Probability": "Using basic statistical and probability concepts to understand data, identify patterns, and support machine learning decisions.",
    "Data Preprocessing": "Cleaning, transforming, and preparing raw data so it can be properly used to train a machine learning model.",
    "Exploratory Data Analysis": "Examining and visualizing data to understand its patterns, relationships, distributions, and possible issues before building a machine learning model.",
    "Feature Engineering": "Creating, selecting, or transforming input features to help a machine learning model learn useful patterns from data.",
    "Machine Learning Algorithms": "Methods used to allow computers to learn patterns from data and make predictions or decisions without being explicitly programmed for every case.",
    "Supervised Learning": "A type of machine learning where a model learns from labeled data to predict an output or classify new data.",
    "Model Training": "The process of teaching a machine learning model by providing training data and adjusting its parameters to learn patterns.",
    "Model Evaluation": "Measuring how well a trained machine learning model performs using appropriate evaluation metrics and test data.",
    "Hyperparameter Tuning": "Adjusting settings such as learning rate, number of trees, or batch size to improve a machine learning model's performance.",
    "Neural Networks": "Machine learning models made of interconnected layers of nodes that learn patterns from data and can be used for tasks such as classification and prediction.",
    "Convolutional Neural Networks (CNN)": "A type of neural network designed mainly for processing images and visual data by learning features such as edges, shapes, and patterns.",
    "Model Deployment": "The process of making a trained machine learning model available for use in a real application or system."
};

// const CERTIFICATES = [
//     "/certificates/certificate-1.jpg",
//     "/certificates/certificate-2.jpg",
//     "/certificates/certificate-3.jpg",
//     "/certificates/certificate-4.jpg",
// ];

// const CERTIFICATES_descriptions = [
//     "This is a Certificate of Completion awarded for successfully finalizing all requirements for the 'Agile Workflow Optimization Project' (Issued: August 14, 2025).",
//     "This is an Award of Excellence in Coding presented in recognition of outstanding performance and contribution to high-quality code implementation (Issued: October 26, 2026).",
//     "This is a Certificate of Achievement acknowledging successful completion of the program in Advanced Cloud Architecture (Issued: March 10, 2026).",
//     "This is an Innovation & Problem Solving Award given for demonstrating exceptional creativity and problem-solving skills in software development challenges (Issued: June 02, 2026)."
// ];

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

// function CertificationsModal({ certIndex, isCertActive, setIsCertActive }) {
//     const dialogRef = useRef(null);

//     useEffect(() => {
//         if (dialogRef.current && isCertActive) dialogRef.current.showModal();
//     }, [isCertActive]);

//     return (
//         <dialog ref={dialogRef} onCancel={() => setIsCertActive(false)} onClick={() => setIsCertActive(false)} className="bg-transparent w-[90vw] max-w-250 max-h-[90vh] m-auto p-0 border-none outline-none flex justify-center items-center backdrop:bg-black/60 backdrop:backdrop-blur-sm">
//             <img src={CERTIFICATES[certIndex]} alt="Developer's Certificate" className="max-w-full max-h-full w-auto h-auto rounded-md cursor-pointer object-contain" />
//         </dialog>
//     );
// }

export default function PortfolioApp() {
    const savedTheme = localStorage.getItem("savedTheme");
    const [theme, setTheme] = useState(savedTheme || "light");
    const [activeDemo, setActiveDemo] = useState(null);
    const [isProjExtended, setIsProjExtended] = useState(false);
    const [activeSkill, setActiveSkill] = useState(null);
    // const [certIndex, setCertIndex] = useState(0);
    // const [isCertActive, setIsCertActive] = useState(false);

    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }

    // function handleArrowLeft() {
    //     if (certIndex > 0) setCertIndex((prevCertIndex) => prevCertIndex - 1);
    // }

    // function handleArrowRight() {
    //     if (certIndex < CERTIFICATES.length - 1) setCertIndex((prevCertIndex) => prevCertIndex + 1);
    // }

    useEffect(() => {
        localStorage.setItem("savedTheme", theme);
    }, [theme]);

    return (
        <div className={`app ${theme} bg-(--bg-color) text-(--txt-main-color) min-h-screen transition-colors duration-300`}>
            <nav className="bg-(--bg-color) py-5 px-8 border-b border-(--cntnr-border-color) flex justify-between items-center sticky top-0">
                <div className="text-(--accent) font-bold text-xs min-[525px]:text-lg sm:text-xl"><p><a href="/">&lt;MA Codeworks /&gt;</a></p></div>

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
                                <div className="mb-2 flex items-center gap-2">
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

                            {items.length > 5 && <a href="#skills" onClick={() => setActiveSkill(category)} className="text-(--accent) mt-3 text-[0.9rem] font-semibold inline-block">Show More &rarr;</a>}
                        </div>
                    ))}
                </div>

                {activeSkill && <TechnicalSkillsModal activeSkill={activeSkill} setActiveSkill={setActiveSkill} />}
            </section>

            {/* <section className="max-w-250 mx-auto py-16 px-8" id="certificates">
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
            </section> */}

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