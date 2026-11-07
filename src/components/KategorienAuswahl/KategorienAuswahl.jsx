import "./KategorienAuswahl.css";
import { Sparkles, Flame, Leaf, BookOpen } from "lucide-react";

const categoryIcons = {
  1: Sparkles,
  2: Flame,
  3: Leaf,
  4: BookOpen,
};

function KategorienAuswahl({ categories }) {
  return (
    <section className="settings-card settings-card--categories">
      <fieldset className="form-card__fieldset">
        <legend className="settings-card__label">Kategorie</legend>

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