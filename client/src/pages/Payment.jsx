import React from 'react'
import PaymentSuccess from '../components/PaymentSuccess'
import PaymentFailure from '../components/PaymentFailure'

const Payment = () => {
  return (
    <div>Payment
        <PaymentSuccess/>
        <PaymentFailure/>
    </div>
  )
}

export default Payment