"use client";

import { useState } from "react";
import Link from "next/link";
import { darkAlpin, darkAsh, darkChevron, darkCognac, darkGeneva, darkSmoked } from "../assets-dark";
import { SiteFooter, SiteHeader } from "../site-shared";

const products = [
  {name:"Parquet Processing",family:"Production",image:darkAlpin,finish:"Integrated industrial parquet processing within the planned production base."},
  {name:"Profiling",family:"Production",image:darkGeneva,finish:"Dedicated profiling as part of the complete industrial operation."},
  {name:"Finishing",family:"Production",image:darkSmoked,finish:"A controlled finishing function focused on consistent standards over time."},
  {name:"Quality Control",family:"Control",image:darkCognac,finish:"A dedicated quality-control system within the production organization."},
  {name:"Storage",family:"Operations",image:darkAsh,finish:"Dedicated storage capacity planned to support organized production flows."},
  {name:"Logistics Preparation",family:"Operations",image:darkChevron,finish:"Professional shipment preparation from North Macedonia toward European markets."},
] as const;

const filters = ["All","Production","Control","Operations"] as const;

export default function ProductsPage(){
  const [filter,setFilter]=useState<(typeof filters)[number]>("All");
  const shown = filter==="All" ? products : products.filter(p=>p.family===filter);
  return <main className="nw-catalog">
    <SiteHeader theme="light"/>
    <section className="catalog-hero">
      <div><span className="nw-section-tag">NORDWOOD / CAPABILITIES</span><h1>INDUSTRIAL FUNCTIONS.<br/><em>BUILT TO WORK TOGETHER.</em></h1><p>The company profile defines six core activities: parquet processing, profiling, finishing, quality control, storage and logistics preparation.</p></div>
      <img src={darkCognac} alt="NORDWOOD engineered wood surface"/>
    </section>
    <section className="catalog-toolbar">
      <div role="group" aria-label="Filter products">{filters.map(f=><button onClick={()=>setFilter(f)} className={filter===f?"active":""} key={f}>{f}<span>{f==="All"?"08":String(products.filter(p=>p.family===f).length).padStart(2,"0")}</span></button>)}</div>
      <p><span className="cert-dot"/> FSC® / PEFC supply capable</p>
    </section>
    <section className="catalog-list nw-pad">
      <div className="catalog-heading"><span>{String(shown.length).padStart(2,"0")} CAPABILITIES</span><p>The scope shown here follows the activities stated in NORDWOOD&apos;s company profile. Technical project parameters are confirmed directly per requirement.</p></div>
      <div className="catalog-grid">
        {shown.map((p,i)=><article className="catalog-card" key={p.name}>
          <Link className="catalog-image" href="/#project"><img src={p.image} alt={p.name}/><span>0{i+1}</span><b>↗</b></Link>
          <div className="catalog-card-copy"><span>{p.family.toUpperCase()}</span><h2>{p.name}</h2><p>{p.finish}</p>
            <dl><div><dt>Function</dt><dd>{p.family}</dd></div><div><dt>Site model</dt><dd>Integrated operation</dd></div><div><dt>Market</dt><dd>Europe focused</dd></div></dl>
            <Link href="/contact">Discuss this requirement <span>↗</span></Link>
          </div>
        </article>)}
      </div>
    </section>
    <section className="catalog-custom"><div><span>HAVE A SPECIFIC REQUIREMENT?</span><h2>START WITH THE<br/>PRODUCTION CONTEXT.</h2></div><p>Share the activity, approximate volume, destination and technical requirements. The NORDWOOD team can then continue the discussion directly.</p><a href="mailto:sales@nordwood.eu?subject=NORDWOOD%20production%20requirement">Start a discussion ↗</a></section>
    <SiteFooter/>
  </main>
}
