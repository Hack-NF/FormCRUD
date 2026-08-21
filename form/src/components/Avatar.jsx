const COLORS = [
  'bg-indigo-500',
  'bg-rose-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-sky-500',
  'bg-violet-500',
  'bg-teal-500',
  'bg-pink-500',
]

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

const SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
}

export default function Avatar({ name = '?', size = 'md' }) {
  const color = COLORS[hashCode(name) % COLORS.length]

  return (
    <div
      className={`${SIZES[size]} ${color} flex shrink-0 items-center justify-center rounded-full font-semibold text-white shadow-sm ring-2 ring-white`}
    >
      {getInitials(name) || '?'}
    </div>
  )
}
