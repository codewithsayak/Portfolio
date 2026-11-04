import { useState } from 'react';
import { ArrowUpRight, Clock, Mail, MapPin, Send } from 'lucide-react';
import { profile, social } from '../data/site';

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Jane Doe', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@company.com', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Frontend role at Acme' },
];

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please add your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'A valid email helps me reply.';
  if (!values.subject.trim()) errors.subject = 'A short subject, please.';
  if (values.message.trim().length < 12) errors.message = 'Tell me a little more (12+ characters).';
  return errors;
};

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', tone: 'idle' });

  const update = (field) => (event) => {
    setValues((v) => ({ ...v, [field]: event.target.value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setStatus({ text: '', tone: 'idle' });
  };

  const submit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ text: 'Please fix the highlighted fields.', tone: 'error' });
      return;
    }
    const body = `${values.message}\n\n— ${values.name}\n${values.email}`;
    const url = `mailto:${social.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setStatus({ text: 'Opening your email client with the message pre-filled…', tone: 'ok' });
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__wrap">
          <div className="contact__grid">
            <div>
              <p className="eyebrow" data-reveal>
                <span className="num">07</span> Contact
              </p>
              <h2 className="contact__title" id="contact-title" data-split>
                Let&rsquo;s build something <span className="serif grad-text">worth shipping</span>
              </h2>
              <p className="contact__lede" data-reveal>
                Hiring, collaborating, or just curious about a project? I read every message and reply within a day.
              </p>

              <a className="contact__mail" href={`mailto:${social.email}`} data-reveal>
                <Mail size={20} strokeWidth={1.7} aria-hidden="true" />
                {social.email}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>

              <div className="contact__socials" data-stagger>
                <a className="social-btn" href={social.github} target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowUpRight size={13} />
                </a>
                <a className="social-btn" href={social.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram <ArrowUpRight size={13} />
                </a>
                <a className="social-btn" href={social.telegram} target="_blank" rel="noopener noreferrer">
                  Telegram <ArrowUpRight size={13} />
                </a>
              </div>

              <div className="contact__local">
                <MapPin size={13} aria-hidden="true" /> <b>{profile.location}</b>
                <span aria-hidden="true">·</span>
                <Clock size={13} aria-hidden="true" /> <b>{profile.timezone}</b>
              </div>
            </div>

            <form className="form" onSubmit={submit} noValidate data-reveal>
              <div className="form__row">
                {FIELDS.slice(0, 2).map((field) => (
                  <div className={`field ${errors[field.name] ? 'has-error' : ''}`} key={field.name}>
                    <label htmlFor={`c-${field.name}`}>{field.label}</label>
                    <input
                      id={`c-${field.name}`}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      value={values[field.name]}
                      onChange={update(field.name)}
                      aria-invalid={Boolean(errors[field.name])}
                      aria-describedby={errors[field.name] ? `e-${field.name}` : undefined}
                      required
                    />
                    {errors[field.name] && (
                      <span className="err" id={`e-${field.name}`}>
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {FIELDS.slice(2).map((field) => (
                <div className={`field ${errors[field.name] ? 'has-error' : ''}`} key={field.name}>
                  <label htmlFor={`c-${field.name}`}>{field.label}</label>
                  <input
                    id={`c-${field.name}`}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={update(field.name)}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={errors[field.name] ? `e-${field.name}` : undefined}
                    required
                  />
                  {errors[field.name] && (
                    <span className="err" id={`e-${field.name}`}>
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}

              <div className={`field ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  name="message"
                  rows="4"
                  placeholder="Tell me about the project, the team and the timeline…"
                  value={values.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'e-message' : undefined}
                  required
                />
                {errors.message && (
                  <span className="err" id="e-message">
                    {errors.message}
                  </span>
                )}
              </div>

              <button className="btn btn-primary btn-block" type="submit">
                Send message <Send size={15} strokeWidth={2} />
              </button>
              <p className="form__note">
                This site opens your email client with the message pre-filled — nothing is stored or sent to a server.
              </p>
              <p className="form__status" data-state={status.tone} role="status" aria-live="polite">
                {status.text}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
