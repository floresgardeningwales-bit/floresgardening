// Decorative transparent PNG engravings created for Flores.
export default function BotanicalSprig({ className = '', variant = 'leaf' }) {
  const assets = { leaf: '/botanical-leaf.png', flower: '/botanical-flower.png', rose: '/botanical-rose.png', bee: '/botanical-bee.png' };
  return <img className={className} src={assets[variant] || assets.leaf} width="1024" height={variant === 'bee' ? 1024 : 1536} alt="" aria-hidden="true" />;
}
