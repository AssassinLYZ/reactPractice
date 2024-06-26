import { useState } from "react";
import styles from "./form.module.css";
import { Form } from "./type";
import { useLoginFormValidator } from "./hooks";
const LoginForm = () => {
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);
  const right = () => {
    console.log(123);
  };

  const onUpdateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    right();
    // alert(JSON.stringify(form, null, 2));
  };

  return (
    <form className={styles.form} onSubmit={onSubmitForm}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Email</label>
        <input
          className={styles.formField}
          type="text"
          aria-label="Email field"
          name="email"
          value={form.email}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.email.dirty && errors.email.error ? (
          <p className={styles.formFieldErrorMessage}>{errors.email.message}</p>
        ) : null}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Password</label>
        <input
          className={styles.formField}
          type="password"
          aria-label="Password field"
          name="password"
          value={form.password}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.password.dirty && errors.password.error ? (
          <p className={styles.formFieldErrorMessage}>
            {errors.password.message}
          </p>
        ) : null}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Confirm Password</label>
        <input
          className={styles.formField}
          type="password"
          aria-label="Confirm password field"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onUpdateField}
          onBlur={onBlurField}
        />
        {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
          <p className={styles.formFieldErrorMessage}>
            {errors.confirmPassword.message}
          </p>
        ) : null}
      </div>
      <div className={styles.formActions}>
        <button className={styles.formSubmitBtn} type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
