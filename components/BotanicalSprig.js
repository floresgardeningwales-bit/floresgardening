// Decorative extension of the site's line-illustration system.
export default function BotanicalSprig({ className = '' }) {
  const leaves = [[29,126,-50],[40,109,45],[50,92,-48],[63,74,38],[76,56,-39],[88,36,30]];
  return <svg className={className} viewBox="0 0 130 170" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M15 160C38 130 63 87 99 13M17 157C49 136 77 116 112 100" />{leaves.map(([x,y,r],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><path d="M0 0C-15-6-17-25-10-38C3-28 7-13 0 0Z" fill="currentColor" fillOpacity=".08"/><path d="M0 0L-10-38M-3-10L-12-15M-5-18L-14-24M-6-24L-1-20M-2-6L3-13" /></g>)}<path d="M65 125C65 107 79 99 88 99C87 111 78 123 65 125ZM84 114C95 117 108 113 116 102C99 100 87 104 84 114ZM39 143C35 125 39 113 45 108C56 119 52 134 39 143"/><path d="M65 125L88 99M84 114L116 102M39 143L45 108"/></svg>;
}
