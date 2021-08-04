import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='Keywords' content={keywords} />
    </Helmet>
  )
}
Meta.defaultProps = {
  title: 'Mollify',
  description: 'Find psychiatrist for your mental disorder',
  keywords: 'psychiatrist, doctors, patients, disorder',
}
export default Meta
