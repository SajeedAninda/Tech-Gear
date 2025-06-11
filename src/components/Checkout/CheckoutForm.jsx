import React, { useState } from 'react'
import { TbCash } from 'react-icons/tb'
import toast from 'react-hot-toast'
import { useCart } from '../Provider/CartProvider'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import useCurrentUser from '../Hooks/useCurrentUser'
import { useRouter } from 'next/navigation'

const CheckoutForm = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('eMoney')
  const [formErrors, setFormErrors] = useState({})
  const { cartData, isCartLoading, refetch } = useCart()
  const axiosInstance = useAxiosInstance()
  const { userData } = useCurrentUser()
  const router = useRouter()

  const [address, setAddress] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    city: '',
    country: '',
    eMoneyNumber: '',
    eMoneyPin: ''
  })

  const handleChange = e => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const errors = {}

    if (!address.name) errors.name = 'Name cannot be empty'
    if (!address.email) {
      errors.email = 'Email cannot be empty'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(address.email)
    ) {
      errors.email = 'Invalid email format'
    }
    if (!address.phone) {
      errors.phone = 'Phone cannot be empty'
    } else if (address.phone.length <= 9) {
      errors.phone = 'Phone number must be more than 9 digits'
    }
    if (!address.address) errors.address = 'Address cannot be empty'
    if (!address.zip) errors.zip = 'Zip Code cannot be empty'
    if (!address.city) errors.city = 'City cannot be empty'
    if (!address.country) errors.country = 'Country cannot be empty'

    if (selectedPaymentMethod === 'eMoney') {
      if (!address.eMoneyNumber)
        errors.eMoneyNumber = 'E-Money Number cannot be empty'
      if (!address.eMoneyPin) errors.eMoneyPin = 'E-Money Pin cannot be empty'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (validateForm()) {
      const orderDetails = {
        userEmail: userData?.email,
        ...cartData,
        ...address,
        paymentMethod: selectedPaymentMethod
      }

      const loadingToast = toast.loading('Completing Order...')

      try {
        const res = await axiosInstance.post('/createOrder', orderDetails)

        if (res.data.insertedId) {
          toast.dismiss(loadingToast)
          toast.success('Order Completed Succesfully')
          router.push('/userOrders')
        }
      } catch {
        toast.error('Failed to create Order')
      }
    } else {
      toast.error('Please fix the errors in the form.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='formDiv w-full lg:w-[65%] bg-white rounded-xl py-12 px-12'
    >
      <h2 className='uppercase text-[#191919] font-bold text-[28px]'>
        Checkout
      </h2>

      {/* Billing Details */}
      <div className='billingDetails mt-6'>
        <p className='text-[#111] text-[14px] font-bold uppercase'>
          Billing Details
        </p>
        <div className='mt-3 flex justify-between items-center gap-6'>
          <InputField
            label='Name'
            name='name'
            value={address.name}
            onChange={handleChange}
            error={formErrors.name}
            placeholder='John Doe'
          />
          <InputField
            label='Email'
            name='email'
            type='email'
            value={address.email}
            onChange={handleChange}
            error={formErrors.email}
            placeholder='john@gmail.com'
          />
        </div>
        <div className='flex-1 mt-3 w-[50%]'>
          <InputField
            label='Phone Number'
            name='phone'
            type='tel'
            value={address.phone}
            onChange={handleChange}
            error={formErrors.phone}
            placeholder='+8801826281191'
          />
        </div>
      </div>

      {/* Shipping Info */}
      <div className='shippingInfo mt-6'>
        <p className='text-[#111] text-[14px] font-bold uppercase'>
          Shipping Info
        </p>
        <div className='mt-3'>
          <InputField
            label='Address'
            name='address'
            value={address.address}
            onChange={handleChange}
            error={formErrors.address}
            placeholder='House no. 51, Bailey Road'
          />
        </div>
        <div className='mt-3 flex justify-between items-center gap-6'>
          <InputField
            label='Zip Code'
            name='zip'
            value={address.zip}
            onChange={handleChange}
            error={formErrors.zip}
            placeholder='1216'
          />
          <InputField
            label='City'
            name='city'
            value={address.city}
            onChange={handleChange}
            error={formErrors.city}
            placeholder='Dhaka'
          />
        </div>
        <div className='mt-3 w-[50%]'>
          <InputField
            label='Country'
            name='country'
            value={address.country}
            onChange={handleChange}
            error={formErrors.country}
            placeholder='Bangladesh'
          />
        </div>
      </div>

      {/* Payment Details */}
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
            {['eMoney', 'cashOnDelivery'].map(method => (
              <div
                key={method}
                className={`flex items-center gap-3 mt-3 border py-4 px-3 rounded-lg cursor-pointer ${
                  selectedPaymentMethod === method
                    ? 'border-[#111]'
                    : 'border-[#0000003f]'
                }`}
                onClick={() => setSelectedPaymentMethod(method)}
              >
                <input
                  id={method}
                  name='paymentMethod'
                  type='radio'
                  className='w-5 h-5 accent-[#111]'
                  checked={selectedPaymentMethod === method}
                  onChange={() => setSelectedPaymentMethod(method)}
                />
                <label
                  htmlFor={method}
                  className='text-[#191919] text-[13px] font-bold cursor-pointer'
                >
                  {method === 'eMoney' ? 'E-Money' : 'Cash On Delivery'}
                </label>
              </div>
            ))}
          </div>
        </div>

        {selectedPaymentMethod === 'eMoney' && (
          <div className='conditionalDiv mt-10 flex justify-between items-center gap-6'>
            <InputField
              label='E-Money Number'
              name='eMoneyNumber'
              value={address.eMoneyNumber}
              onChange={handleChange}
              error={formErrors.eMoneyNumber}
              placeholder='238521993'
            />
            <InputField
              label='E-Money Pin'
              name='eMoneyPin'
              value={address.eMoneyPin}
              onChange={handleChange}
              error={formErrors.eMoneyPin}
              placeholder='6891'
            />
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

      <button
        type='submit'
        disabled={cartData?.length === 0}
        className={`mt-10 font-bold py-4 px-10 cursor-pointer rounded-lg transition-colors
    ${
      cartData?.length === 0
        ? 'bg-gray-400 cursor-not-allowed text-white'
        : 'bg-[#191919] text-white hover:bg-[#333]'
    }
  `}
      >
        Continue & Pay
      </button>
    </form>
  )
}

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder
}) => (
  <div className='flex-1'>
    <label htmlFor={name} className='text-[#191919] text-[13px] font-bold'>
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`mt-2 w-full px-4 py-4 rounded-lg border ${
        error ? 'border-red-500' : 'border-[#0000003f]'
      } placeholder:text-[#00000080] cursor-pointer placeholder:font-bold placeholder:text-[13px] text-[#191919] text-[13px] font-bold focus:outline-none focus:border focus:border-[#111]`}
      placeholder={error || placeholder}
    />
  </div>
)

export default CheckoutForm
