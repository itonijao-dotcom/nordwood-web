import ProjectPlanner from "../project-planner";
import { SiteFooter, SiteHeader } from "../site-shared";

export default function ContactPage(){
  return <main className="nw-subpage nw-contact-page">
    <SiteHeader theme="light"/>
    <section className="contact-page-hero"><span className="nw-section-tag">CONTACT / 04</span><h1>TELL US WHAT<br/>YOU&apos;RE <em>BUILDING.</em></h1><div><p>For a parquet project, production requirement or European supply discussion, start with the basics and give our team the context needed for a useful first conversation.</p><a href="mailto:sales@nordwood.eu">sales@nordwood.eu ↗</a></div></section>
    <section className="contact-planner-wrap nw-pad"><div className="contact-planner-intro"><span className="nw-section-tag">PROJECT PLANNER</span><h2>FIVE FIELDS.<br/>A BETTER FIRST CALL.</h2><p>The planner packages the minimum information needed to route your request. Nothing is stored on the website; it opens your email app with the project brief ready to send.</p></div><ProjectPlanner/></section>
    <section className="contact-expect nw-pad"><div><span className="nw-section-tag">WHAT HELPS</span><h2>THE MORE SPECIFIC,<br/>THE FASTER WE MOVE.</h2></div><div className="contact-expect-grid"><article><span>01</span><h3>Material</h3><p>Species, format, finish direction or the closest reference you already have.</p></article><article><span>02</span><h3>Volume</h3><p>Approximate square meters and whether it is one order or a recurring program.</p></article><article><span>03</span><h3>Destination</h3><p>Country and, when known, preferred delivery window.</p></article><article><span>04</span><h3>Technical</h3><p>Installation, underfloor heating, certifications or project-specific constraints.</p></article></div></section>
    <section className="contact-direct"><div><span>COMMERCIAL</span><a href="mailto:sales@nordwood.eu">sales@nordwood.eu ↗</a></div><div><span>PRODUCTION SITE</span><strong>North Macedonia</strong></div><div><span>MARKET</span><strong>European market</strong></div></section>
    <SiteFooter/>
  </main>
}
