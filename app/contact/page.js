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
        <h1>Tell us about your garden</h1>
        <p className="pageLede">A postcode and a few lines about what needs doing is plenty to start with.</p>
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
