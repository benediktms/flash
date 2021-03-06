import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from 'react';
import { useField, UseFieldConfig } from 'react-final-form';

import { Input } from '@chakra-ui/input';
import { FormControl, FormLabel } from '@chakra-ui/form-control';

export interface LabeledTextFieldProps
  extends ComponentPropsWithoutRef<typeof Input> {
  name: string;
  label: string;
  type?: 'text' | 'password' | 'email' | 'number';
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
  labelProps?: ComponentPropsWithoutRef<'label'>;
  fieldProps?: UseFieldConfig<string>;
}

const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === 'number'
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (v: any) => (v === '' ? null : v),
      ...fieldProps,
    });

    const normalizedError = Array.isArray(error)
      ? error.join(', ')
      : error || submitError;

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>{label}</FormLabel>
        <Input {...input} disabled={submitting} {...props} ref={ref} />
        {touched && normalizedError && (
          <div role="alert" style={{ color: 'red' }}>
            {normalizedError}
          </div>
        )}
      </FormControl>
    );
  }
);

LabeledTextField.displayName = 'LabeledTextField';

export default LabeledTextField;
