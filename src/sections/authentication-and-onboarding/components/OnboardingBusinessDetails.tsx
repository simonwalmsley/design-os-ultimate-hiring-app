import { useState } from 'react'
import type { Account, OnboardingProps } from '@/../product/sections/authentication-and-onboarding/types'

type OnboardingBusinessDetailsProps = Pick<OnboardingProps, 'onSubmitBusinessDetails'>

export function OnboardingBusinessDetails({ onSubmitBusinessDetails }: OnboardingBusinessDetailsProps) {
  const [businessName, setBusinessName] = useState('')
  const [industry, setIndustry] = useState('')
  const [location, setLocation] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const clearFieldError = (field: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!businessName.trim()) errors.businessName = 'Business name is required.'
    if (!industry.trim()) errors.industry = 'Industry is required.'
    if (!location.trim()) errors.location = 'Location is required.'
    if (!phoneNumber.trim()) errors.phoneNumber = 'Phone number is required.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSubmitBusinessDetails?.({ businessName, industry, location, phoneNumber })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dim overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />

      {/* Overlay card */}
      <div
        className="relative w-full max-w-[560px] mx-4 rounded-[0.4rem] p-8"
        style={{ backgroundColor: '#171717', border: '1px solid #404040' }}
      >
        <h1
          className="text-2xl font-semibold mb-1"
          style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Tell us about your business
        </h1>
        <p
          className="text-sm mb-6"
          style={{ color: '#a3a3a3', fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          We'll use these details across your hiring threads.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Business name */}
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Business name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => { setBusinessName(e.target.value); clearFieldError('businessName') }}
              className="w-full px-3 py-2.5 rounded-[0.4rem] text-sm outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: '#404040',
                border: '1px solid #404040',
                color: '#fafafa',
                fontFamily: "'Inter', system-ui, sans-serif",
                // @ts-expect-error CSS custom property
                '--tw-ring-color': '#ffcd05',
              }}
            />
            {fieldErrors.businessName && (
              <p className="mt-1 text-sm" style={{ color: '#dc2828' }}>{fieldErrors.businessName}</p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => { setIndustry(e.target.value); clearFieldError('industry') }}
              placeholder="e.g. Plumbing, Hospitality, Construction"
              className="w-full px-3 py-2.5 rounded-[0.4rem] text-sm outline-none transition-all focus:ring-2
                placeholder:text-[#737373]"
              style={{
                backgroundColor: '#404040',
                border: '1px solid #404040',
                color: '#fafafa',
                fontFamily: "'Inter', system-ui, sans-serif",
                // @ts-expect-error CSS custom property
                '--tw-ring-color': '#ffcd05',
              }}
            />
            {fieldErrors.industry && (
              <p className="mt-1 text-sm" style={{ color: '#dc2828' }}>{fieldErrors.industry}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => { setLocation(e.target.value); clearFieldError('location') }}
              placeholder="City or suburb, state"
              className="w-full px-3 py-2.5 rounded-[0.4rem] text-sm outline-none transition-all focus:ring-2
                placeholder:text-[#737373]"
              style={{
                backgroundColor: '#404040',
                border: '1px solid #404040',
                color: '#fafafa',
                fontFamily: "'Inter', system-ui, sans-serif",
                // @ts-expect-error CSS custom property
                '--tw-ring-color': '#ffcd05',
              }}
            />
            {fieldErrors.location && (
              <p className="mt-1 text-sm" style={{ color: '#dc2828' }}>{fieldErrors.location}</p>
            )}
          </div>

          {/* Phone number */}
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#fafafa', fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Phone number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => { setPhoneNumber(e.target.value); clearFieldError('phoneNumber') }}
              className="w-full px-3 py-2.5 rounded-[0.4rem] text-sm outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: '#404040',
                border: '1px solid #404040',
                color: '#fafafa',
                fontFamily: "'Inter', system-ui, sans-serif",
                // @ts-expect-error CSS custom property
                '--tw-ring-color': '#ffcd05',
              }}
            />
            {fieldErrors.phoneNumber && (
              <p className="mt-1 text-sm" style={{ color: '#dc2828' }}>{fieldErrors.phoneNumber}</p>
            )}
          </div>

          {/* Next button — right-aligned */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-[0.4rem] text-sm font-medium transition-all
                focus:outline-none focus:ring-2"
              style={{
                backgroundColor: '#ffcd05',
                color: '#0a0a0a',
                fontFamily: "'Inter', system-ui, sans-serif",
                // @ts-expect-error CSS custom property
                '--tw-ring-color': '#ffcd05',
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
