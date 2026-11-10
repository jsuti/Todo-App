import "./Rangliste.css";
import { UsersRound } from "lucide-react";
import RanglistenZeile from "../../components/Ranglistenzeile/Ranglistenzeile";
import Seitenkopf from "../../components/Seitenkopf/Seitenkopf";

function Rangliste({ categories, currentGroup, users, currentUserId }) {
  const members = currentGroup
    ? currentGroup.memberIds
        .map((id) => users.find((user) => user.id === id))
        .filter(Boolean)
        .map((user) => ({
          ...user,
          isCurrentUser: user.id === currentUserId,
        }))
    : [];

  const rankedMembers = [...members].sort(
    (a, b) => b.points - a.points
  );

  return (
    <div>
      <Seitenkopf
        eyebrowText="Gemeinsam dranbleiben"
        header="Rangliste"
      />

      <section className="group-card">
        <div className="group-card__info">
          <p className="group-card__eyebrow">
            {currentGroup ? "Deine Gruppe" : "In den Einstellungen kannst du eine neue Gruppe erstellen oder einer schon vorhandenen Gruppe beitreten."}
          </p>

          <p className="group-card_name">
            {currentGroup?.name ?? ""}
          </p>
        </div>

        {currentGroup && (
          <div className="group-card__icon">
            <UsersRound size={30} strokeWidth={2.0} />
          </div>
        )}
      </section>

      {currentGroup && (
        <section className="leaderboard">

          <div>
            <table className="leaderboard__table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Beste Kategorie</th>
                  <th scope="col" className="points-column">
                    Punkte
                  </th>
                </tr>
              </thead>

              <tbody>
                {rankedMembers.map((member, index) => (
                  <RanglistenZeile
                    key={member.id}
                    member={member}
                    rank={index + 1}
                    categories={categories}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
        )}
    </div>
  );
}

export default Rangliste;
