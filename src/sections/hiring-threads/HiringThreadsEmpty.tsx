import { HiringThreadsEmpty } from './components/HiringThreadsEmpty'

export default function HiringThreadsEmptyPreview() {
  return (
    <HiringThreadsEmpty
      onCreateThread={(role) => console.log('Create thread:', role)}
    />
  )
}
