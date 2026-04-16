import data from '@/../product/sections/hiring-threads/data.json'
import { HiringThreadsPopulated } from './components/HiringThreadsPopulated'
import type { HiringThread, ThreadKPIs } from '@/../product/sections/hiring-threads/types'

export default function HiringThreadsPopulatedPreview() {
  return (
    <HiringThreadsPopulated
      kpis={data.kpis as ThreadKPIs}
      threads={data.threads as HiringThread[]}
      onOpenThread={(id) => console.log('Open thread:', id)}
      onCreateThread={(role) => console.log('Create thread:', role)}
      onFilterStatus={(status) => console.log('Filter:', status)}
      onSearch={(query) => console.log('Search:', query)}
      onSort={(sortBy) => console.log('Sort:', sortBy)}
    />
  )
}
