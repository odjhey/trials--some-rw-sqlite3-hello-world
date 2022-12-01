import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditHelloById, UpdateHelloInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormHello = NonNullable<EditHelloById['hello']>

interface HelloFormProps {
  hello?: EditHelloById['hello']
  onSave: (data: UpdateHelloInput, id?: FormHello['id']) => void
  error: RWGqlError
  loading: boolean
}

const HelloForm = (props: HelloFormProps) => {
  const onSubmit = (data: FormHello) => {
  
    
    
  
    props.onSave(data, props?.hello?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormHello> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="message"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message
        </Label>
        
          <TextField
            name="message"
            defaultValue={props.hello?.message}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="message" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default HelloForm
