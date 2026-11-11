import "./FormularEingabe.css";

function FormularEingabe({ label, name, id = name, type = "text", placeholder = "", defaultValue = "", onChange }) {
  return (
    <section className="form-card">
      <label className="form-card__label" htmlFor={id}>
        {label}
      </label>

      <input
        className="form-card__input"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        required
      />
    </section>
  );
}

export default FormularEingabe;