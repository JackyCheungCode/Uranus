import Link from "next/link";
export function SiteFooter(){
 return <footer className="mw-footer">
  <div className="mw-footer-main">
   <div><Link href="/" className="mw-wordmark mw-footer-logo">MAYHEM<span>WHEELS</span></Link><p>BUILT FOR YOUR DRIVE.</p><p className="mw-footer-description">Distinctive wheels for trucks, Jeep and SUVs. Style, precision and function.</p></div>
   <div className="mw-footer-column"><b>WHEELS</b><Link href="/wheels">ALL WHEELS</Link><Link href="/wheels?category=street">STREET</Link><Link href="/wheels?category=trail">TRAIL</Link><Link href="/wheels?category=dually">DUALLY</Link><Link href="/wheels?category=color-series">COLOR SERIES</Link><Link href="/wheels?sort=new">NEW ARRIVALS</Link></div>
   <div className="mw-footer-column"><b>DEALERS</b><Link href="/dealers">FIND A DEALER</Link><Link href="https://mayhemwheels.com/pages/become-a-dealer">BECOME A DEALER</Link><Link href="https://www.shoptwggear.com">MERCH</Link></div>
   <div className="mw-footer-column"><b>INFORMATION</b><Link href="/contact">CONTACT US</Link><Link href="/warranty">WARRANTY</Link><Link href="/faq">WHEEL FAQS</Link><Link href="/prop65">PROP 65</Link><Link href="/accessibility">ACCESSIBILITY</Link></div>
   <div className="mw-footer-column mw-footer-connect"><b>STAY CONNECTED</b><p>Sign up for news from Mayhem Wheels.</p><a href="https://mayhemwheels.com/" target="_blank" rel="noreferrer">MAYHEM WHEELS ↗</a></div>
  </div>
  <div className="mw-footer-bottom"><span>© 2026 THE WHEEL GROUP. ALL RIGHTS RESERVED.</span><span>MAYHEM WHEELS</span><Link href="/accessibility">ACCESSIBILITY</Link></div>
 </footer>;
}
