import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email)) errs.email = 'Enter a valid email.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const submit = e => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title">Contact</motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.06 }} className="lead">
          Email: <strong>mufeedha059@gmail.com</strong> • Phone: <strong>8075702820</strong> • Malappuram
        </motion.p>
        <motion.form className="contact-form" onSubmit={submit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} noValidate>
          <input name="name" placeholder="Your name" value={form.name} onChange={handle} className={errors.name ? 'input-error' : ''}/>
          {errors.name && <div className="error">{errors.name}</div>}
          <input name="email" placeholder="Your email" value={form.email} onChange={handle} className={errors.email ? 'input-error' : ''}/>
          {errors.email && <div className="error">{errors.email}</div>}
          <textarea name="message" placeholder="Your message" value={form.message} onChange={handle} rows="5" className={errors.message ? 'input-error' : ''}/>
          {errors.message && <div className="error">{errors.message}</div>}
          <div className="btn-row">
            <button type="submit" className="btn-primary">Send Message</button>
            {sent && <span className="contact-success">Message sent!</span>}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
