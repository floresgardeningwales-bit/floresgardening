import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import LeadForm from '../../components/LeadForm';

export const metadata = {
  title: 'Request a quote',
  description: 'Tell Flores Gardening about your garden in Cardiff or the Vale of Glamorgan and get a clear quote.',
};

export default function Contact() {
  return <>
    <SiteNav tone="paper" />
    <main id="main" className="contactPage wrap">
      <div className="contactAside">
        <p className="eyebrow">Request a garden quote</p><h1>Let’s look after your garden.</h1>
        <p className="pageLede">Tell us where you are, what needs attention and whether you’re looking for regular help or a one-off visit. We’ll take it from there.</p>
        <ol className="nextSteps">
          <li><strong>We reply</strong> by email or phone, usually to arrange a quick look at the garden.</li>
          <li><strong>You get a quote</strong> that says what’s included, how often, and how green waste is handled.</li>
          <li><strong>You decide.</strong> No pressure, and nothing starts until you’ve agreed.</li>
        </ol>
      </div>
      <LeadForm />
    </main>
    <SiteFooter />
  </>;
}
