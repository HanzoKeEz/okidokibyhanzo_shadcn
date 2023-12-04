'use client'

import * as z from 'zod'
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

enum Sports {
  Football = 'Football/Soccer',
  Basketball = 'Basketball',
  Baseball = 'Baseball',
  Hockey = 'Hockey (Ice)',
  None = "I don't like sports"
}

const formSchema = z.object({
  firstName: z
    .string({
      required_error: 'Name is required.'
    })
    .min(2, {
      message: 'Name must be at least 1 characters.'
    }),

  middleName: z
    .string({
      required_error: 'Name is required.'
    })
    .min(2, {
      message: 'Name must be at least 1 characters.'
    }),
  lastName: z
    .string({
      required_error: 'Name is required.'
    })
    .min(2, {
      message: 'Name must be at least 1 characters.'
    }),

  favouriteNumber: z.coerce
    .number({
      invalid_type_error: 'Favourite number must be a number.'
    })
    .min(1, {
      message: 'Favourite number must be at least 1.'
    })
    .max(10, {
      message: 'Favourite number must be at most 10.'
    })
    .default(1)
    .optional(),

  sendMeMails: z.boolean().optional(),

  birthDate: z.coerce.date().optional(),

  color: z.enum(['red', 'green', 'blue']).optional(),

  // Another enum example
  marshmallows: z
    .enum(['not many', 'a few', 'a lot', 'too many'])
    .describe('How many marshmallows fit in your mouth?'),

  // Native enum example
  sports: z.nativeEnum(Sports).describe('What is your favourite sport?'),

  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.'
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.'
    })
    .optional(),

  customParent: z.string().optional(),
  acceptTerms: z
    .boolean()
    .describe('Accept terms and conditions.')
    .refine((value) => value, {
      message: 'You must accept the terms and conditions.',
      path: ['acceptTerms']
    })
})

function Basics() {
  return (
    <>
      <div className='mx-auto my-6 max-w-lg'>
        <Card>
          <CardHeader>
            <CardTitle>User Form</CardTitle>
          </CardHeader>

          <CardContent>
            <AutoForm
              formSchema={formSchema}
              onSubmit={console.log}
              fieldConfig={{
                favouriteNumber: {
                  description: 'Your favourite number between 1 and 10.'
                },
                acceptTerms: {
                  inputProps: {
                    required: true
                  },
                  description: (
                    <>
                      I agree to the{' '}
                      <button
                        className='text-primary underline'
                        onClick={(e) => {
                          e.preventDefault()
                          alert('Terms and conditions clicked.')
                        }}
                      >
                        terms and conditions
                      </button>
                      .
                    </>
                  )
                },

                birthDate: {
                  description: 'We need your birthday to send you a gift.'
                },

                sendMeMails: {
                  fieldType: 'switch'
                },

                bio: {
                  fieldType: 'textarea'
                },

                marshmallows: {
                  fieldType: 'radio'
                },

                customParent: {
                  renderParent: ({ children }) => (
                    <div className='flex items-end gap-3'>
                      <div className='flex-1'>{children}</div>
                      <div>
                        <Button type='button'>Check</Button>
                      </div>
                    </div>
                  )
                }
              }}
            >
              <AutoFormSubmit>Send now</AutoFormSubmit>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Basics
