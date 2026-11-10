import "./Ranglistenzeile.css";
import { categoryIcons } from "../../constants/categoryIcons";

function RanglistenZeile({ member, rank, categories }) {
  const category = categories.find(
    (item) => item.id === member.bestCategoryId
  );

  const CategoryIcon = categoryIcons[member.bestCategoryId];

  return (
    <tr className={member.isCurrentUser ? "leaderboard__row--current-user" : ""}>
      <td>
        <div className="member-name">
          <span className="member-rank">{rank}</span>
          <span>
            {member.name}
            {member.isCurrentUser && <span> (Du)</span>}
          </span>
        </div>
      </td>

      <td>
        {category && CategoryIcon ? (
          <div className="member-category">
            <span
              className="member-category-icon"
              style={{ backgroundColor: category.color, color: category.textColor }}
            >
              <CategoryIcon size={18} aria-hidden="true" />
            </span>
            <span>{category.name}</span>
          </div>
        ) : (
          <span>–</span>
        )}
      </td>

      <td className="member-points">
        {member.points.toLocaleString("de-DE")}
      </td>
    </tr>
  );
}

export default RanglistenZeile;