import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

// ── Template definitions with real preview content ──────────────────────────
const TEMPLATES = [
  {
    id: 1,
    title: 'The Executive',
    category: 'Professional',
    tag: 'ATS Optimized',
    tagType: 'ats',
    accentColor: '#4F46E5',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzTH_c3ODVvG7NeDH1zZGPDbqljRmlH1e-D7khE7rfM2bx2P5JDc1xZY7BK8gwAa72AX4eR8WGs_p5_jrTkX_aN_uAkrusUIMmvYm8FpvXvI4-R_RMMc2gquJZCCaQoNUGKZrtr2P2rwTAo2s6oeKpqPzagl3CpZqmYxLEOF9K6FCfTqhqkXfvKVjngW5jVjpfvzcrkQy72VCIImvROpKwEsM6n7gehyain0O_DcPPLzRtR9YOBc2DkF9BYVSnFUpY0Tu4uGCDvLiU',
    layout: 'classic',
    description: 'A bold, commanding layout designed for C-suite and senior leadership roles. Clean hierarchy with strong typographic presence.',
    features: ['Single-column structure', 'Bold section headers', 'ATS-safe formatting', 'Executive summary block'],
  },
  {
    id: 2,
    title: 'Modern Minimalist',
    category: 'Modern',
    tag: 'Premium',
    tagType: 'premium',
    accentColor: '#7C3AED',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_Cj2_Mj3MbfGWtBCM1B4HCOeu_pCsksVSQO0M_42Ei8QACpjauEgznVAI9TvZipVx9u0kka2C4toIury9Sqvtx6N7SBZK--3I9pf-nxdBemWAyCZ6KxsffXAM6nW-XB7vI-7EVku-lNAlhwJz8jNqVsGw0vho6nTXElNhuDujzXoc6AIJ3X6pkQ6ZvY73dGJbaiAqEomx5AEeA7UFRym5Zo0VJtxpG0xUiQy328YfDwN3efj7APVhjC1b19wvfU53C2wydzSZcBdj',
    layout: 'two-column',
    description: 'Elegant negative space with a left sidebar for skills and contact info. Perfect for product managers and designers.',
    features: ['Two-column layout', 'Sidebar for skills', 'Minimal color palette', 'Modern typography'],
  },
  {
    id: 3,
    title: 'Creative Pro',
    category: 'Creative',
    tag: 'ATS Optimized',
    tagType: 'ats',
    accentColor: '#DB2777',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY98cpZslp1nLpkTQODK27cq6JISIaB9doByRKEjxjU3NPvNWN5b7M0TeJlzhNZ7IDQlY3zSa0RHjftUtoNfdP5GypIE8CHDeuK495EvRg6k6YXr7uJIaFKXwSHlpUojdvmDBUYLabBsHVB8aj2sZwPt723CPngG2R2MDWjGShO1DjbraD8Zo7GVzqstywefwWxdWHWdxlRe6taVFRt2P9XMlgi4U6QRBVVf27eWvu4KH2WN__1V1pfrwedg3cPmeu91TMw10ZgWVQ',
    layout: 'creative',
    description: 'A vibrant, expressive layout for designers, illustrators, and creative directors. Includes a portfolio link section.',
    features: ['Full-width header band', 'Color accent sidebar', 'Portfolio URL section', 'Icon-enhanced contact block'],
  },
  {
    id: 4,
    title: 'Scholar Elite',
    category: 'Minimal',
    tag: 'Academic CV',
    tagType: 'ats',
    accentColor: '#065F46',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2NrBI_1v8LwGy5iC15DnS7rbd88MpK57Cug9cE69VzwgWRRgalOUKF_i3lhj9cBkx5hOvbCcExdPNfiZuhtQhvYvVXWdVlXT57ukgE4NgKiWtYjp1zL9SmLx8K5WEsZHs-7fAMnbMMnUZUQIAqq2X4gznOWpN2qlNXKW_JqcCiRQxkKmCamzVHEBc8B9kn1z6_Zh4H1tivU2iMhQ96CG0_sFN9ckGAq_r4oAQKrkD8TBPN0WcEhoPRv4z-ekLw11SDpbjON1yuZab',
    layout: 'academic',
    description: 'Traditional academic CV format with sections for publications, research, and teaching. Preferred by universities and research roles.',
    features: ['Publications section', 'Research interests block', 'Traditional serif style', 'Compact line spacing'],
  },
  {
    id: 5,
    title: 'First Impression',
    category: 'Modern',
    tag: 'ATS Optimized',
    tagType: 'ats',
    accentColor: '#0891B2',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj59dNc86clhsdv4ejhaN13N3mlhuU4nEk4u_ktDOU2Yek92oxwPbM5D9M6i17IrsHooCZxfQO60AH9LuSEavXiM7MsiBHLtrNi1TiKNN02Ra12feZ6hR07hxbdmMIi_888fWpoJsmNZFagiLZMPji7K_Z_ijciS9Y8uTHwtbKSKfOtVvHOB0c-gqYnpFdIGjCf5jGYCuF_DmeswjObFKAScE2hcOtIxuEHTyiPqLOCqQWWVHYoUeyNfOC92fqLr6-ET-W4RfKh3Rp',
    layout: 'modern-header',
    description: 'A clean, impactful design with a bold top banner section. Great for entry-to-mid-level professionals making their first impression.',
    features: ['Bold color header band', 'Clean skills grid', 'Achievements-first layout', 'Easy ATS parsing'],
  },
  {
    id: 6,
    title: 'The Strategist',
    category: 'Professional',
    tag: 'Premium',
    tagType: 'premium',
    accentColor: '#B45309',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWFojLJPel57gLFRJZ-UmlvlN0zIw8iwHJk8RqIGYJlbE6d1i8EursbTtYwJisd7wtRU5bYPAE_U-TlzI-O0wgpG6OjapRlCEVs_hINWR7zQdpZ71nGBc6XCYDYVsdO75ZrzskIV-nN5m1np-D4s3X1IySLcku0yrohzjszw5av2syplyeaSSgeT5xsT_Gb_YxJPWNxqpODkFhqSlB9mRfUKiyOdXhfDV9H82xtDnkWM0LkvmkceZtcuSDuVFJSo-gCCNuODZ-kK5J',
    layout: 'executive-split',
    description: 'A sophisticated split layout for business strategists and consultants. Features a metrics/impact panel for quantified achievements.',
    features: ['Split header layout', 'Metrics impact panel', 'Consulting-style bullets', 'Industry keyword zones'],
  },
  {
    id: 7,
    title: 'Code Architect',
    category: 'Modern',
    tag: 'ATS Optimized',
    tagType: 'ats',
    accentColor: '#1D4ED8',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuRmxxRDUkw-C9t3uQeL1W6f4I5-2ms_JgKEvkp9BnUYB0YMYyP55rqOLtg_SCs1hrYhoz9DKPaz9epCUUYibqdfNXVmT9k5CTxnKqdU0V-c7Xo0eHgwVjVc_qYPnCEZWgecd7sEGARJTQ6GdjvOWtBqumKI4YM7tSK-bxmucnmBlAMu1DDwilmCo3V1gF9BSFZGPOPqdSH3dxhIEJCWBonzJ-BHF2vP9_rRCMSzxUjYY5kcLjwHHNUVRQQcj5NT1d-Ao_SbgRu9xJ',
    layout: 'tech',
    description: 'Purpose-built for software engineers and architects. Includes GitHub/portfolio links, tech stack grid, and project highlights.',
    features: ['Tech stack grid', 'GitHub & portfolio links', 'Projects showcase section', 'Open-source contributions'],
  },
  {
    id: 8,
    title: 'Portfolio Showcase',
    category: 'Creative',
    tag: 'Portfolio',
    tagType: 'ats',
    accentColor: '#9333EA',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYRqNIan0M_9dv64xLBpHxs5NIE_PxismMMqlOv3apf8724fNeeuh9CIEqIeMJBtmL72cKniaswRky9TBi3f6-tCcSE6bDBB57gXLg2qjeCI_A4Nk2FWJBhojEzJPXDTI5W1IQt9ciwyA8LQiY-3gBqnGn-gfSN3ICR0L6o7jhZdYU6iK5DHM4IWc6hwuyQGs1zxVcDIug6-VRZBIrWojh1BlFqy5aMY-5oTxnshe7grrcRrHc9goGyR6Uz61cc4eZHmm8BG-T74UQ',
    layout: 'portfolio',
    description: 'Ideal for UX/UI designers and creatives wanting to integrate portfolio links directly into their resume alongside case studies.',
    features: ['Portfolio URL showcase', 'Case study summaries', 'Visual skills rating bars', 'Client list section'],
  },
];

// ── Realistic resume preview renderer ───────────────────────────────────────
function ResumePreview({ template }) {
  const ac = template.accentColor;

  const sectionTitle = (text) => (
    <div style={{ borderBottom: `2px solid ${ac}`, marginBottom: 8, paddingBottom: 3 }}>
      <p style={{ color: ac, fontWeight: 800, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {text}
      </p>
    </div>
  );

  if (template.layout === 'two-column') {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, color: '#1e1e2e', display: 'flex', minHeight: 700 }}>
        {/* Sidebar */}
        <div style={{ width: '35%', background: ac + '12', padding: 20, borderRight: `3px solid ${ac}` }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: ac, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18 }}>J</div>
          <div style={{ marginBottom: 14 }}>
            {sectionTitle('Contact')}
            {['alex@email.com', '+1 555 0123', 'San Francisco, CA', 'linkedin.com/in/alex'].map((c, i) => (
              <p key={i} style={{ color: '#475569', marginBottom: 3, lineHeight: 1.5 }}>{c}</p>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            {sectionTitle('Skills')}
            {['Figma', 'Framer', 'React', 'Design Systems', 'User Research', 'Prototyping'].map((sk, i) => (
              <div key={i} style={{ background: ac, color: '#fff', borderRadius: 4, padding: '2px 6px', marginBottom: 4, fontSize: 7, fontWeight: 700, display: 'inline-block', marginRight: 4 }}>{sk}</div>
            ))}
          </div>
          <div>
            {sectionTitle('Education')}
            <p style={{ fontWeight: 700 }}>B.S. Computer Science</p>
            <p style={{ color: '#64748b' }}>UC Berkeley • 2016</p>
          </div>
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: 20 }}>
          <div style={{ marginBottom: 14 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>Alex Rivera</h1>
            <p style={{ color: ac, fontWeight: 700, fontSize: 10, marginTop: 2 }}>Senior Product Designer</p>
          </div>
          <div style={{ marginBottom: 12 }}>
            {sectionTitle('Professional Summary')}
            <p style={{ color: '#475569', lineHeight: 1.7 }}>Award-winning Senior Product Designer with 8+ years crafting AI-powered interfaces for 2M+ global users. Expert in design systems and cross-functional leadership.</p>
          </div>
          <div style={{ marginBottom: 12 }}>
            {sectionTitle('Experience')}
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontWeight: 800 }}>Senior Product Designer</p>
                <p style={{ color: '#94a3b8' }}>Jan 2021 – Present</p>
              </div>
              <p style={{ color: ac, fontWeight: 700, marginBottom: 4 }}>TechNova Solutions</p>
              <ul style={{ paddingLeft: 14 }}>
                {['Redesigned core product for 2M+ users, +32% NPS', 'Built design system, -35% dev handoff time', 'Managed 6-designer team across 4 squads'].map((b, i) => (
                  <li key={i} style={{ color: '#475569', marginBottom: 2, lineHeight: 1.6 }}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {sectionTitle('Projects')}
            <p style={{ fontWeight: 700 }}>AI Resume Optimizer</p>
            <p style={{ color: '#64748b' }}>React, GPT-4 • Improved ATS match rate by 62%</p>
          </div>
        </div>
      </div>
    );
  }

  if (template.layout === 'tech') {
    return (
      <div style={{ fontFamily: 'monospace', fontSize: 8, color: '#1e293b', padding: 20, minHeight: 700 }}>
        <div style={{ background: '#0f172a', padding: '16px 20px', borderRadius: 6, marginBottom: 14 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 2 }}>Alex Rivera</h1>
          <p style={{ color: ac, fontWeight: 700, fontSize: 10 }}>Software Architect & Full-Stack Engineer</p>
          <p style={{ color: '#94a3b8', fontSize: 7, marginTop: 4 }}>github.com/alexrivera • alex@email.com • +1 555 0123 • SF, CA</p>
        </div>
        <div style={{ marginBottom: 12 }}>
          {sectionTitle('Tech Stack')}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {['TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'].map((t, i) => (
              <span key={i} style={{ background: ac + '20', border: `1px solid ${ac}`, color: ac, padding: '2px 7px', borderRadius: 3, fontSize: 7, fontWeight: 700 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          {sectionTitle('Experience')}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontWeight: 800 }}>Staff Software Engineer</p>
              <p style={{ color: '#94a3b8' }}>2021 – Present</p>
            </div>
            <p style={{ color: ac, fontWeight: 700, marginBottom: 4 }}>TechNova Solutions</p>
            <ul style={{ paddingLeft: 14 }}>
              {['Architected microservices infra handling 50M req/day', 'Led migration from monolith → 18 microservices, -60% latency', 'Built internal AI tooling reducing dev cycle by 40%'].map((b, i) => (
                <li key={i} style={{ marginBottom: 2, lineHeight: 1.6, color: '#475569' }}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          {sectionTitle('Projects')}
          <p style={{ fontWeight: 700 }}>Open Source: react-resume-kit <span style={{ color: '#94a3b8', fontWeight: 400 }}>• 2.4k ⭐</span></p>
          <p style={{ color: '#64748b' }}>Resume builder library — 12k weekly npm downloads</p>
        </div>
        <div>
          {sectionTitle('Education')}
          <p style={{ fontWeight: 700 }}>M.S. Computer Science — Stanford University • 2018</p>
        </div>
      </div>
    );
  }

  if (template.layout === 'creative') {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, color: '#1e1e2e', minHeight: 700 }}>
        <div style={{ background: ac, padding: '18px 20px', color: '#fff' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>Alex Rivera</h1>
          <p style={{ fontWeight: 600, opacity: 0.9, fontSize: 10, marginTop: 2 }}>Creative Director & Brand Strategist</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 7, opacity: 0.8 }}>
            {['alex@design.co', 'alexrivera.design', '+1 555 0123', 'San Francisco'].map((c, i) => (
              <span key={i}>◆ {c}</span>
            ))}
          </div>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 12 }}>
            {sectionTitle('Creative Vision')}
            <p style={{ color: '#475569', lineHeight: 1.7 }}>Award-winning creative director with 10+ years building brand identities for Fortune 500 clients. Expertise in digital storytelling, motion design, and brand systems.</p>
          </div>
          <div style={{ marginBottom: 12 }}>
            {sectionTitle('Experience')}
            <p style={{ fontWeight: 800 }}>Creative Director — BrandForge Agency</p>
            <p style={{ color: '#94a3b8', marginBottom: 4 }}>2019 – Present</p>
            <ul style={{ paddingLeft: 14 }}>
              {['Led brand overhaul for 12 Fortune 500 clients', 'Grew agency revenue 3x through design-led pitches', 'Built & mentored 15-person creative studio'].map((b, i) => (
                <li key={i} style={{ color: '#475569', marginBottom: 2, lineHeight: 1.6 }}>{b}</li>
              ))}
            </ul>
          </div>
          <div style={{ marginBottom: 12 }}>
            {sectionTitle('Capabilities')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {['Brand Identity', 'Motion Design', 'Art Direction', 'Figma', 'After Effects', 'Strategy'].map((sk, i) => (
                <span key={i} style={{ background: ac + '15', color: ac, border: `1px solid ${ac}40`, padding: '2px 8px', borderRadius: 20, fontSize: 7, fontWeight: 700 }}>{sk}</span>
              ))}
            </div>
          </div>
          <div>
            {sectionTitle('Portfolio')}
            <p style={{ color: ac, fontWeight: 700 }}>alexrivera.design/work</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Default / Classic layout ──────────────────────────────────────────────
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, color: '#1e1e2e', padding: 24, minHeight: 700 }}>
      <div style={{ borderBottom: `3px solid ${ac}`, paddingBottom: 12, marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Alex Rivera</h1>
          <p style={{ color: ac, fontWeight: 700, fontSize: 10, marginTop: 3 }}>
            {template.category === 'Minimal' ? 'Researcher & Lecturer' :
             template.category === 'Professional' ? 'Senior Executive Leader' : 'Senior Product Designer'}
          </p>
        </div>
        <div style={{ textAlign: 'right', color: '#64748b', lineHeight: 1.8 }}>
          <p>alex@email.com</p>
          <p>+1 (555) 0123-4567</p>
          <p>San Francisco, CA</p>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        {sectionTitle('Professional Summary')}
        <p style={{ color: '#475569', lineHeight: 1.7 }}>
          {template.id === 4
            ? 'Research scientist and lecturer with 12+ years in computational linguistics. 40+ peer-reviewed publications. PhD Stanford University. NSF grant recipient.'
            : template.id === 6
            ? 'Senior business strategist with 15+ years leading enterprise transformation. McKinsey alum. P&L responsibility $500M+. Board advisor.'
            : 'Award-winning Senior Product Designer with 8+ years crafting AI-powered digital products for 2M+ global users. Expert in design systems, cross-functional leadership, and rapid prototype-to-launch delivery.'}
        </p>
      </div>

      {template.layout === 'academic' && (
        <div style={{ marginBottom: 12 }}>
          {sectionTitle('Publications (Selected)')}
          <p style={{ fontWeight: 700 }}>Rivera, A. et al. (2024). "Neural Semantic Parsing at Scale." <em style={{ fontWeight: 400, color: '#64748b' }}>NeurIPS 2024.</em></p>
          <p style={{ fontWeight: 700, marginTop: 4 }}>Rivera, A. & Chen, L. (2023). "Low-Resource NLP Benchmarks." <em style={{ fontWeight: 400, color: '#64748b' }}>ACL 2023.</em></p>
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        {sectionTitle('Work Experience')}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 800 }}>
              {template.id === 4 ? 'Associate Professor' : template.id === 6 ? 'Managing Director' : 'Senior Product Designer'}
            </p>
            <p style={{ color: '#94a3b8' }}>Jan 2021 – Present</p>
          </div>
          <p style={{ color: ac, fontWeight: 700, marginBottom: 4 }}>
            {template.id === 4 ? 'Stanford University' : template.id === 6 ? 'McKinsey & Company' : 'TechNova Solutions'}
          </p>
          <ul style={{ paddingLeft: 14 }}>
            {(template.id === 6
              ? ['Led $500M digital transformation for Fortune 100 client', 'Directed 40-person consulting team across 3 continents', 'Delivered $120M in cost savings through operational redesign']
              : ['Led core product redesign for 2M+ active users, +32% NPS', 'Built design system reducing dev handoff time by 35%', 'Managed team of 6 across 4 product squads']
            ).map((b, i) => (
              <li key={i} style={{ color: '#475569', marginBottom: 2, lineHeight: 1.6 }}>{b}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        {sectionTitle('Key Skills')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {(template.id === 4
            ? ['Python', 'NLP', 'PyTorch', 'Academic Writing', 'Grant Writing', 'Peer Review']
            : template.id === 6
            ? ['Strategy', 'P&L Management', 'M&A', 'Board Governance', 'Change Management']
            : ['Figma', 'React', 'Design Systems', 'User Research', 'AI/ML UX', 'Framer']
          ).map((sk, i) => (
            <span key={i} style={{ background: ac + '15', color: ac, border: `1px solid ${ac}30`, padding: '2px 8px', borderRadius: 4, fontSize: 7, fontWeight: 700 }}>{sk}</span>
          ))}
        </div>
      </div>

      <div>
        {sectionTitle('Education')}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontWeight: 800 }}>{template.id === 4 ? 'Ph.D. Computational Linguistics' : 'B.S. Computer Science'}</p>
            <p style={{ color: '#64748b' }}>{template.id === 4 ? 'Stanford University' : 'UC Berkeley'}</p>
          </div>
          <p style={{ color: '#94a3b8' }}>{template.id === 4 ? '2012' : '2016'}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ResumeTemplates() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookmarked, setBookmarked] = useState([1, 4]);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [applySuccess, setApplySuccess] = useState(null);

  const toggleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleUseTemplate = (tpl) => {
    // Store selected template in localStorage so ResumeBuilder can pick it up
    localStorage.setItem('selectedTemplate', JSON.stringify({ id: tpl.id, title: tpl.title, accentColor: tpl.accentColor, layout: tpl.layout }));
    setApplySuccess(tpl.id);
    setTimeout(() => {
      navigate('/resume-builder');
    }, 700);
  };

  const filtered = TEMPLATES.filter((tpl) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'ATS-Friendly') return tpl.tagType === 'ats';
    return tpl.category === activeFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-10 max-w-[1400px] mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-on-surface mb-2">
              Resume Templates Gallery
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base max-w-2xl">
              Choose from our collection of professionally designed, ATS-optimized templates. Click
              <strong> Preview Layout</strong> to see a full preview, or <strong>Use Template</strong> to open it in the builder.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-4 border-b border-outline-variant/20">
            {['All', 'Modern', 'Professional', 'Minimal', 'Creative', 'ATS-Friendly'].map((flt) => (
              <button
                key={flt}
                onClick={() => setActiveFilter(flt)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-150 ${
                  activeFilter === flt
                    ? 'bg-primary text-on-primary shadow-md shadow-primary/20'
                    : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {flt === 'ATS-Friendly' ? '✓ ATS-Friendly' : flt}
              </button>
            ))}
            <span className="ml-auto text-xs text-outline font-medium">{filtered.length} templates</span>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((tpl) => {
              const isSaved = bookmarked.includes(tpl.id);
              const isApplied = applySuccess === tpl.id;
              return (
                <div
                  key={tpl.id}
                  className="group bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Template Thumbnail */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-surface-container-low border border-outline-variant/10">
                    <img
                      src={tpl.img}
                      alt={tpl.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold shadow-md ${
                          tpl.tagType === 'premium'
                            ? 'bg-gradient-to-r from-secondary to-secondary-container text-white'
                            : 'bg-surface-bright/90 backdrop-blur-md text-primary border border-primary/20'
                        }`}
                      >
                        {tpl.tag}
                      </span>
                    </div>

                    {/* Hover Overlay — two working buttons */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-6">
                      <button
                        onClick={() => handleUseTemplate(tpl)}
                        className={`w-full font-bold py-2.5 px-4 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${
                          isApplied
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white text-primary hover:bg-surface-bright'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isApplied ? 'check_circle' : 'edit_document'}
                        </span>
                        <span>{isApplied ? 'Opening Builder...' : 'Use Template'}</span>
                      </button>
                      <button
                        onClick={() => setPreviewTemplate(tpl)}
                        className="w-full bg-white/20 text-white font-bold py-2.5 px-4 rounded-xl text-xs border border-white/30 hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        Preview Layout
                      </button>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-start pt-1">
                    <div>
                      <h3 className="font-display font-bold text-base text-on-surface">{tpl.title}</h3>
                      <p className="text-xs text-outline font-medium">{tpl.category} • {tpl.tag}</p>
                    </div>
                    <button
                      onClick={() => toggleBookmark(tpl.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved ? 'text-primary bg-primary/10' : 'text-outline hover:text-primary'
                      }`}
                      title={isSaved ? 'Remove bookmark' : 'Bookmark template'}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {isSaved ? 'bookmark_added' : 'bookmark'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* ════════════════════════════════════════════════════════════
          PREVIEW MODAL — full rendered resume preview
      ════════════════════════════════════════════════════════════ */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setPreviewTemplate(null); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-2xl shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                  style={{ background: previewTemplate.accentColor }}
                >
                  <span className="material-symbols-outlined text-base">description</span>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{previewTemplate.title}</p>
                  <p className="text-[11px] text-gray-500">{previewTemplate.category} • {previewTemplate.tag}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setPreviewTemplate(null); handleUseTemplate(previewTemplate); }}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  style={{ background: previewTemplate.accentColor }}
                >
                  <span className="material-symbols-outlined text-sm">edit_document</span>
                  Use This Template
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            {/* Modal Body — side by side */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              {/* Left — Template info */}
              <div className="lg:w-72 shrink-0 p-6 border-r border-gray-100 overflow-y-auto bg-gray-50">
                <img
                  src={previewTemplate.img}
                  alt={previewTemplate.title}
                  className="w-full rounded-xl border border-gray-200 shadow-sm mb-5 object-cover"
                  style={{ maxHeight: 280 }}
                />
                <h3 className="font-bold text-base text-gray-900 mb-1">{previewTemplate.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{previewTemplate.description}</p>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Included Features</p>
                  <div className="space-y-2">
                    {previewTemplate.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="material-symbols-outlined text-sm" style={{ color: previewTemplate.accentColor }}>check_circle</span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — Live rendered preview */}
              <div className="flex-1 overflow-y-auto bg-gray-100 p-6 flex items-start justify-center">
                <div className="w-full max-w-[580px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="ml-2 text-[10px] text-gray-400 font-medium">Live Template Preview — {previewTemplate.title}</span>
                  </div>
                  <ResumePreview template={previewTemplate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
