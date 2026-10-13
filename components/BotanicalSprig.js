// Decorative botanical PNG illustrations, generated for Flores.
export default function BotanicalSprig({ className = '', variant = 'leaf' }) {
  return <img className={className} src={variant === 'flower' ? '/botanical-flower.png' : '/botanical-leaf.png'} width="1024" height="1536" alt="" aria-hidden="true" />;
}
