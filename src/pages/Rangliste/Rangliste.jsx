import "./Rangliste.css";
import { UsersRound } from "lucide-react";
import RanglistenZeile from "../../components/Ranglistenzeile/Ranglistenzeile";
import Seitenkopf from "../../components/Seitenkopf/Seitenkopf";

function Rangliste({ categories, displayName }) {
  const members = [
    { id: 1, name: "Leonie", points: 1250, bestCategoryId: 2, isCurrentUser: false },
    { id: 2, name: displayName, points: 980, bestCategoryId: 4, isCurrentUser: true },
    { id: 3, name: "Jonas", points: 760, bestCategoryId: 3, isCurrentUser: false },
    { id: 4, name: "Aylin", points: 660, bestCategoryId: 1, isCurrentUser: false },
  ];
  
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
              Deine Gruppe
            </p>

            <p className="group-card_name">Gruppe</p>
          </div>

          <div className="group-card__icon">
            <UsersRound size={30} strokeWidth={2.0} />
          </div>

      </section>

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

    </div>
  );
}

export default Rangliste;
