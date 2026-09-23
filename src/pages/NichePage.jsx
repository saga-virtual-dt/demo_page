import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import niches from '../config/niches'
import DemoBanner from '../components/DemoBanner'
import LandingTemplate from '../components/LandingTemplate'

export default function NichePage() {
  const { slug } = useParams()
  const data = niches.find((n) => n.slug === slug)

  useEffect(() => {
    if (data) document.title = `[Demo] ${data.clientName}`
  }, [data])

  if (!data) return <Navigate to="/" replace />

  return (
    <>
      <DemoBanner clientName={data.clientName} />
      <LandingTemplate data={data} />
    </>
  )
}
