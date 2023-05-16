import styles from "./Select.module.css";

function Select({ text, name, handleOnChange, value, options }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value= {value || ''}
      >
        <option> Select an option</option>
        {options.map (option => (
          <option value={option._id} key={option._id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
