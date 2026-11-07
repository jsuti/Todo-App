import "./FormularEingabe.css";

function FormularEingabe({ label, name, id = name, placeholder = "" }) {
  return (
    <section className="form-card">
      <label className="form-card__label" htmlFor={id}>
        {label}
      </label>

      <input
        className="form-card__input"
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        required
      />
    </section>
  );
}

export default FormularEingabe;