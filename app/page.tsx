"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import MouseTrail from "@/components/mouse-trail";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs for sections
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Parallax effects
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 50]);
  const opacity1 = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0]);
  const opacity2 = useTransform(scrollY, [300, 500, 700], [0, 0.5, 1]);

  // Intersection observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [homeRef, aboutRef, skillsRef, projectsRef, contactRef];
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current);
        }
      });
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Navigation links for both desktop and mobile
  const navLinks = [
    { name: "Home", ref: homeRef },
    { name: "About", ref: aboutRef },
    { name: "Skills", ref: skillsRef },
    { name: "Projects", ref: projectsRef },
    { name: "Contact", ref: contactRef },
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <MouseTrail />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 border-b border-purple-500/20 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold relative"
          >
            <span className="text-purple-500">William Ruan</span>
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-purple-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-1">
              {navLinks.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative"
                >
                  <button
                    onClick={() =>
                      scrollToSection(
                        item.ref as React.RefObject<HTMLDivElement>
                      )
                    }
                    className={`relative px-4 py-2 group transition-all duration-200`}
                  >
                    <span
                      className={`relative z-10 ${
                        activeSection === item.name.toLowerCase()
                          ? "text-purple-300"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* Hover effect */}
                    <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent transform origin-left transition-transform duration-200 scale-x-0 group-hover:scale-x-100"></span>
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent transform origin-right transition-transform duration-200 scale-x-0 group-hover:scale-x-100"></span>
                      <span className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500 to-transparent transform origin-top transition-transform duration-200 scale-y-0 group-hover:scale-y-100"></span>
                      <span className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500 to-transparent transform origin-bottom transition-transform duration-200 scale-y-0 group-hover:scale-y-100"></span>
                    </span>

                    {/* Active indicator */}
                    {activeSection === item.name.toLowerCase() && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <motion.div
            className="md:hidden bg-black/80 backdrop-blur-md absolute top-0 left-0 w-full h-full flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center space-y-4">
              {navLinks.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <button
                    onClick={() => {
                      scrollToSection(
                        item.ref as React.RefObject<HTMLDivElement>
                      );
                      setMenuOpen(false); // Close menu after click
                    }}
                    className="text-white px-4 py-2"
                  >
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={homeRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Gaming UI background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>

          {/* Grid pattern */}
          <div
            className="w-full h-full opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
        <motion.div
          style={{ y: y1, opacity: opacity1 }}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 className="text-4xl md:text-7xl font-bold mb-6">
              Creative <span className="text-purple-500">Full-Stack</span>
              &nbsp;Developer
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Crafting immersive digital experiences with modern web
              technologies
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="relative group bg-transparent border border-purple-500 hover:bg-purple-500/20 text-white overflow-hidden"
                onClick={() =>
                  scrollToSection(
                    projectsRef as React.RefObject<HTMLDivElement>
                  )
                }
              >
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute top-0 left-0 w-2 h-2 bg-purple-400"></span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-purple-400"></span>
                <span className="absolute bottom-0 left-0 w-2 h-2 bg-purple-400"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-purple-400"></span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                onClick={() =>
                  scrollToSection(contactRef as React.RefObject<HTMLDivElement>)
                }
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() =>
            scrollToSection(aboutRef as React.RefObject<HTMLDivElement>)
          }
        >
          <ChevronDown className="h-8 w-8 text-purple-500" />
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="min-h-screen flex items-center justify-center relative py-20"
      >
        <motion.div
          style={{ y: y2 }}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <div className="absolute top-40 right-40 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-60 h-60 rounded-full bg-pink-500/20 blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              About <span className="text-purple-500">Me</span>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
                <Image
                  src="/me.jpg?height=800&width=600"
                  alt="Developer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-lg z-[-1]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                Full-Stack Developer & AI Integration Specialist
              </h3>
              <p className="text-gray-300 mb-6">
                I'm William, a dedicated full-stack developer with deep
                expertise in modern web technologies like Next.js, Tailwind CSS,
                Express.js, and advanced AI integrations including OpenAI and AI
                Agent development. My passion lies in crafting intuitive,
                responsive, and performant applications that seamlessly blend
                robust backend functionality with engaging front-end
                experiences.
              </p>
              <p className="text-gray-300 mb-8">
                Combining technical proficiency and creative problem-solving, I
                consistently deliver scalable solutions using Python, Node.js,
                MongoDB, PostgreSQL, Docker, and ComfyUI. Driven to stay ahead
                of technological trends, I continually expand my skillset to
                ensure every project exceeds client expectations and delights
                users.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-800 px-4 py-2 rounded-full">
                  <span className="text-purple-500 font-medium">8+</span> Years
                  Experience
                </div>
                <div className="bg-gray-800 px-4 py-2 rounded-full">
                  <span className="text-purple-500 font-medium">40+</span>{" "}
                  Projects Completed
                </div>
                <div className="bg-gray-800 px-4 py-2 rounded-full">
                  <span className="text-purple-500 font-medium">30+</span> Happy
                  Clients
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className="min-h-screen flex items-center justify-center relative py-20"
      >
        <motion.div
          style={{ y: y3 }}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <div className="absolute top-20 left-40 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-40 right-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              My <span className="text-purple-500">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>

              {[
                { name: "Next.js", level: 95 },
                { name: "Tailwind CSS", level: 92 },
                { name: "Express.js", level: 90 },
                { name: "AI Agent", level: 88 },
                { name: "OpenAI", level: 85 },
                { name: "ComfyUI", level: 82 },
                { name: "Python", level: 80 },
                { name: "Node.js", level: 75 },
                { name: "MongoDB", level: 70 },
                { name: "PostgreSQL", level: 65 },
                { name: "Docker", level: 60 },
              ].map((skill, index) => (
                <div key={skill.name} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-purple-500">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { name: "Tailwind CSS", icon: "🎨" },
                { name: "Framer Motion", icon: "✨" },
                { name: "Next.js", icon: "🔄" },
                { name: "Express.js", icon: "📊" },
                { name: "ComfyUI", icon: "🖌️" },
                { name: "Git", icon: "🔄" },
                { name: "AI Agent", icon: "📱" },
                { name: "Performance Optimization", icon: "⚡" },
              ].map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-3xl mb-3">{skill.icon}</span>
                  <h4 className="font-medium">{skill.name}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="min-h-screen flex items-center justify-center relative py-20"
      >
        <motion.div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute bottom-20 left-40 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              My <span className="text-purple-500">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-6" />
            <p className="text-gray-300 max-w-2xl mx-auto">
              A selection of my recent work, showcasing my skills in front-end
              development, UI/UX design, and creative problem-solving.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Marketplace",
                description:
                  "A sophisticated e-commerce platform featuring seamless cart functionality, secure payment integration, and a user-friendly interface designed to enhance the shopping experience.",
                image: "e-commerce.png?height=600&width=800",
                tags: [
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                  "Stripe",
                  "Firebase",
                ],
                link: "https://github.com/jupiter221208",
              },
              {
                title: "Portfolio",
                description:
                  "A dynamic portfolio website for a front-end developer, featuring responsive design, interactive elements, and smooth animations to showcase my skills and projects effectively.",
                image: "/portfolio.png?height=600&width=800",
                tags: ["React", "Framer Motion", "GSAP", "Three.js"],
                link: "https://github.com/jupiter221208",
              },
              {
                title: "E-Sports Tournament Hub",
                description:
                  "A comprehensive platform for e-sports tournaments, featuring real-time live streaming, interactive leaderboards, and detailed match statistics.",
                image: "/e-sport.png?height=600&width=800",
                tags: ["React", "TypeScript", "Chart.js", "Socket.io"],
                link: "https://github.com/jupiter221208",
              },
              {
                title: "Gamified Learning App",
                description:
                  "A mobile application designed to enhance student engagement through gamification, offering interactive lessons, rewards, and progress tracking.",
                image: "/gamified.png?height=600&width=800",
                tags: ["React Native", "Redux", "Styled Components", "Expo"],
                link: "https://github.com/jupiter221208",
              },
              {
                title: "SaaS Product Landing Page",
                description:
                  "A visually appealing and high-converting landing page for a SaaS product, utilizing animations and clear calls-to-action to drive user engagement and conversions.",
                image: "/landing.png?height=600&width=800",
                tags: ["HTML", "CSS", "JavaScript", "GSAP", "AOS"],
                link: "https://github.com/jupiter221208",
              },
              {
                title: "Twitchie - Video Sharing Platform",
                description:
                  "A full-stack application that allows users to create, share, and discover short video clips, similar to YouTube, with a focus on community engagement and content discovery.with payment integration.",
                image: "/twitchie.png?height=600&width=800",
                tags: [
                  "PHP",
                  "HTML",
                  "CSS",
                  "Tailwind CSS",
                  "JavaScript",
                  "MySQL",
                ],
                link: "https://github.com/jupiter221208",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <div className="h-48 relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="text-purple-500 hover:text-purple-400 p-0"
                    asChild
                  >
                    <a href={project.link}>View Project →</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <a
                href="https://github.com/jupiter221208"
                target="_blank"
                rel="noopener noreferrer"
              >
                View All Projects
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="min-h-screen flex items-center justify-center relative py-20"
      >
        <motion.div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Get In <span className="text-purple-500">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto mb-6" />
            <p className="text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities?
              I'd love to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Email</h4>
                    <p className="font-medium">jupiter221208@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">Website</h4>
                    <p className="font-medium">portfolio website url</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                {[
                  {
                    icon: <Github className="h-5 w-5" />,
                    name: "GitHub",
                    link: "https://github.com/jupiter221208",
                  },
                  {
                    icon: <Linkedin className="h-5 w-5" />,
                    name: "LinkedIn",
                    link: "https://www.linkedin.com/",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 hover:text-purple-500 transition-colors"
                  >
                    {social.icon}
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-300"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Subject"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your Message"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4 md:mb-0"
            >
              <div className="text-2xl font-bold">
                <span className="text-purple-500">William</span>Portfolio
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © {new Date().getFullYear()} William Portfolio. All rights
              reserved.
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
