import { Check, X } from "lucide-react";
import "./FormularMessagebox.css";

function FormularMessagebox({ type = "error", message }) {
  if (!message) return null;

  const isSuccess = type === "success";
  const Icon = isSuccess ? Check : X;

  return (
    <div
      className={`form-messagebox form-messagebox--${type}`}
      role={isSuccess ? "status" : "alert"}
    >
      <span className="form-messagebox__text">{message}</span>

      <span className="form-messagebox__icon" aria-hidden="true">
        <Icon size={28} strokeWidth={2.5} />
      </span>
    </div>
  );
}

export default FormularMessagebox;