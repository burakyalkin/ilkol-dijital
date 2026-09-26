import { SITE, CONTACT, SERVICES, STEPS, WORKS } from "@/lib/site";
import { mockup } from "@/lib/cards";
import { ChatIcon, PhoneIcon } from "./Icons";
import { Reveal, RiseWords, ScrollWords } from "./Motion";

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
                    <ScrollWords
                        segments={[
                            { text: "Çoğu site çok konuşur, az satar." },
                            { text: "Bizimkiler az konuşur, çok satar.", className: "manifesto__soft" },
                        ]}
                    />
                </h2>
                <div className="principles">
                    <Reveal className="principle">
                        <h3>Yaratıcı</h3>
                        <p>Her marka için sıfırdan düşünürüz. Fikri sektörünüzün kendi dilinden, müşterinizin alışkanlıklarından çıkarırız.</p>
                    </Reveal>
                    <Reveal className="principle" delay={0.12}>
                        <h3>Sade</h3>
                        <p>Ziyaretçi ne sattığınızı ilk bakışta anlar, aradığını tek dokunuşla bulur. Az öğe, net mesaj, hızlı açılan sayfalar.</p>
                    </Reveal>
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
                        <h2>
                            Site kurmak işin yarısı. <span className="accent">Diğer yarısı bulunmak.</span>
                        </h2>
                        <p>Tasarımdan yayına, yayından üst sıralara kadar tek ekip. İhtiyacınız olan hizmeti seçin, gerisini birlikte planlayalım.</p>
                    </div>
                </div>
                <ul className="services">
                    {SERVICES.map((s, i) => (
                        <Reveal as="li" key={s.name} className="service" delay={i * 0.06}>
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
                        </Reveal>
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
                        <p>Ne zaman ne olacağını baştan bilirsiniz. Her adımın sonunda elinizde görebileceğiniz bir şey olur. Sürpriz yok, gereksiz toplantı yok.</p>
                    </div>
                </div>
                <ol className="steps">
                    {STEPS.map((s, i) => (
                        <Reveal as="li" key={s.title} className="step" delay={i * 0.15} y={56}>
                            <span className="step__no">Adım {i + 1}</span>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </Reveal>
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
                        <p>Söz vermek kolay. Yaptıklarımız burada.</p>
                    </div>
                </div>
                <div className="works">
                    {WORKS.map((w) => (
                        <Reveal as="article" key={w.client} className="work" y={40}>
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
                        </Reveal>
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
                    <RiseWords segments={[{ text: "Sıradaki" }, { text: "üst sıra", className: "contact__em", keep: true }, { text: "sizin olsun." }]} />
                </h2>
                <div className="contact__grid">
                    <p className="contact__lead">
                        Sitenizin adresini ve ulaşmak istediğiniz hedefi WhatsApp'tan yazın ya da arayın. Size özel bir yol haritasıyla dönelim. Satış baskısı yok; önce dinliyoruz.
                    </p>
                    <div className="contact__mail">
                        <a href={CONTACT.tel} aria-label={`Telefon: ${SITE.phoneDisplay}`}>
                            {SITE.phoneDisplay}
                        </a>
                        <div className="contact__actions">
                            <a href={CONTACT.whatsapp} className="btn btn--light" target="_blank" rel="noopener noreferrer">
                                <ChatIcon />
                                {CONTACT.whatsappLabel}
                            </a>
                            <a href={CONTACT.tel} className="btn btn--outline-light">
                                <PhoneIcon />
                                {CONTACT.callLabel}
                            </a>
                        </div>
                        <p className="contact__alt">
                            E-postayı tercih ederseniz: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                        </p>
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
