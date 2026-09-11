import { motion } from "framer-motion";
import { LuMail } from "react-icons/lu";
import { FaMobile, FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import portfolioData from "@/data/portfolioData.json";
import ThemeToggle from "./ThemeToggle";
import ContactLink, { type ContactItem } from "./ContactLink";

const Header = () => {
  const { contact } = portfolioData;

  // Strips protocol/www/trailing slash so the tooltip shows "github.com/name"
  // rather than the full URL, which overflows the tooltip.
  const prettyUrl = (url: string) =>
    url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

  const socialLinks: ContactItem[] = [
    {
      icon: LuMail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      actionLabel: "Compose",
      behavior: "copy",
    },
    {
      icon: FaMobile,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
      actionLabel: "Call",
      behavior: "copy",
    },
    {
      icon: IoLogoGithub,
      label: "GitHub",
      value: prettyUrl(contact.github),
      href: contact.github,
      actionLabel: "Open",
      behavior: "link",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: prettyUrl(contact.linkedin),
      href: contact.linkedin,
      actionLabel: "Open",
      behavior: "link",
    },
  ];

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card"
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <motion.a
            href="#"
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            KB
          </motion.a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-lg text-muted-foreground hover:text-foreground link-underline transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <ContactLink
                key={link.label}
                item={link}
                delay={0.3 + 0.1 * index}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + 0.1 * socialLinks.length }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;