import { useState } from 'react';
import { Plus } from 'lucide-react';
import { skills } from '../data/site';

/**
 * Skills as an editorial accordion. Each row opens to reveal the item list with
 * animated proficiency meters (CSS-driven, triggered by the .is-open class).
 */
export default function Skills() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-head split">
          <div style={{ display: 'grid', gap: 20 }}>
            <p className="eyebrow" data-reveal>
              <span className="num">04</span> Toolkit
            </p>
            <h2 className="title" id="skills-title" data-split>
              The tools I reach for
            </h2>
          </div>
          <p className="lede" data-reveal>
            Comfortable across the frontend stack — from the first wireframe to a production deploy.
          </p>
        </div>

        <div className="skills__layout">
          <div data-reveal>
            {skills.map((group, i) => {
              const isOpen = open === i;
              return (
                <div className={`skill ${isOpen ? 'is-open' : ''}`} key={group.category}>
                  <button
                    className="skill__head"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`skill-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="skill__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="skill__name">{group.category}</span>
                    <span className="skill__caption">{group.caption}</span>
                    <span className="skill__toggle" aria-hidden="true">
                      <Plus size={16} strokeWidth={2} />
                    </span>
                  </button>

                  <div className="skill__body" id={`skill-panel-${i}`} role="region" aria-label={group.category}>
                    <div>
                      <ul className="skill__list">
                        {group.items.map((item) => (
                          <li className="skill__item" key={item.name}>
                            <span className="skill__item-wrap">
                              <span className="skill__item-row">
                                <span>{item.name}</span>
                                <span className="skill__pct">{item.level}</span>
                              </span>
                              <span className="skill__meter" aria-hidden="true">
                                <i style={{ '--v': item.level / 100 }} />
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="skills__side">
            <div className="side-note" data-reveal>
              <h5>Currently</h5>
              <p className="big">Deep in React &amp; motion design</p>
              <p>Rebuilding this site as a component-driven app with scroll-linked animation.</p>
            </div>

            <div className="terminal" data-reveal>
              <div className="terminal__bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>developer.js</span>
              </div>
              <pre>
                <code>
                  <span className="c">{'// what I optimise for'}</span>
                  {'\n'}
                  <span className="k">const</span> developer = {'{\n'}
                  {'  '}
                  <span className="p">name</span>: <span className="s">'Sayak Karmakar'</span>,{'\n'}
                  {'  '}
                  <span className="p">role</span>: <span className="s">'Frontend Developer'</span>,{'\n'}
                  {'  '}
                  <span className="p">stack</span>: [<span className="s">'React'</span>, <span className="s">'JS'</span>,{' '}
                  <span className="s">'CSS'</span>],{'\n'}
                  {'  '}
                  <span className="p">focus</span>: <span className="s">'Motion &amp; access'</span>,{'\n'}
                  {'  '}
                  <span className="p">openToWork</span>: <span className="b">true</span>,{'\n'}
                  {'};'}
                </code>
              </pre>
            </div>

            <div className="side-note" data-reveal>
              <h5>Approach</h5>
              <p>Small components, clear contracts, and CSS that reads like the design.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
