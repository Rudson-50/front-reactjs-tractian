import React from "react";
import styles from "./Input.module.css";
export const Input = ({ label, type, name, value, onChange, error, onBlur, size }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
   
        id={name}
        name={name}
        type={type}
        className={styles.input}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        size={size}
      />

    </div>
  );
};
