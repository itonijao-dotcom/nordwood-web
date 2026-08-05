"use client";

import { FormEvent, useMemo, useState } from "react";

export default function ProjectPlanner() {
  const [product, setProduct] = useState("Complete parquet program");
  const [area, setArea] = useState("1500");
  const [project, setProject] = useState("Commercial / Hospitality");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");

  const volume = useMemo(() => {
    const m2 = Number(area) || 0;
    if (m2 >= 5000) return "Industrial volume";
    if (m2 >= 1000) return "B2B project volume";
    return "Specification / sample phase";
  }, [area]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`NORDWOOD project request — ${product}`);
    const body = encodeURIComponent(
      `Hello NORDWOOD Commercial Team,\n\nI would like to discuss a project.\n\nProduct: ${product}\nArea: ${area || "TBC"} m²\nProject type: ${project}\nDestination: ${country || "TBC"}\nContact email: ${email}\n\nPlease contact me with production options, lead time and sample availability.`
    );
    window.location.href = `mailto:sales@nordwood.eu?subject=${subject}&body=${body}`;
  }

  return (
    <form className="project-planner" onSubmit={submit}>
      <div className="planner-grid">
        <label><span>01 / Requirement</span><select value={product} onChange={e=>setProduct(e.target.value)}><option>Complete parquet program</option><option>Parquet processing</option><option>Profiling</option><option>Finishing</option></select></label>
        <label><span>02 / Required area</span><div className="input-unit"><input inputMode="numeric" value={area} onChange={e=>setArea(e.target.value.replace(/[^0-9]/g,""))} aria-label="Required area in square meters"/><b>m²</b></div></label>
        <label><span>03 / Project type</span><select value={project} onChange={e=>setProject(e.target.value)}><option>Commercial / Hospitality</option><option>Residential Development</option><option>Distribution / Wholesale</option><option>Architecture / Specification</option></select></label>
        <label><span>04 / Destination</span><input value={country} onChange={e=>setCountry(e.target.value)} placeholder="e.g. Germany" /></label>
        <label className="planner-email"><span>05 / Your work email</span><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@company.com" /></label>
      </div>
      <div className="planner-summary">
        <div><span>PROJECT CLASS</span><strong>{volume}</strong></div>
        <div><span>ROUTING</span><strong>NORDWOOD team / Europe</strong></div>
        <button type="submit">Prepare project request <span>↗</span></button>
      </div>
      <p className="planner-note">Submitting opens your email app with the project brief pre-filled. No data is stored on this website.</p>
    </form>
  );
}
