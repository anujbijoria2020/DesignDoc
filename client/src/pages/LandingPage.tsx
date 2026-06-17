import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToastStore } from '../store/toastStore';
import Button from '../components/ui/Button';
import {
  ArrowRight,
  Mail,
  MessageSquare,
  MapPin,
  Database,
  FileText,
  Workflow,
  ShieldCheck,
  Send
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { status, logout } = useAuth();
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  // Form states for Contact Us
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending email
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Message sent! We will get back to you shortly.', 'success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  const handleGetStarted = () => {
    if (status === 'authenticated') {
      navigate('/home');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col font-sans select-none scroll-smooth">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100 px-6 py-4 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-accent text-white p-2 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/10">
            <FileText size={22} />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            DesignDoc
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {status === 'loading' ? (
            <div className="w-20 h-8 bg-slate-100 rounded-lg animate-pulse"></div>
          ) : status === 'authenticated' ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="text-slate-600 hover:text-slate-900 font-semibold"
              >
                Sign Out
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/home')}
                className="font-semibold"
                rightIcon={<ArrowRight size={14} />}
              >
                Go to Workspace
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/auth')}
                className="text-slate-600 hover:text-slate-900 font-semibold"
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/auth')}
                className="font-semibold shadow-md shadow-blue-500/15"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 flex flex-col items-center justify-center text-center overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white via-slate-50/30 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-accent text-xs font-semibold mb-6 border border-blue-100/50 animate-fade-in-down">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Meet your new AI Software Architect
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight sm:leading-none mb-6">
            Turn your project idea into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
              complete design artifacts
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed mb-10">
            DesignDoc analyzes your natural language product requirements and automatically generates production-ready specifications, interactive UML diagrams, and structured database SQL schemas in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-semibold shadow-lg shadow-blue-500/20"
              onClick={handleGetStarted}
              rightIcon={<ArrowRight size={18} />}
            >
              Get Started Free
            </Button>
            <a href="#features" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-semibold text-slate-600 hover:text-slate-950 bg-white"
              >
                Learn More
              </Button>
            </a>
          </div>

          {/* Simple Visual Mockup Dashboard representation */}
          <div className="mt-16 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-xs p-3.5 shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-500 relative">
            <div className="flex items-center justify-between mb-2 border-b border-slate-100 pb-2 px-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">DESIGN_DOC_WORKSPACE (V1.0)</div>
            </div>

            <div className="rounded-xl border border-slate-100 overflow-hidden bg-slate-50/50 aspect-[16/9] flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Mockup Sidebar */}
              <div className="w-full md:w-1/5 p-4 flex flex-col gap-3 bg-slate-50 text-left select-none">
                <div className="h-6 w-24 bg-slate-200 rounded-md"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-white border border-slate-200 rounded-lg p-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-accent"></div>
                    <div className="h-2.5 w-16 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-8 rounded-lg p-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-slate-300"></div>
                    <div className="h-2.5 w-20 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-8 rounded-lg p-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-slate-300"></div>
                    <div className="h-2.5 w-14 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Mockup Chat Space */}
              <div className="flex-1 p-5 flex flex-col gap-4 text-left justify-between bg-white relative">
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex-shrink-0"></div>
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3 w-36 bg-slate-200 rounded"></div>
                      <div className="h-2 w-full bg-slate-100 rounded"></div>
                      <div className="h-2 w-4/5 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">AI</div>
                    <div className="space-y-1.5 flex-1">
                      <div className="h-3 w-28 bg-slate-200 rounded"></div>
                      <div className="h-2.5 w-full bg-blue-50/70 border border-blue-100/50 rounded-lg p-3 space-y-2 h-auto">
                        <div className="h-2 w-11/12 bg-slate-200 rounded"></div>
                        <div className="h-2 w-10/12 bg-slate-200 rounded"></div>
                        <div className="h-2 w-4/5 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Describe your next app or system requirement...</span>
                  <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>

              {/* Mockup Artifacts Preview */}
              <div className="w-full md:w-[320px] p-4 flex flex-col gap-3 bg-slate-50 text-left select-none">
                {/* Tabs */}
                <div className="flex gap-1.5 border-b border-slate-200 pb-2">
                  <div className="px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 bg-white border border-slate-200 text-slate-700">
                    <FileText size={11} className="text-slate-400" />
                    <span>SRS</span>
                  </div>
                  <div className="px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 bg-blue-50 border border-blue-100 text-accent">
                    <Workflow size={11} className="text-accent" />
                    <span>UML</span>
                  </div>
                  <div className="px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 bg-white border border-slate-100 text-slate-500">
                    <Database size={11} className="text-slate-400" />
                    <span>SQL</span>
                  </div>
                </div>

                {/* Tab Content Preview: Mock UML Diagram */}
                <div className="flex-1 rounded-xl border border-slate-200 bg-white p-3 flex flex-col justify-between overflow-hidden">
                  <div className="space-y-3">
                    {/* Class/Table 1: User */}
                    <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-2xs">
                      <div className="bg-slate-200/80 px-2 py-1 text-[9px] font-bold text-slate-700 border-b border-slate-200/60 flex items-center justify-between">
                        <span>class User</span>
                        <span className="text-[7.5px] text-slate-400 font-normal">Model</span>
                      </div>
                      <div className="p-1.5 space-y-0.5 font-mono text-[8px] text-slate-500">
                        <div className="flex justify-between"><span>+ id: int</span><span className="text-slate-400">PK</span></div>
                        <div className="flex justify-between"><span>+ email: string</span></div>
                        <div className="flex justify-between"><span>+ created_at: datetime</span></div>
                      </div>
                    </div>

                    {/* Connection indicator */}
                    <div className="flex justify-center -my-2 flex-col items-center">
                      <div className="h-4 w-px border-l border-dashed border-slate-400 relative">
                        <div className="absolute -bottom-1 -left-[2.5px] border-l-[3px] border-r-[3px] border-t-[3px] border-t-slate-400 border-l-transparent border-r-transparent"></div>
                      </div>
                    </div>

                    {/* Class/Table 2: Project */}
                    <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-2xs">
                      <div className="bg-slate-200/80 px-2 py-1 text-[9px] font-bold text-slate-700 border-b border-slate-200/60 flex items-center justify-between">
                        <span>class Project</span>
                        <span className="text-[7.5px] text-slate-400 font-normal">Model</span>
                      </div>
                      <div className="p-1.5 space-y-0.5 font-mono text-[8px] text-slate-500">
                        <div className="flex justify-between"><span>+ id: int</span><span className="text-slate-400">PK</span></div>
                        <div className="flex justify-between"><span>+ title: string</span></div>
                        <div className="flex justify-between"><span>+ user_id: int</span><span className="text-slate-400">FK</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[8.5px] text-slate-400 text-center font-medium italic mt-2">
                    Interactive UML diagram preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 lg:py-28 bg-white border-b border-slate-100 scroll-mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xs font-bold text-accent uppercase tracking-wider mb-3">Capabilities</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            Production-Ready Artifacts Instantly
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed mb-16 text-sm sm:text-base">
            From design to specification documents, DesignDoc handles the complex architectural layouts for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50/70 transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-accent flex items-center justify-center mb-6 border border-blue-100/50 shadow-xs">
                <FileText size={22} />
              </div>
              <h4 className="text-lg font-bold text-slate-950 mb-2">SRS Documents</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Generate clean, structural Software Requirements Specification sheets detailing user stories, functional modules, and assumptions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50/70 transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-accent flex items-center justify-center mb-6 border border-blue-100/50 shadow-xs">
                <Workflow size={22} />
              </div>
              <h4 className="text-lg font-bold text-slate-950 mb-2">Dynamic Diagrams</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Receive visual Entity Relationship (ERD) mapping, Class structural layouts, and flow sequence maps generated dynamically using Mermaid.js.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50/70 transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-accent flex items-center justify-center mb-6 border border-blue-100/50 shadow-xs">
                <Database size={22} />
              </div>
              <h4 className="text-lg font-bold text-slate-950 mb-2">SQL DB Schemas</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get standard, normalized SQL tables, constraints, foreign keys, and indexes compatible with PostgreSQL, MySQL, and SQLite.
              </p>
            </div>
          </div>

          {/* Quick Statistics/Highlights banner */}
          <div className="mt-16 p-8 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex flex-col md:flex-row items-center justify-around gap-8 text-center md:text-left">
            <div>
              <div className="text-3xl font-extrabold text-white mb-1">10x</div>
              <div className="text-xs text-slate-400 font-medium">Faster Spec-to-Code Pipeline</div>
            </div>
            <div className="w-px h-8 bg-slate-800 hidden md:block"></div>
            <div>
              <div className="text-3xl font-extrabold text-white mb-1">100%</div>
              <div className="text-xs text-slate-400 font-medium">Editable Markdown Artifacts</div>
            </div>
            <div className="w-px h-8 bg-slate-800 hidden md:block"></div>
            <div>
              <div className="text-3xl font-extrabold text-white mb-1">Instant</div>
              <div className="text-xs text-slate-400 font-medium">Code/DB Synchronization</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="px-6 py-20 lg:py-28 bg-slate-50/30 border-b border-slate-100 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-accent uppercase tracking-wider mb-3">Get in Touch</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
              We'd Love to Hear From You
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto leading-relaxed text-sm">
              Have questions, feedback, or custom feature inquiries? Drop us a message below and we will get back to you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {/* Contact details */}
            <div className="md:col-span-2 flex flex-col justify-between gap-8 text-left">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-accent flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">Email Us</h4>
                    <a href="mailto:designdoc@gmail.com" className="text-xs text-slate-600 hover:text-accent font-medium mt-0.5 block">
                      designdoc@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-accent flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">Live Support</h4>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      Mon - Fri, 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-accent flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">HQ Location</h4>
                    <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
                      Indore, Madhya Pradesh, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white/50 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ShieldCheck size={16} className="text-accent" />
                  Privacy Guaranteed
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Your inputs, specification documents, and email queries are stored securely and never shared with unauthorized third parties.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 flex flex-col text-left">
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-slate-200 bg-white rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-slate-200 bg-white rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Feedback, feature request, inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-slate-200 bg-white rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you are building or what you need support with..."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-slate-200 bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-accent resize-none"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full font-semibold mt-2"
                  isLoading={isSubmitting}
                  rightIcon={<Send size={14} />}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-accent text-white p-1.5 rounded-lg flex items-center justify-center shadow-md">
              <FileText size={16} />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">
              DesignDoc
            </span>
          </div>

          <p className="text-xs text-slate-500">
            DesignDoc is a software engineering tool .
          </p>

          <div className="text-xs text-slate-500 flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} DesignDoc. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
