import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="uranus-pds-footer">
      <div className="uranus-footer-top">
        <div className="uranus-footer-brand"><Link href="/">URANUS</Link><p>BUILT FOR YOUR DRIVE.</p></div>
        <nav aria-label="Wheels"><h2>WHEELS</h2><Link href="/wheels">All wheels</Link><Link href="/wheels?category=street">Street</Link><Link href="/wheels?category=trail">Trail</Link><Link href="/wheels?category=dually">Dually</Link></nav>
        <nav aria-label="Tools"><h2>TOOLS</h2><Link href="/visualizer">Wheel visualizer</Link><Link href="/garage">My garage</Link><Link href="/dealers">Find a dealer</Link></nav>
        <nav aria-label="Information"><h2>INFORMATION</h2><Link href="/contact">Contact</Link><Link href="/warranty">Warranty</Link><Link href="/faq">Wheel FAQs</Link><Link href="/prop65">Prop 65</Link></nav>
      </div>
      <div className="uranus-footer-bottom"><span>© 2026 URANUS. ALL RIGHTS RESERVED.</span><span>DESIGNED FOR YOUR DRIVE.</span></div>
    </footer>
  );
}
