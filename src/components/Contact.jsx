import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Globe, Mail, MapPin, Phone, Send } from 'lucide-react';
import MagneticButton from './MagneticButton.jsx';
import SplitText from './SplitText.jsx';

function FloatingInput({ name, type = 'text', label, value, onChange, error, multiline }) {
  const [isFocused, setIsFocused] = useState(false);
  const active = isFocused || value.length > 0;

  return (
    <div className="contact-premium__field">
      <label
        htmlFor={name}
        className={`contact-premium__label${active ? ' is-active' : ''}${multiline ? ' is-multiline' : ''}`}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows="5"
          className={`contact-premium__input hover-target${error ? ' input-error' : ''}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`contact-premium__input hover-target${error ? ' input-error' : ''}`}
        />
      )}

      <AnimatePresence>
        {error ? (
          <motion.div
            className="error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {error}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const directChannels = [
  {
    label: 'Email',
    value: 'mufeedha059@gmail.com',
    href: 'mailto:mufeedha059@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    value: '+91 8075702820',
    href: 'tel:+918075702820',
    icon: Phone,
  },
  {
    label: 'Location',
    value: 'Malappuram, Kerala',
    href: null,
    icon: MapPin,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mufeedha-tm',
    href: 'https://www.linkedin.com/in/mufeedha-tm',
    icon: Globe,
  },
];

export default function Contact({ sectionId = 'contact' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handle = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email.';
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.';
    }

    return nextErrors;
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSent(true);
      window.setTimeout(() => {
        setSent(false);
        setForm({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  return (
    <section id={sectionId} className="contact-premium container">
      <motion.div
        className="contact-premium__shell"
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.65 }}
      >
        <div className="contact-premium__intro">
          <span className="section-label">Next Step</span>
          <h2 className="section-title contact-premium__title">
            <SplitText delayStart={0.15}>Let's build something recruiters remember.</SplitText>
          </h2>
          <p className="contact-premium__copy">
            If you're looking for a full stack developer who values polished UI, strong product presentation, and dependable implementation, I'd love to connect.
          </p>

          <div className="contact-premium__channels">
            {directChannels.map((channel) => {
              const Icon = channel.icon;
              const content = (
                <>
                  <span className="contact-premium__channel-icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>{channel.label}</strong>
                    <span>{channel.value}</span>
                  </div>
                </>
              );

              return channel.href ? (
                <a key={channel.label} href={channel.href} className="contact-premium__channel">
                  {content}
                </a>
              ) : (
                <div key={channel.label} className="contact-premium__channel">
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <div className="contact-premium__form-card">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                className="contact-premium__success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
              >
                <CheckCircle size={56} />
                <h3>Message received.</h3>
                <p>I will get back to you soon with the same level of care the portfolio is built with.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact-premium__form"
                onSubmit={submit}
                noValidate
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
              >
                <FloatingInput name="name" label="Your Name" value={form.name} onChange={handle} error={errors.name} />
                <FloatingInput name="email" label="Email Address" type="email" value={form.email} onChange={handle} error={errors.email} />
                <FloatingInput
                  name="message"
                  label="What are you building?"
                  value={form.message}
                  onChange={handle}
                  error={errors.message}
                  multiline
                />

                <MagneticButton type="submit" className="btn-primary contact-premium__submit">
                  Send Message <Send size={18} />
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
