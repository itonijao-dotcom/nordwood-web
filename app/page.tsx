import Link from "next/link";
import { heroFactory } from "./generated-assets";
import { aboutFactory, sustainableForest } from "./assets-home";
import { darkAlpin, darkChevron, darkCognac, darkSmoked } from "./assets-dark";
import ProjectPlanner from "./project-planner";
import { SiteFooter, SiteHeader } from "./site-shared";

const capabilities = [
  ["01", "Parquet processing", "An integrated production flow designed around stable, repeatable industrial standards."],
  ["02", "Profiling", "A dedicated profiling stage within the complete parquet production operation."],
  ["03", "Finishing", "Finishing organized as part of a disciplined process focused on consistent quality over time."],
  ["04", "Quality control", "A dedicated quality-control function built into the planned industrial organization."],
  ["05", "Storage", "Dedicated storage areas designed to support an organized and reliable production flow."],
  ["06", "Logistics preparation", "Shipment preparation from a highway-adjacent site positioned for European logistics flows."],
] as const;

const collections = [
  {name:"Parquet processing",type:"Industrial production flow",image:darkAlpin,href:"/products"},
  {name:"Profiling",type:"Dedicated production stage",image:darkSmoked,href:"/products"},
  {name:"Finishing",type:"Controlled production function",image:darkCognac,href:"/products"},
  {name:"Quality & logistics",type:"QC / storage / shipment preparation",image:darkChevron,href:"/products"},
] as const;

export default function Home() {
  return (
    <main className="nw-site">
      <div className="nw-hero-shell">
        <SiteHeader />
        <section className="nw-hero">
          <div className="nw-hero-image" style={{backgroundImage:`linear-gradient(90deg,rgba(4,14,10,.16),rgba(4,14,10,.03)),url("${heroFactory}")`}} />
          <div className="nw-hero-content">
            <span className="nw-kicker">PARQUET PRODUCTION PLATFORM · NORTH MACEDONIA</span>
            <h1>PRECISION<br/>AT <em>SCALE.</em></h1>
            <p>NORDWOOD is developing an industrial parquet production base in North Macedonia, designed from the beginning around process stability, consistent quality and the needs of the European market.</p>
            <div className="nw-hero-actions">
              <Link className="nw-btn nw-btn--gold" href="/products">Explore collections <span>↗</span></Link>
              <Link className="nw-btn nw-btn--ghost" href="/contact">Plan a B2B project <span>↗</span></Link>
            </div>
          </div>
          <div className="nw-hero-index"><span>NORDWOOD / NORTH MACEDONIA</span><span>EUROPEAN MARKET ORIENTATION</span></div>
        </section>
      </div>

      <section className="nw-proof" aria-label="Production highlights">
        <div><span>INDUSTRIAL SITE</span><strong>~6,000 <i>m²</i></strong></div>
        <div><span>START-UP CAPACITY</span><strong>~1,500 <i>m²/day</i></strong></div>
        <div><span>MARKET</span><strong>EU <i>focused</i></strong></div>
        <div><span>EXPORT</span><strong>EUR.1 <i>framework</i></strong></div>
      </section>

      <section className="nw-intro nw-pad" id="company">
        <div className="nw-section-tag">01 / COMPANY</div>
        <div className="nw-intro-grid">
          <h2>NOT A FLOORING BRAND.<br/><span>A PRODUCTION PARTNER.</span></h2>
          <div className="nw-intro-copy">
            <p className="nw-lead">The NORDWOOD journey begins with entrepreneurial experience in Geneva in 1999, rooted in construction, site organization, materials and operational management.</p>
            <p>That hands-on background is now being translated into a more industrial vision: a serious parquet production base built around process stability, operational discipline, consistent quality and reliable standards over time.</p>
            <Link className="nw-text-link" href="/about">Discover NORDWOOD <span>↗</span></Link>
          </div>
        </div>
        <div className="nw-intro-visual">
          <img src={aboutFactory} alt="NORDWOOD production facility"/>
          <div className="nw-visual-note"><span>DESIGNED FOR</span><strong>REPEATABLE<br/>QUALITY</strong><small>process · control · consistency</small></div>
        </div>
      </section>

      <section className="nw-production nw-pad" id="production">
        <div className="nw-section-head">
          <div><span className="nw-section-tag">02 / PRODUCTION</span><h2>ONE PLATFORM.<br/>SIX CORE FUNCTIONS.</h2></div>
          <p>The industrial vision brings parquet processing, profiling, finishing, quality control, storage and logistics preparation into one organized structure.</p>
        </div>
        <div className="nw-capabilities">
          {capabilities.map(([n,title,copy])=><article key={n}><span>{n}</span><div className="nw-cap-line"/><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="nw-collections nw-pad">
        <div className="nw-section-head nw-section-head--light">
          <div><span className="nw-section-tag">03 / CAPABILITIES</span><h2>CORE FUNCTIONS.<br/>ONE INDUSTRIAL LOGIC.</h2></div>
          <Link className="nw-text-link nw-text-link--light" href="/products">View all capabilities <span>↗</span></Link>
        </div>
        <div className="nw-collection-grid">
          {collections.map((item,i)=><Link className="nw-collection-card" href={item.href} key={item.name}><img src={item.image} alt={item.name}/><div><span>0{i+1}</span><p>{item.type}</p><h3>{item.name}</h3><b>↗</b></div></Link>)}
        </div>
        <div className="nw-custom-strip"><span>SPECIFIC REQUIREMENT?</span><p>Profiling, finishing, quality and logistics requirements can be discussed directly with the NORDWOOD team.</p><a href="mailto:sales@nordwood.eu?subject=NORDWOOD%20production%20requirement">Discuss your requirement ↗</a></div>
      </section>

      <section className="nw-b2b nw-pad" id="b2b">
        <div className="nw-section-tag">04 / WHY NORDWOOD</div>
        <div className="nw-b2b-grid">
          <div className="nw-b2b-title"><h2>BUILT AROUND<br/>STABLE<br/><span>PRODUCTION.</span></h2><p>NORDWOOD&apos;s industrial vision is based on a simple principle: reliable output depends on process stability, operational discipline, consistent quality and a standard that can be maintained over time.</p></div>
          <div className="nw-risk-grid">
            <article><span>01</span><h3>CONSISTENCY</h3><p>Controlled finishing recipes and repeatable profiling across production batches.</p></article>
            <article><span>02</span><h3>STRUCTURE</h3><p>Dedicated functions for production, quality control, storage and logistics preparation.</p></article>
            <article><span>03</span><h3>TRACEABILITY</h3><p>A professional export structure built to support proper traceability and origin documentation.</p></article>
            <article><span>04</span><h3>PROXIMITY</h3><p>North Macedonia offers road and rail corridors, regional port access and cross-border connectivity toward Europe.</p></article>
          </div>
        </div>
      </section>

      <section className="nw-sourcing" id="sourcing" style={{backgroundImage:`linear-gradient(90deg,rgba(3,20,14,.92) 0%,rgba(3,20,14,.68) 52%,rgba(3,20,14,.28) 100%),url("${sustainableForest}")`}}>
        <div className="nw-sourcing-inner">
          <span className="nw-section-tag">05 / RESPONSIBLE SOURCING</span>
          <h2>INDUSTRIAL SCALE.<br/>RESPONSIBLE INPUT.</h2>
          <p>European B2B projects increasingly demand traceable material streams. NORDWOOD is structured to work with certified wood supply and documented project requirements without compromising production efficiency.</p>
          <div className="nw-cert-row"><span>FSC® / PEFC</span><span>EUR.1</span><span>EUROPEAN ROUTING</span></div>
        </div>
      </section>

      <section className="nw-project nw-pad" id="project">
        <div className="nw-project-copy">
          <span className="nw-section-tag">06 / START A PROJECT</span>
          <h2>GIVE US THE BRIEF.<br/><span>WE&apos;LL TAKE IT FROM THERE.</span></h2>
          <p>Use the planner to package the basics for our commercial team. If you already have technical requirements or project documentation, add them in your email before sending.</p>
        </div>
        <ProjectPlanner />
      </section>

      <section className="nw-final-cta">
        <span>READY WHEN YOU ARE.</span>
        <h2>LET&apos;S BUILD<br/>YOUR NEXT <em>FLOOR.</em></h2>
        <div><a href="mailto:sales@nordwood.eu">sales@nordwood.eu ↗</a><Link href="/products">Browse materials →</Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
