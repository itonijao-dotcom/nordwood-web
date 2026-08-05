import Link from "next/link";
import { heroFactory } from "../generated-assets";
import { aboutFactory } from "../assets-home";
import { darkAlpin, darkChevron, darkSmoked } from "../assets-dark";
import { SiteFooter, SiteHeader } from "../site-shared";

const steps = [
  ["01","PARQUET PROCESSING","Production material","Integrated industrial processing","Processed parquet"],
  ["02","PROFILING","Processed parquet","Dedicated profiling stage","Profiled parquet"],
  ["03","FINISHING","Profiled parquet","Controlled finishing process","Finished parquet"],
  ["04","QUALITY CONTROL","Production output","Quality-control system","Verified production"],
  ["05","STORAGE","Controlled production","Dedicated storage area","Organized stock"],
  ["06","LOGISTICS PREPARATION","Prepared order","Shipment preparation","Ready for dispatch"],
] as const;

export default function ProductionPage(){
  return <main className="nw-subpage nw-production-page">
    <div className="production-page-top">
      <SiteHeader/>
      <section className="production-page-hero">
        <div className="production-page-bg" style={{backgroundImage:`linear-gradient(90deg,rgba(5,18,13,.94),rgba(5,18,13,.25)),url("${heroFactory}")`}}/>
        <div><span className="nw-section-tag">PRODUCTION / 02</span><h1>ONE SITE.<br/><em>SIX INDUSTRIAL<br/>FUNCTIONS.</em></h1><p>NORDWOOD&apos;s production vision brings processing, profiling, finishing, quality control, storage and logistics preparation into one coherent industrial structure.</p></div>
      </section>
    </div>

    <section className="production-metrics">
      <div><span>INDUSTRIAL SITE</span><strong>~6,000 m²</strong></div><div><span>START-UP CAPACITY</span><strong>~1,500 m²/day</strong></div><div><span>CORE MARKET</span><strong>Europe focused</strong></div><div><span>EXPORT</span><strong>EUR.1 framework</strong></div>
    </section>

    <section className="production-flow nw-pad">
      <div className="nw-section-head"><div><span className="nw-section-tag">INDUSTRIAL MODEL</span><h2>FROM PROCESS<br/>TO DISPATCH.</h2></div><p>The company profile defines six core functions designed to work as one complete industrial operation.</p></div>
      <div className="production-steps">{steps.map(([n,t,input,control,output])=><article key={n}><div className="step-head"><span>{n}</span><h3>{t}</h3></div><dl><div><dt>INPUT</dt><dd>{input}</dd></div><div><dt>CONTROL</dt><dd>{control}</dd></div><div><dt>OUTPUT</dt><dd>{output}</dd></div></dl></article>)}</div>
    </section>

    <section className="production-facility nw-pad">
      <div className="facility-image"><img src={aboutFactory} alt="NORDWOOD production site"/><span>PRODUCTION SITE / NORTH MACEDONIA</span></div>
      <div className="facility-copy"><span className="nw-section-tag">THE FACILITY</span><h2>DESIGNED FOR<br/><em>COMPLETE OPERATION.</em></h2><p>The approximately 6,000 m² site is being developed with dedicated areas for production, quality control, storage, logistics preparation and gradual capacity growth.</p><ul><li>Parquet processing</li><li>Profiling</li><li>Finishing</li><li>Quality control</li><li>Storage</li><li>Logistics preparation</li></ul></div>
    </section>

    <section className="production-output nw-pad">
      <div className="nw-section-head"><div><span className="nw-section-tag">CORE OPERATIONS</span><h2>PROCESS.<br/>PROFILE. FINISH.</h2></div><Link className="nw-text-link" href="/products">Open capabilities ↗</Link></div>
      <div className="production-output-grid">
        <Link href="/products"><img src={darkAlpin} alt="Parquet processing reference"/><span>01</span><h3>PARQUET PROCESSING</h3><p>The core industrial activity around which the production platform is being developed.</p></Link>
        <Link href="/products"><img src={darkChevron} alt="Parquet profiling reference"/><span>02</span><h3>PROFILING</h3><p>A dedicated production function within the integrated industrial operation.</p></Link>
        <Link href="/products"><img src={darkSmoked} alt="Parquet finishing reference"/><span>03</span><h3>FINISHING</h3><p>A controlled production stage built around repeatability and consistent standards.</p></Link>
      </div>
    </section>

    <section className="quality-band"><div><span className="nw-section-tag">INDUSTRIAL DISCIPLINE</span><h2>STABLE.<br/>REPEATABLE.</h2></div><div className="quality-list"><div><b>01</b><span>Process</span><p>Production stability before uncontrolled growth.</p></div><div><b>02</b><span>Quality</span><p>A consistent standard maintained over time.</p></div><div><b>03</b><span>Traceability</span><p>Professional organization for credible export activity.</p></div><div><b>04</b><span>Scaling</span><p>Gradual capacity growth with disciplined development.</p></div></div></section>

    <section className="subpage-cta"><span>HAVE A SPECIFICATION READY?</span><h2>LET&apos;S TURN IT<br/>INTO <em>OUTPUT.</em></h2><Link className="nw-btn nw-btn--gold" href="/contact">Start a project ↗</Link></section>
    <SiteFooter/>
  </main>
}
