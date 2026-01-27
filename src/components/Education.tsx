import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import portfolioData from "@/data/portfolioData.json";

const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-title">Academic Background</p>
          <h2 className="section-heading">Education</h2>
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-xl p-6 hover-card h-full"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">
                      {edu.institution}
                    </h3>
                    <p className="text-primary font-medium">{edu.degree}</p>
                    <p className="text-muted-foreground text-sm">{edu.field}</p>
                  </div>
                </div>

                {/* Period */}
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{edu.period}</span>
                </div>

                {/* Description */}
                {edu.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
