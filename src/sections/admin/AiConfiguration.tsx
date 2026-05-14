import data from '@/../product/sections/admin/data.json'
import { AiConfiguration } from './components/AiConfiguration'
import type { AiProvider, PhaseAiConfig } from '@/../product/sections/admin/types'

export default function AiConfigurationPreview() {
  return (
    <AiConfiguration
      providers={data.aiProviders as AiProvider[]}
      config={data.aiConfig as PhaseAiConfig[]}
      onChangeModel={(phase, provider, model) =>
        console.log('Change model:', phase, provider, model)
      }
      onSave={() => console.log('Save AI configuration')}
    />
  )
}
