"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ParticleSystem } from "@/components/particle-system"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Menu,
  X,
  Code,
  Palette,
  Smartphone,
  Globe,
  Star,
  Heart,
  Zap,
  BookOpen,
  Coffee,
  Rocket,
  Target,
} from "lucide-react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const skills = [
    { name: "JavaScript", icon: "⚡", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    { name: "React", icon: "⚛️", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { name: "Next.js", icon: "🚀", color: "bg-gray-100 text-gray-800 border-gray-200" },
    { name: "TypeScript", icon: "📘", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { name: "Node.js", icon: "🟢", color: "bg-green-100 text-green-800 border-green-200" },
    { name: "Python", icon: "🐍", color: "bg-green-100 text-green-800 border-green-200" },
    { name: "CSS/Tailwind", icon: "🎨", color: "bg-purple-100 text-purple-800 border-purple-200" },
    { name: "MongoDB", icon: "🍃", color: "bg-green-100 text-green-800 border-green-200" },
    { name: "HTML5", icon: "🌐", color: "bg-orange-100 text-orange-800 border-orange-200" },
    { name: "Git & GitHub", icon: "📚", color: "bg-gray-100 text-gray-800 border-gray-200" },
    { name: "Express.js", icon: "🚄", color: "bg-gray-100 text-gray-800 border-gray-200" },
    { name: "PostgreSQL", icon: "🐘", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { name: "Java", icon: "☕", color: "bg-red-100 text-red-800 border-red-200" },
    { name: "C++", icon: "⚙️", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { name: "Data Structures", icon: "🏗️", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
    { name: "Algorithms", icon: "🧮", color: "bg-purple-100 text-purple-800 border-purple-200" },
    { name: "Software Engineering", icon: "🏛️", color: "bg-gray-100 text-gray-800 border-gray-200" },
    { name: "Database Design", icon: "🗄️", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { name: "REST APIs", icon: "🔗", color: "bg-green-100 text-green-800 border-green-200" },
    { name: "Responsive Design", icon: "📱", color: "bg-pink-100 text-pink-800 border-pink-200" },
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.",
      technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
      image: "/Eco.jpg?height=200&width=300",
      github: "#",
      live: "#",
      featured: true,
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      image: "/task.png?height=200&width=300",
      github: "#",
      live: "#",
      featured: false,
    },
    {
      title: "bookstore ERP",
      description: "A responsive weather dashboard with location-based forecasts and interactive charts.",
      technologies: ["odoo", "python", "xml", "..."],
      image: "/books.png?height=200&width=300",
      github: "#",
      live: "#",
      featured: false,
    },
  ]

  const experiences = [
    {
      title: "BSC Computer Science Graduate",
      company: "Jinka University",
      period: "2020 - 2024",
      description:
        "Completed Bachelor of Science in Computer Science with strong foundation in programming, algorithms, data structures, and software engineering principles.",
      icon: "🎓",
    },
    {
      title: "Final Year Project",
      company: "Jinka University",
      period: "2024",
      description:
        "Developed and presented a comprehensive software project demonstrating practical application of computer science concepts and modern development practices.",
      icon: "",
    },
    {
      title: "Academic Projects & Learning",
      company: "Self-Directed Learning",
      period: "2020 - Present",
      description:
        "Continuously expanding knowledge through personal projects, online courses, and staying updated with latest technologies in web development and software engineering.",
      icon: "📚",
    },
  ]

  const stats = [
    { label: "Projects Completed", value: "5+", icon: Rocket },
    { label: "Technologies Learned", value: "20+", icon: Code },
    { label: "Years of Study", value: "4", icon: BookOpen },
    { label: "Coffee Consumed", value: "∞", icon: Coffee },
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Dynamic Color-Themed Particle System */}
      <ParticleSystem activeSection={activeSection} />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

        {/* Mouse-following gradient orb */}
        <div
          className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        ></div>

        {/* Static gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-white/20 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "experience", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 relative group ${
                    activeSection === item ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                      activeSection === item ? "w-full" : "group-hover:w-full"
                    }`}
                  ></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 bg-white/90 backdrop-blur-md">
              {["home", "about", "skills", "projects", "experience", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-3 px-4 capitalize text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 min-h-screen flex items-center relative">
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-purple-200 rotate-45 opacity-15 animate-pulse animation-delay-3000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
          <div className="text-center">
            <div
              className={`mb-8 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <div className="relative inline-block">
                <img
                  src="/coding.png?height=200&width=200"
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Belay Mengie
                </span>
              </h1>
              <div className="text-xl md:text-2xl text-black-600 mb-8 flex items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-yellow-500" />
                <span> Developer & UI/UX Designer</span>
                <Heart className="h-6 w-6 text-red-500 animate-pulse" />
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <p className="text-lg text-gray-500 mb-4 max-w-2xl mx-auto leading-relaxed">
                Passionate about creating beautiful, functional, and user-centered digital experiences. I specialize in
                modern web technologies and love bringing ideas to life.
              </p>
              <div className="text-sm text-gray-400 mb-8 space-y-1">
                <p>
                   <strong>Watch the particles change colors as you scroll through sections!</strong> 
                </p>
                <p>
                   <strong>Click anywhere or move your mouse around!</strong> 
                </p>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="border-2 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105"
                  >
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 relative">
        {/* About Background Images */}
        <div className="absolute left-10 top-1/4 w-2/5 h-2/3 opacity-6">
          <img
            src="/programing.jpg?height=500&width=250"
            alt="About decoration"
            className="w-full h-full object-cover rounded-r-2xl"
          />
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl opacity-15 animate-spin animation-duration-[20s]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-14 h-14 bg-yellow-200 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Me <span className="text-2xl">👨‍💻</span>
            </h2>
            <p className="text-lg text-gray-600">Get to know me better</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <img
                src="/papa.jpg?height=400&width=500"
                alt="About me"
                className="rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                I'm a passionate Computer Science graduate from Jinka University 🎓
              </h3>
              <p className="text-gray-600 leading-relaxed">
                I recently graduated with a BSC in Computer Science from Jinka University and I'm passionate about
                creating modern, responsive web applications using cutting-edge technologies. My journey in computer
                science has equipped me with strong problem-solving skills and a solid foundation in software
                development.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As a fresh graduate, I'm eager to apply my knowledge in real-world projects and continue learning new
                technologies. I'm particularly interested in web development, software engineering, and creating
                solutions that make a positive impact. 
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code, text: "Clean Code", color: "text-blue-600" },
                  { icon: Palette, text: "UI/UX Design", color: "text-purple-600" },
                  { icon: Smartphone, text: "Responsive Design", color: "text-green-600" },
                  { icon: Globe, text: "Web Performance", color: "text-orange-600" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <item.icon className={`h-5 w-5 ${item.color} mr-3 group-hover:scale-110 transition-transform`} />
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        {/* Skills Background Images */}
        <div className="absolute top-0 left-1/4 w-1/6 h-1/3 opacity-5">
          <img
            // src="/bb.jpg?height=200&width=150"
            // alt="Skills decoration"
            className="w-full h-full object-cover rounded-b-3xl"
          />
        </div>
        <div className="absolute bottom-0 right-1/3 w-1/5 h-2/5 opacity-7">
          <img
            // src="/bb.jpg?height=250&width=180"
            // alt="Skills decoration"
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>
        {/* Tech-themed floating elements */}
        <div
          className="absolute top-1/4 right-1/4 w-16 h-16 bg-green-200 opacity-15 animate-bounce animation-delay-1000"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        ></div>
        <div className="absolute bottom-1/3 left-1/5 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-pulse animation-delay-2500"></div>
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-purple-200 rotate-45 opacity-10 animate-spin animation-duration-[15s]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & Technologies <span className="text-2xl">⚡</span>
            </h2>
            <p className="text-lg text-gray-600">Technologies I work with</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`px-4 py-3 rounded-full text-sm font-medium border-2 ${skill.color} hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="mr-2 group-hover:animate-bounce inline-block">{skill.icon}</span>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 relative">
        
         
        {/* Project-themed floating elements */}
        <div className="absolute top-1/3 right-1/4 w-18 h-18 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-lg opacity-15 animate-pulse animation-delay-1500"></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-indigo-200 opacity-20 animate-bounce animation-delay-3000"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects <span className="text-2xl"></span>
            </h2>
            <p className="text-lg text-gray-600">Some of my recent work</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group ${
                  project.featured ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                }`}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image || "/download.jpeg?height=200&width=300"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{project.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="hover:bg-blue-100 transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="hover:bg-gray-100 transition-colors">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 relative">
        {/* Experience Background Images */}
        <div className="absolute top-0 right-1/4 w-1/5 h-2/5 opacity-5">
           
        </div>
        <div className="absolute bottom-0/4 right-0 w-1/3 h-2.3/3 opacity-7">
          <img
            src="/bb.jpg?height=100&width=220"
            alt="Experience decoration"
            className="w-full h-full object-cover rounded-r-3xl"
          />
        </div>
        {/* Academic-themed floating elements */}
        <div
          className="absolute top-1/3 left-1/4 w-14 h-14 bg-yellow-200 opacity-15 animate-spin animation-duration-[25s]"
          style={{
            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        ></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              My Journey <span className="text-2xl">🎯</span>
            </h2>
            <p className="text-lg text-gray-600">My professional journey</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {experiences.map((experience, index) => (
              <div key={index} className="relative pl-8 pb-8 last:pb-0 group">
                <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                {index !== experiences.length - 1 && (
                  <div className="absolute left-2 top-4 w-0.5 h-full bg-gradient-to-b from-blue-300 to-purple-300 -translate-x-0.5"></div>
                )}
                <Card className="ml-4 hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <span className="text-2xl">{experience.icon}</span>
                      {experience.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {experience.company} • {experience.period}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{experience.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 relative">
     
        <div className="absolute bottom-0 left-1/4 w-1/5 h-1/3 opacity-8">
          <img
            src="/placeholder.svg?height=150&width=120"
            alt="Contact decoration"
            className="w-full h-full object-cover rounded-tr-3xl"
          />
        </div>
        {/* Communication-themed floating elements */}
        <div className="absolute top-1/3 left-1/3 w-12 h-12 bg-pink-200 rounded-full opacity-15 animate-bounce animation-delay-1000"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-blue-200 opacity-20 animate-pulse animation-delay-2500"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch  
            </h2>
            <p className="text-lg text-gray-600">{"Let's"} work together on your next project</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{"Let's"} Connect 🤝</h3>
              <p className="text-gray-600 leading-relaxed">
                {"I'm"} always interested in hearing about new opportunities and interesting projects. Whether you have
                a question or just want to say hi, {"I'll"} try my best to get back to you! 
              </p>

              <div className="space-y-4">
                {[
                  { icon: Mail, text: "belaye024@gmail.com", color: "text-blue-600" },
                  { icon: Phone, text: "+251 930-565-035", color: "text-green-600" },
                  { icon: MapPin, text: "Addis Ababa, Ethiopia", color: "text-red-600" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <item.icon className={`h-5 w-5 ${item.color} mr-4 group-hover:scale-110 transition-transform`} />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "#", color: "hover:bg-gray-100" },
                  { icon: Linkedin, href: "#", color: "hover:bg-blue-100" },
                  { icon: Mail, href: "#", color: "hover:bg-red-100" },
                ].map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    asChild
                    className={`${social.color} transition-all duration-300 hover:scale-110`}
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Send Message
                </CardTitle>
                <CardDescription>Fill out the form below and {"I'll"} get back to you soon.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="abel"
                        className="focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="alex@example.com"
                      className="focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Project Inquiry"
                      className="focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                  >
                    Send Message 
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2025 Belay Mengie. All rights reserved.  
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
