import React from 'react'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'

import LiveProductViewsQuery from './graphql/liveProductViews.gql'

function LiveViewCount() {
  const productContextValue = useProduct()

  if (!productContextValue) {
    console.error(
      'This component should always be used inside of a ProductContext.'
    )
  }

  const currentProductId = productContextValue?.selectedItem?.itemId ?? ''

  const { data, loading, error } = useQuery(LiveProductViewsQuery, {
    variables: { productSlug: currentProductId },
  })

  if (loading) {
    return <p className="c-emphasis">Loading...</p>
  }

  if (error) {
    return <p>Could not load analytics data.</p>
  }

  return (
    <p className="c-emphasis">
      There are {data.liveProductViews.liveViews} users seeing this product at
      the moment.
    </p>
  )
}

export default LiveViewCount
