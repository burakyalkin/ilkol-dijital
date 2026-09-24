import { SITE, SERVICES, STEPS, WORKS } from "@/lib/site";
import { mockup } from "@/lib/cards";
import CopyEmail from "./CopyEmail";

const Arrow = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export function Manifesto() {
    return (
        <section id="yaklasim" className="sec sec--ink manifesto" data-header="dark">
            <div className="wrap manifesto__grid">
                <p className="eyebrow">Yaklaşımımız</p>
                <h2 className="manifesto__statement">
                    Gürültüyü çıkarıyoruz. <span>Geriye markanızın gerçekten söylemesi gereken kalıyor.</span>
                </h2>
                <div className="principles">
                    <div className="principle">
                        <h3>Yaratıcı</h3>
                        <p>Her marka için sıfırdan düşünürüz. Fikri sektörünüzün kendi dilinden, müşterinizin alışkanlıklarından çıkarırız.</p>
                    </div>
                    <div className="principle">
                        <h3>Sade</h3>
                        <p>Ziyaretçi aradığını ilk bakışta bulur. Az öğe, net mesaj, hızlı açılan sayfalar.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Services() {
    return (
        <section id="hizmetler" className="sec sec--paper">
            <div className="wrap">
                <div className="sec-head">
                    <p className="eyebrow">Hizmetler</p>
                    <div>
                        <h2>Sitenizi kurar, bulunur hale getiririz.</h2>
                        <p>Tasarımdan yayına, yayından üst sıralara kadar tek ekip. İhtiyacınız olan hizmeti seçin, gerisini birlikte planlayalım.</p>
                    </div>
                </div>
                <ul className="services">
                    {SERVICES.map((s) => (
                        <li key={s.name} className="service">
                            <h3 className="service__name">
                                {s.name}
                                <Arrow className="service__arrow" />
                            </h3>
                            <p className="service__desc">{s.desc}</p>
                            <div className="tags">
                                {s.tags.map((t) => (
                                    <span key={t} className="tag">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export function Process() {
    return (
        <section id="surec" className="sec sec--cobalt process">
            <div className="wrap">
                <div className="sec-head">
                    <p className="eyebrow">Süreç</p>
                    <div>
                        <h2>Dört adımda yukarı.</h2>
                        <p>Her adımın sonunda ne elde ettiğinizi görürsünüz. Sürpriz yok, gereksiz toplantı yok.</p>
                    </div>
                </div>
                <ol className="steps">
                    {STEPS.map((s, i) => (
                        <li key={s.title} className="step">
                            <span className="step__no">Adım {i + 1}</span>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export function Works() {
    return (
        <section id="isler" className="sec sec--paper">
            <div className="wrap">
                <div className="sec-head">
                    <p className="eyebrow">İşler</p>
                    <div>
                        <h2>Üste taşıdığımız markalar.</h2>
                    </div>
                </div>
                <div className="works">
                    {WORKS.map((w) => (
                        <article key={w.client} className="work">
                            <div className="work__visual" style={{ background: w.bg }}>
                                <div className="work__fan">
                                    {w.cards.map(([kind, pal], i) => (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img key={i} src={mockup(kind, pal, i + 2)} alt="" />
                                    ))}
                                </div>
                            </div>
                            <div className="work__body">
                                <p className="eyebrow work__kind">{w.kind}</p>
                                <h3>{w.client}</h3>
                                <p>{w.desc}</p>
                                <a className="work__link" href={w.url} target="_blank" rel="noopener noreferrer">
                                    {w.domain}
                                    <Arrow />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Contact() {
    return (
        <section id="iletisim" className="sec sec--ink contact" data-header="dark">
            <div className="wrap">
                <p className="eyebrow">İletişim</p>
                <h2 className="contact__title">
                    Sıradaki <em>üst sıra</em> sizin olsun.
                </h2>
                <div className="contact__grid">
                    <p className="contact__lead">
                        Sitenizin adresini ve ulaşmak istediğiniz hedefi yazın. Size özel bir yol haritasıyla dönüş yapalım.
                    </p>
                    <div className="contact__mail">
                        <a id="iletisim-eposta" href={`mailto:${SITE.email}`}>
                            {SITE.email}
                        </a>
                        <div className="contact__actions">
                            <a href={`mailto:${SITE.email}?subject=Teklif%20talebi`} className="btn btn--light">
                                E-posta yazın
                            </a>
                            <CopyEmail email={SITE.email} />
                        </div>
                    </div>
                </div>
                <footer className="foot">
                    <a href="#" className="logo" aria-label="İlkol Dijital ana sayfa">
                        <span className="logo__mark">
                            ilkol<i>.</i>
                        </span>
                        <span className="logo__sub">dijital</span>
                    </a>
                    <span>© {new Date().getFullYear()} İlkol Dijital · Yaratıcı ve sade.</span>
                    <div className="foot__links">
                        <a href="#hizmetler">Hizmetler</a>
                        <a href="#isler">İşler</a>
                        <a href="#iletisim">İletişim</a>
                    </div>
                </footer>
            </div>
        </section>
    );
}
