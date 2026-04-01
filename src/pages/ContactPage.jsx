import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Layers3, MapPin } from 'lucide-react';
import Contact from '../components/Contact.jsx';

const contactSignals = [
  {
    title: 'Open to roles',
    copy: 'Frontend and full stack opportunities where product quality and polished execution matter.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Best fit',
    copy: 'Teams that care about modern UI, responsive systems, and thoughtful user-facing detail.',
    icon: Layers3,
  },
  {
    title: 'Based in',
    copy: 'Malappuram, Kerala, available for remote opportunities and collaborative digital work.',
    icon: MapPin,
  },
];

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="editorial-page">
      <section className="container">
        <motion.div
          className="page-hero"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-label">Contact</span>
          <h1 className="page-hero__title">A dedicated page for the next conversation, not just a footer form.</h1>
          <p className="page-hero__copy">
            If you’re hiring for a full stack or frontend role and want someone who cares about both code quality and visual presence, this is the right place to reach out.
          </p>
        </motion.div>

        <div className="contact-signals">
          {contactSignals.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                className="contact-signals__card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: index * 0.08 }}
              >
                <span className="contact-signals__icon">
                  <Icon size={18} />
                </span>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <Contact />
    </div>
  );
}
