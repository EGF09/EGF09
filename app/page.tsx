import fs from 'fs/promises';
import path from 'path';
import ClientScripts from '../components/ClientScripts';

export const revalidate = 0;

export default async function Page() {
  const filePath = path.join(process.cwd(), 'data.json');
  const dataStr = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(dataStr);

  return (
    <>
      <button className="mode-toggle" id="modeToggle" title="Toggle theme" aria-label="Toggle light/dark mode">☀️</button>
      
      <nav>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo"><span>// </span>{data.contact.email.split('@')[0]}.dev</a>
          <div className="nav-links">
            <a href="#about">about</a>
            <a href="#stack">stack</a>
            <a href="#projects">projects</a>
            <a href="#experience">experience</a>
            <a href="#github">github</a>
          </div>
          <a href="/admin" className="nav-cta">Düzenle</a>
        </div>
      </nav>

      <section id="hero">
        <div className="wrapper">
          <div className="hero-inner">
            <div>
              <div className="hero-badge">{data.hero.badge}</div>
              <h1 className="hero-title">
                <span className="hi">{data.hero.greeting}</span>
                <span className="name">{data.hero.name} <span className="accent">{data.hero.accentName}</span></span>
              </h1>
              <div className="hero-typed">
                <span id="typed-text"></span><span className="cursor"></span>
              </div>
              <div className="hero-actions">
                <a href="#projects" className="btn-primary">→ Projeleri gör</a>
                <a href="#contact" className="btn-ghost">Bana ulaş</a>
              </div>
              <div className="hero-stats">
                {data.hero.stats.map((stat: any, i: number) => (
                  <div key={i}>
                    <div className="stat-num">{stat.num}<span className="accent">{stat.accent}</span></div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-avatar">
              <div className="avatar-frame">
                <div className="avatar-placeholder">{data.hero.avatarText}</div>
              </div>
              <div className="avatar-tag">{data.hero.avatarTag1}</div>
              <div className="avatar-tag2">{data.hero.avatarTag2}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="wrapper">
          <div className="about-grid reveal">
            <div>
              <div className="section-tag">// 01. about</div>
              <h2 className="section-title" dangerouslySetInnerHTML={{ __html: data.about.title }}></h2>
              <div className="about-text">
                {data.about.paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
              <div className="about-links">
                {data.about.links.map((link: any, i: number) => (
                  <a key={i} href={link.url} className="social-btn">{link.icon} {link.text}</a>
                ))}
              </div>
            </div>
            <div className="about-values">
              {data.about.values.map((v: any, i: number) => (
                <div className="value-card" key={i}>
                  <div className="icon">{v.icon}</div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="stack">
        <div className="wrapper">
          <div className="stack-header reveal">
            <div className="section-tag">// 02. tech stack</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: data.stack.title }}></h2>
            <p>{data.stack.subtitle}</p>
          </div>
          <div className="stack-categories reveal">
            {data.stack.categories.map((cat: any, i: number) => (
              <div key={i}>
                <div className="stack-row-label">{cat.name}</div>
                <div className="tech-grid">
                  {cat.items.map((item: any, j: number) => (
                    <span className="tech-tag" key={j}><span className={`dot dot-${item.dot}`}></span>{item.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="wrapper">
          <div className="projects-header reveal">
            <div>
              <div className="section-tag">// 03. projects</div>
              <h2 className="section-title">Seçili işler &<br/><span className="accent">açık kaynak</span></h2>
            </div>
            <a href="https://github.com" className="btn-ghost">Tüm repolar →</a>
          </div>
          <div className="projects-grid">
            {data.projects.map((p: any, i: number) => (
              <div className={`project-card reveal ${p.featured ? 'featured' : ''}`} style={{ '--accent-color': p.color } as React.CSSProperties} key={i}>
                <div className="project-num">{p.num}</div>
                <div className="project-icon">{p.icon}</div>
                <div className="project-name">{p.name}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tags">
                  {p.tags.map((t: string, j: number) => <span className="p-tag" key={j}>{t}</span>)}
                </div>
                <div className="project-links">
                  {p.links.map((l: any, j: number) => (
                    <a href={l.url} className="project-link" key={j}>{l.text}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="wrapper">
          <div className="exp-grid">
            <div className="exp-sidebar reveal">
              <div className="section-tag">// 04. experience</div>
              <h2 className="section-title">İş<br/><span className="accent">geçmişi</span></h2>
            </div>
            <div className="timeline reveal">
              {data.experience.map((e: any, i: number) => (
                <div className={`timeline-item ${e.active ? 'active' : ''}`} key={i}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">{e.date}</div>
                  <div className="timeline-company">{e.company}</div>
                  <div className="timeline-role">{e.role}</div>
                  <div className="timeline-desc">{e.desc}</div>
                  <ul className="timeline-bullets">
                    {e.bullets.map((b: string, j: number) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="github">
        <div className="wrapper">
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div className="section-tag">// 05. github</div>
            <h2 className="section-title">Açık kaynak &<br/><span className="accent">katkılarım</span></h2>
          </div>
          <div className="github-inner reveal">
            <div className="github-profile">
              <div className="gh-avatar">{data.hero.avatarText}</div>
              <div className="gh-name">{data.hero.name} {data.hero.accentName}</div>
              <div className="gh-handle">@{data.contact.github.split('/').pop()}</div>
              <div className="gh-stats">
                <div className="gh-stat"><div className="gh-stat-num">147</div><div className="gh-stat-label">Repos</div></div>
                <div className="gh-stat"><div className="gh-stat-num">1.2k</div><div className="gh-stat-label">Stars</div></div>
                <div className="gh-stat"><div className="gh-stat-num">89</div><div className="gh-stat-label">Forks</div></div>
                <div className="gh-stat"><div className="gh-stat-num">234</div><div className="gh-stat-label">Followers</div></div>
              </div>
            </div>
            <div className="github-content">
              <div>
                <div className="contrib-bar-label"><span>TypeScript</span><span>38%</span></div>
                <div className="contrib-bar"><div className="contrib-fill" style={{ width: '38%' }}></div></div>
              </div>
              <div>
                <div className="contrib-bar-label"><span>JavaScript</span><span>27%</span></div>
                <div className="contrib-bar"><div className="contrib-fill violet" style={{ width: '27%' }}></div></div>
              </div>
              <div>
                <div className="contrib-bar-label"><span>Python</span><span>18%</span></div>
                <div className="contrib-bar"><div className="contrib-fill peach" style={{ width: '18%' }}></div></div>
              </div>
              <div style={{ marginTop: 8 }}>
                <div className="contrib-bar-label"><span>2024 katkı aktivitesi</span><span>847 katkı</span></div>
                <div className="activity-grid" id="activityGrid"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrapper">
          <div className="contact-grid">
            <div className="reveal">
              <div className="section-tag">// 06. contact</div>
              <h2 className="contact-cta-big" dangerouslySetInnerHTML={{ __html: data.contact.title }}></h2>
              <p className="contact-sub">{data.contact.subtitle}</p>
              <div className="contact-methods">
                <a href={`mailto:${data.contact.email}`} className="contact-method">
                  <span className="icon">✉</span> {data.contact.email}
                </a>
                <a href={data.contact.linkedinUrl} className="contact-method">
                  <span className="icon">in</span> {data.contact.linkedin}
                </a>
                <a href={data.contact.githubUrl} className="contact-method">
                  <span className="icon">⟨/⟩</span> {data.contact.github}
                </a>
              </div>
            </div>
            <div className="reveal">
              <div className="contact-form">
                <div className="form-group"><label>AD SOYAD</label><input type="text" className="form-control" placeholder="Ahmet Yılmaz" /></div>
                <div className="form-group"><label>E-POSTA</label><input type="email" className="form-control" placeholder="ahmet@sirket.com" /></div>
                <div className="form-group"><label>MESAJ</label><textarea className="form-control" placeholder="Projeniz hakkında kısaca bilgi verin..."></textarea></div>
                <button className="btn-primary" style={{ marginTop: 8 }}>Mesaj Gönder →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-copy">
            <span className="accent">{data.contact.email.split('@')[0]}</span>.dev — 2024
          </div>
          <nav className="footer-nav">
            <a href="#hero">top</a>
            <a href="#projects">projects</a>
            <a href="#contact">contact</a>
          </nav>
        </div>
      </footer>

      <ClientScripts phrases={data.hero.phrases} />
    </>
  );
}
