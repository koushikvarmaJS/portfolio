import { motion } from "framer-motion";
import { LuMail } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { Heart } from "lucide-react"; // keep Heart as is
import portfolioData from "@/data/portfolioData.json";

const Footer = () => {
  const { profile, contact } = portfolioData;

  const socialLinks = [
    { icon: LuMail, href: `mailto:${contact.email}`, label: "Email" },
    { icon: IoLogoGithub, href: contact.github, label: "GitHub" },
    { icon: FaLinkedin, href: contact.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="py-12 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold gradient-text mb-4"
          >
            {profile.name.split(' ').map(n => n[0]).join('')}
          </motion.div>

          {/* Tagline */}
          <p className="text-muted-foreground mb-6 max-w-md">
            Building digital experiences that make a difference.
            Let's create something amazing together.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 mb-8">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by {profile.name}</span>
          </div>

          <p className="text-xs text-muted-foreground/60 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;