import { useState } from "react";
import { Form } from "./type";
import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} from "./validators";

interface Errors {
  [key: string]: { dirty?: boolean; error: boolean; message: string };
}

const touchErrors = (errors: Errors) => {
  return Object.entries(errors).reduce((acc: Errors, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useLoginFormValidator = (form: Form) => {
  const [errors, setErrors] = useState<Errors>({
    email: {
      dirty: false,
      error: false,
      message: "",
    },
    password: {
      dirty: false,
      error: false,
      message: "",
    },
    confirmPassword: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({
    form,
    field,
    errors,
    forceTouchErrors = false,
  }: {
    form: Form;
    field?: string;
    errors: Errors;
    forceTouchErrors?: boolean;
  }) => {
    let isValid = true;

    let nextErrors = JSON.parse(JSON.stringify(errors));

    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { email, password, confirmPassword } = form;

    if (nextErrors.email.dirty && (!field || field === "email")) {
      const emailMessage = emailValidator(email);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (!field || field === "password")) {
      const passwordMessage = passwordValidator(password);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (!!passwordMessage) isValid = false;
    }

    if (
      nextErrors.confirmPassword.dirty &&
      (!field || field === "confirmPassword")
    ) {
      const confirmPasswordMessage = confirmPasswordValidator(
        confirmPassword,
        form
      );
      nextErrors.confirmPassword.error = !!confirmPasswordMessage;
      nextErrors.confirmPassword.message = confirmPasswordMessage;
      if (!!confirmPasswordMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const fieldError = errors[field as keyof typeof errors];
    // console.log(form);
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field as keyof typeof errors],
        dirty: true,
      },
    };
    console.log(form);

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
