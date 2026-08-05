import Link from "next/link";
import { aboutFactory, sustainableForest } from "../assets-home";
import { SiteFooter, SiteHeader } from "../site-shared";

const principles = [
  ["01","Process stability","A production model built around disciplined, stable and repeatable work."],
  ["02","Operational discipline","Clear organization, controlled production flows and a consistent standard over time."],
  ["03","Strategic location","North Macedonia offers road and rail corridors, regional port access and cross-border connectivity."],
  ["04","Long-term vision","Gradual capacity growth with an emphasis on training, consistency and sustainable industrial value."],
] as const;

export default function AboutPage(){
  return <main className="nw-subpage">
    <SiteHeader theme="light"/>
    <section className="about-page-hero">
      <div><span className="nw-section-tag">ABOUT NORDWOOD / 01</span><h1>BUILT HERE.<br/><em>THINKING<br/>EUROPE.</em></h1><p>NORDWOOD is developing a specialized parquet production base in North Macedonia, conceived from the beginning to serve the European market with proximity, flexibility and stronger logistical responsiveness.</p></div>
      <div className="about-page-photo"><img src={aboutFactory} alt="NORDWOOD industrial site"/><span>NORTH MACEDONIA / EUROPEAN ORIENTATION</span></div>
    </section>

    <section className="about-manifesto nw-pad">
      <div className="nw-section-tag">WHAT WE ARE</div>
      <div><h2>EXPERIENCE BECAME<br/><span>INFRASTRUCTURE.</span></h2><div><p className="large">NORDWOOD grows from an entrepreneurial journey that began in Geneva in 1999 in the construction sector.</p><p>Years of experience in building works, site organization, materials and operational management shaped a more industrial vision: creating a parquet production base in North Macedonia built around method, consistent quality and long-term standards.</p></div></div>
    </section>

    <section className="about-timeline">
      <article><span>1999</span><h3>ROOTS</h3><p>The entrepreneurial journey begins in Geneva in construction, building works and operational management.</p></article>
      <article><span>TODAY</span><h3>PLATFORM</h3><p>The vision moves toward parquet processing, profiling, finishing, quality control, storage and logistics preparation in North Macedonia.</p></article>
      <article><span>EUROPE</span><h3>MARKET</h3><p>The project is designed from the beginning around professional production and export toward the European market.</p></article>
    </section>

    <section className="about-principles nw-pad">
      <div className="nw-section-head"><div><span className="nw-section-tag">HOW WE THINK</span><h2>METHOD BEFORE<br/>VOLUME.</h2></div><p>The company profile is clear about the priority: disciplined growth, stable processes and a reliable standard over time.</p></div>
      <div className="about-principle-grid">{principles.map(([n,t,c])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div>
    </section>

    <section className="about-region nw-pad">
      <div className="about-region-card"><span className="nw-section-tag">LOCATION</span><strong>NORTH<br/>MACEDONIA</strong><div className="region-dot"/><small>Highway-adjacent industrial site</small></div>
      <div className="about-region-copy"><span className="nw-section-tag">THE GEOGRAPHY WORKS</span><h2>CLOSE TO<br/>EUROPEAN FLOWS.</h2><p>North Macedonia sits in the heart of the Balkans, with road and rail corridors, proximity to regional ports and cross-border connectivity that support logistics toward European markets.</p><div><span>EUR.1 framework when eligible</span><span>Road &amp; rail corridors</span><span>Regional port access</span></div><Link className="nw-text-link" href="/production">Explore production <span>↗</span></Link></div>
    </section>

    <section className="about-sourcing" style={{backgroundImage:`linear-gradient(90deg,rgba(4,16,11,.94),rgba(4,16,11,.46)),url("${sustainableForest}")`}}>
      <div><span className="nw-section-tag">RESPONSIBLE INPUT</span><h2>THE OUTPUT IS ONLY<br/>AS GOOD AS THE <em>ORIGIN.</em></h2><p>For B2B projects that require documented material streams, NORDWOOD is structured to work with FSC® / PEFC capable supply and project-specific sourcing requirements.</p><div><span>FSC® / PEFC capable</span><span>Project documentation</span><span>European sourcing</span></div></div>
    </section>

    <section className="subpage-cta"><span>FROM VISION TO INDUSTRIAL STRUCTURE.</span><h2>SEE HOW THE<br/>PRODUCTION <em>MODEL WORKS.</em></h2><Link className="nw-btn nw-btn--gold" href="/production">Production &amp; capability ↗</Link></section>
    <SiteFooter/>
  </main>
}
