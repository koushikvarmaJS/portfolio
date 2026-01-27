import { motion } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import portfolioData from "@/data/portfolioData.json";
import { IoLogoGithub } from "react-icons/io5";
import { getPublicPath } from "@/lib/utils";

const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-title">My Work</p>
          <h2 className="section-heading">Featured Projects</h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-xl overflow-hidden hover-card h-full flex flex-col"
              >
                {/* Project Image/Header */}
                <div className="h-48 bg-gradient-to-br from-secondary to-card relative overflow-hidden">
                  {project.image ? (
                    <img src={getPublicPath(project.image)} alt={project.name} className="w-full h-full object-cover" />
                  ) :
                  (<div className="absolute inset-0 flex items-center justify-center">
                    <Folder className="w-16 h-16 text-primary/30" />
                  </div>)}
                  {/* Domain badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/50 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {project.domain}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {project.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-badge">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="
                        bg-white/80 text-black
                        hover:bg-primary hover:text-primary-foreground
                        border-border
                        transition-colors
                        "
                        // border-border hover:border-primary hover:text-primary
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center group"
                        >        
                          <IoLogoGithub className="w-4 h-4 mr-2"/>
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        asChild
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
