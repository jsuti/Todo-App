import "./KategorienAuswahl.css";
import { categoryIcons } from "../../constants/categoryIcons";

function KategorienAuswahl({ categories }) {
  return (
    <section className="category-card">
      <fieldset className="category-fieldset">
        <legend className="category-fieldset__legend">Kategorie auswählen</legend>

        <div className="category-choices">
          {categories.map((category, index) => {
            const CategoryIcon = categoryIcons[category.id];

            return (
              <label className="category-choice" key={category.id}>
                <input
                  className="category-choice__input"
                  type="radio"
                  name="categoryId"
                  value={category.id}
                  defaultChecked={index === 0}
                  required
                />

                <span className="category-choice__check" aria-hidden="true">
                  ✓
                </span>

                <span
                  className="category-choice__badge"
                  style={{
                    backgroundColor: category.color,
                    color: category.textColor,
                  }}
                >
                  {CategoryIcon && (
                    <CategoryIcon size={16} aria-hidden="true" />
                  )}
                  <span>{category.name}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}

export default KategorienAuswahl;