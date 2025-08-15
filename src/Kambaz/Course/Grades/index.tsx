import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
// import { setGrades } from "./reducer";

export default function Grades() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { grades } = useSelector((state: any) => state.gradesReducer);

  const fetchGrades = async () => {
    if (!cid || !currentUser) return;
    // Fetch grades logic here, e.g., using an API call
    // const grades = await gradesClient.fetchGradesForCourse(cid, currentUser._id);
    // console.log(grades);
  };
  useEffect(() => {
    fetchGrades();
  }, []);
  return (
    <div>
      <h1>Grades</h1>
      <p>This is the Grades page for course {cid}.</p>
      <p>
        Current User: {currentUser?.firstName} {currentUser?.lastName}
      </p>
    </div>
  );
}
