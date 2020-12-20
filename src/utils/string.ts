export function removePrefix(s: string, prefix: string): string {
  if (!s.startsWith(prefix)) return s
  return s.substr(prefix.length)
}

export function removeSuffix(s: string, suffix: string): string {
  if (!s.endsWith(suffix)) return s
  return s.substr(0, s.length - suffix.length)
}

export function countChar(s: string, char: string): number {
  let cnt = 0
  for (const c of s)
    if (c === char) ++cnt
  return cnt
}

export function isNumeric(s: string): boolean {
  for (let i = 0; i < s.length; ++i) {
    const x = s.charCodeAt(i)
    if (x < 48 || x > 57) return false
  }
  return true
}

export function isWhitespace(s: string): boolean {
  return /^\s*$/.test(s)
}
