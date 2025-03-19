import { words } from 'rword-english-recommended'
import { Rword } from 'rword'

const rword = new Rword(words)

export function RandomOrgSlug() {
  const words = rword.generate(2)
  return `org-${words[0]}-${words[1]}`
}
