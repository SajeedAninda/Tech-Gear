import React, { useState, useContext } from 'react'
import { TbCash } from 'react-icons/tb'
import toast from 'react-hot-toast'
import { useCart } from '../Provider/CartProvider'

const CheckoutForm = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('eMoney')
  const [formErrors, setFormErrors] = useState({})
  const { cartData, isCartLoading, refetch } = useCart()

  const validateForm = () => {
    let errors = {}
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value
    const address = document.getElementById('address').value
    const zip = document.getElementById('zip').value
    const city = document.getElementById('city').value
    const country = document.getElementById('country').value
    const eMoneyNumber = document.getElementById('eMoneyNumber')?.value
    const eMoneyPin = document.getElementById('eMoneyPin')?.value

    if (!name) errors.name = 'Name cannot be empty'
    if (!email) {
      errors.email = 'Email cannot be empty'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email format'
    }
    if (!phone) {
      errors.phone = 'Phone cannot be empty'
    } else if (phone.length <= 9) {
      errors.phone = 'Phone number must be more than 9 digits'
    }
    if (!address) errors.address = 'Address cannot be empty'
    if (!zip) errors.zip = 'Zip Code cannot be empty'
    if (!city) errors.city = 'City cannot be empty'
    if (!country) errors.country = 'Country cannot be empty'

    if (selectedPaymentMethod === 'eMoney') {
      if (!eMoneyNumber) errors.eMoneyNumber = 'E-Money Number cannot be empty'
      if (!eMoneyPin) errors.eMoneyPin = 'E-Money Pin cannot be empty'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form validated')
    }
  }

  return (
    <div className='formDiv w-full lg:w-[65%] bg-white rounded-xl py-12 px-12'>
      <h2 className='uppercase text-[#191919] font-bold text-[28px]'>
        Checkout
      </h2>

      <div className='billingDetails mt-6'>
        <p className='text-[#111] text-[14px] font-bold uppercase'>
          Billing Details
        </p>
        <div className='mt-3 flex justify-between items-center gap-6'>
          <div className='flex-1'>
            <label
              htmlFor='name'
              className='text-[#191919] text-[13px] font-bold'
            >
              Name
            </label>
            <br />
            <input
              required
              name='name'
              id='name'
              type='text'
              className={`mt-2 w-full px-4 py-4 rounded-lg border ${
                formErrors.name ? 'border-red-500' : 'border-[#0000003f]'
              } placeholder:text-[#00000080] placeholder:font-bold placeholder:text-[13px] text-[#191919] text-[13px] font-bold focus:outline-none focus:border focus:border-[#111]`}
              placeholder={formErrors.name || 'Alexei Ward'}
            />
          </div>
          <div className='flex-1'>
            <label
              htmlFor='email'
              className='text-[#191919] text-[13px] font-bold'
            >
              Email
            </label>
            <br />
            <input
              required
              type='email'
              id='email'
              name='email'
              className={`mt-2 w-full px-4 py-4 rounded-lg border ${
                formErrors.email ? 'border-red-500' : 'border-[#0000003f]'
              } placeholder:text-[#00000080] placeholder:font-bold placeholder:text-[13px] text-[#191919] text-[13px] font-bold focus:outline-none focus:border focus:border-[#111]`}
              placeholder={formErrors.email || 'alexei@mail.com'}
            />
          </div>
        </div>
        <div className='flex-1 mt-3 w-[50%]'>
          <label
            htmlFor='phone'
            className='text-[#191919] text-[13px] font-bold'
          >
            Phone Number
          </label>
          <br />
          <input
            required
            name='phone'
            id='phone'
            type='tel'
            className={`mt-2 w-full px-4 py-4 rounded-lg border ${
              formErrors.phone ? 'border-red-500' : 'border-[#0000003f]'
            } placeholder:text-[#00000080] placeholder:font-bold placeholder:text-[13px] text-[#191919] text-[13px] font-bold focus:outline-none focus:border focus:border-[#111]`}
            placeholder={formErrors.phone || '+1 202-555-8262'}
          />
        </div>
      </div>

      <div className='shippingInfo mt-6'>
        <p className='text-[#111] text-[14px] font-bold uppercase'>
          Shipping Info
        </p>
        <div className='mt-3'>
          <div className='flex-1'>
            <label
              htmlFor='address'
              className='text-[#191919] text-[13px] font-bold'
            >
              Address
            </label>
            <br />
            <input
              type='text'
              name='address'
              id='address'
              className={`mt-2 w-full px-4 py-4 rounded-lg border ${
                formErrors.address ? 'border-red-500' : 'border-[#0000003f]'
              } placeholder:text-[#00000080] placeholder:font-bold placeholder:text-[13px] text-[#191919] text-[13px] font-bold focus:outline-none focus:border focus:border-[#111]`}
              placeholder={formErrors.address || '1192 Faxton Street'}
            />
          </div>
        </div>
        <div className='mt-3 flex justify-between items-center gap-6'>
          <div className='flex-1'>
            <label
              htmlFor='zip'
              className='text-[#191919] text-[13px] font-bold'
            >
              Zip Code
            </label>
            <br />
            <input
              name='zip'
              id='zip'
              type='text'
              className={`mt-2 w-full px-4 py-4 rounded-lg border ${
                formErrors.zip ? 'border-red-500' : 'border-[#0000003f]'
              } placeholder:text-[#00000080] placeholder:font-bold placeholder:text-[13px] text-[#191919] text-[13px] font-bold focus:outline-none focus:border focus:border-[#111]`}
              placeholder={formErrors.zip || '20001'}
            />
          </div>
          <div className='flex-1'>
            <label
              htmlFor='city'
              className='text-[#191919] text-[13px] font-bold'
            >
              City
            </label>
            <br />
            <input
              type='text'
              id='city'
              name='city'
              className={`mt-2 w-full px-4 py-4 rounded-lg border ${
                formErrors.city ? 'border-red-500' : 'border-[#0000003f]'
              } placeholder:text-[#00000080] placeholder:font-bold placeholder:text-[13px] text-[#191919] text-[13px] font-bold focus:outline-none focus:border focus:border-[#111]`}
              placeholder={formErrors.city || 'Austin'}
            />
          </div>
        </div>
        <div className='mt-3'>
          <div className='flex-1 w-[50%]'>
            <label
              htmlFor='country'
              className='text-[#191919] text-[13px] font-bold'
            >
              Country
            </label>
            <br />
            <input
              type='text'
              id='country'
              name='country'
              className={`mt-2 w-full px-4 py-4 rounded-lg border ${
                formErrors.country ? 'border-red-500' : 'border-[#0000003f]'
              } placeholder:text-[#00000080] placeholder:font-bold placeholder:text-[13px] text-[#191919] text-[13px] font-bold focus:outline-none focus:border focus:border-[#111]`}
              placeholder={formErrors.country || 'United States'}
            />
          </div>
        </div>
      </div>

      <div className='paymentDetails mt-6'>
        <p className='text-[#111] text-[14px] font-bold uppercase mt-3'>
          Payment Details
        </p>
        <div className='flex justify-between gap-10 mt-3'>
          <div className='flex-1'>
            <p className='text-[#191919] text-[13px] font-bold'>
              Payment Methods
            </p>
          </div>
          <div className='flex-1'>
            <div className='mt-3'>
              <div
                className={`flex items-center gap-3 border py-4 px-3 rounded-lg cursor-pointer ${
                  selectedPaymentMethod === 'eMoney'
                    ? 'border-[#111]'
                    : 'border-[#0000003f]'
                }`}
                onClick={() => setSelectedPaymentMethod('eMoney')}
              >
                <input
                  id='eMoney'
                  name='paymentMethod'
                  type='radio'
                  className='w-5 h-5 accent-[#111]'
                  checked={selectedPaymentMethod === 'eMoney'}
                  onChange={() => setSelectedPaymentMethod('eMoney')}
                />
                <label
                  htmlFor='eMoney'
                  className='text-[#191919] text-[13px] font-bold cursor-pointer'
                >
                  E-Money
                </label>
              </div>
              <div
                className={`flex items-center gap-3 mt-3 border py-4 px-3 rounded-lg cursor-pointer ${
                  selectedPaymentMethod === 'cashOnDelivery'
                    ? 'border-[#111]'
                    : 'border-[#0000003f]'
                }`}
                onClick={() => setSelectedPaymentMethod('cashOnDelivery')}
              >
                <input
                  id='cashOnDelivery'
                  name='paymentMethod'
                  type='radio'
                  className='w-5 h-5 accent-[#111]'
                  checked={selectedPaymentMethod === 'cashOnDelivery'}
                  onChange={() => setSelectedPaymentMethod('cashOnDelivery')}
                />
                <label
                  htmlFor='cashOnDelivery'
                  className='text-[#191919] text-[13px] font-bold cursor-pointer'
                >
                  Cash On Delivery
                </label>
              </div>
            </div>
          </div>
        </div>
        {selectedPaymentMethod === 'eMoney' && (
          <div className='conditionalDiv mt-10 flex justify-between items-center gap-6'>
            <div className='flex-1'>
              <label
                htmlFor='eMoneyNumber'
                className='text-[#191919] text-[13px] font-bold'
              >
                E-Money Number
              </label>
              <br />
              <input
                name='eMoneyNumber'
                id='eMoneyNumber'
                type='number'
                className={`mt-2 w-full px-4 py-4 rounded-lg border ${
                  formErrors.eMoneyNumber
                    ? 'border-red-500'
                    : 'border-[#0000003f]'
                } placeholder:text-[#00000080] placeholder:font-bold placeholder:text-[13px] text-[#191919] text-[13px] font-bold focus:outline-none focus:border focus:border-[#111]`}
                placeholder={formErrors.eMoneyNumber || '736151729'}
              />
            </div>
            <div className='flex-1'>
              <label
                htmlFor='eMoneyPin'
                className='text-[#191919] text-[13px] font-bold'
              >
                E-Money Pin
              </label>
              <br />
              <input
                name='eMoneyPin'
                id='eMoneyPin'
                type='number'
                className={`mt-2 w-full px-4 py-4 rounded-lg border ${
                  formErrors.eMoneyPin ? 'border-red-500' : 'border-[#0000003f]'
                } placeholder:text-[#00000080] placeholder:font-bold placeholder:text-[13px] text-[#191919] text-[13px] font-bold focus:outline-none focus:border focus:border-[#111]`}
                placeholder={formErrors.eMoneyPin || '9917'}
              />
            </div>
          </div>
        )}

        {selectedPaymentMethod === 'cashOnDelivery' && (
          <div className='conditionalDiv2 mt-10 flex justify-between items-center gap-4'>
            <TbCash className='text-[150px]' />
            <p className='text-[16px] font-semibold text-[#00000080]'>
              The ‘Cash on Delivery’ option enables you to pay in cash when our
              delivery courier arrives at your residence. Just make sure your
              address is correct so that your order will not be cancelled.
            </p>
          </div>
        )}
      </div>
      <div className='mt-8 w-full flex items-center justify-center text-center'>
        <button
          onClick={handleSubmit}
          className='bg-[#111] w-full px-10 py-3 hover:bg-[#464545] cursor-pointer text-white font-bold uppercase text-[13px] transition-colors duration-300 ease-in-out'
        >
          Continue & Pay
        </button>
      </div>
    </div>
  )
}

export default CheckoutForm
