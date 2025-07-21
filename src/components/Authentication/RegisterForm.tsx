/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, DatePicker, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../features/auth/authApi'
import dayjs from 'dayjs'

export const RegisterForm = () => {
  const [form] = Form.useForm()
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const handleSubmit = async (values: any) => {
    try {
      const response = await register({
        email: values.email,
        password: values.password,
        dob: dayjs(values.dob).format('YYYY-MM-DD'),
        phoneNumber: values.phoneNumber,
        roleId: 'a1fdb0c2-0daf-4bb0-b075-a3cc0b2febeb',
        fullname: '',
      }).unwrap()
      console.log(response)
      notification.success({
        message: 'Registration Successful',
        description: 'Please check your email to verify your account.',
      })

      navigate('/login')
    } catch (error: any) {
      notification.error({
        message: 'Registration Failed',
        description: error?.data?.message || 'An unknown error occurred.',
      })
    }
  }

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSubmit}
      name='register-form'
      autoComplete='on'
      style={{
        minWidth: '400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
      initialValues={{
        dob: null,
      }}
    >
      {/* Email */}
      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Please enter your email!' },
          { type: 'email', message: 'Invalid email format!' },
        ]}
      >
        <Input
          placeholder='Email'
          style={{
            height: '65px',
          }}
        />
      </Form.Item>

      {/* Password */}
      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Please enter your password!' },
          { min: 6, message: 'Password must be at least 6 characters!' },
        ]}
      >
        <Input.Password
          placeholder='Password'
          style={{
            height: '65px',
          }}
        />
      </Form.Item>

      {/* Retype password */}
      <Form.Item
        name='retypePassword'
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please re-enter your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('Passwords do not match!')
            },
          }),
        ]}
      >
        <Input.Password
          placeholder='Confirm Password'
          style={{
            height: '65px',
          }}
        />
      </Form.Item>

      {/* DOB */}
      <Form.Item
        name='dob'
        rules={[{ required: true, message: 'Please select your date of birth!' }]}
      >
        <DatePicker
          placeholder='Date of Birth'
          format='YYYY-MM-DD'
          style={{
            height: '65px',
            width: '100%',
          }}
        />
      </Form.Item>

      {/* Phone Number */}
      <Form.Item
        name='phoneNumber'
        rules={[
          { required: true, message: 'Please enter your phone number!' },
          {
            pattern: /^\d{10,11}$/,
            message: 'Invalid phone number!',
          },
        ]}
      >
        <Input
          placeholder='Phone Number'
          style={{
            height: '65px',
          }}
        />
      </Form.Item>
      <Form.Item>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Button
            type='primary'
            htmlType='submit'
            loading={isLoading}
            style={{
              height: '65px',
              backgroundColor: '#7FAAFB',
            }}
          >
            <div
              style={{
                color: '#000',
                fontSize: '16px',
              }}
            >
              Register
            </div>
          </Button>
          <Button
            type='link'
            onClick={() => navigate('/login')}
            style={{ padding: 0, margin: 0 }}
          >
            <span
              style={{
                color: '#000',
              }}
            >
              Already have an account?
            </span>
            <span style={{ fontWeight: 'bold', color: '#000' }}>
              {' '}
              Log in
            </span>
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}