import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Course";
import "./styles.css";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useEffect, useState } from "react";
import * as userClient from "./Account/client";
import * as courseClient from "./Course/client";
export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
// const fetchCourses = async () => {
//     try {
//       const courses = await userClient.findMyCourses();
//       setCourses(courses);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  // useEffect(() => {
  //   fetchCourses();
  // }, [currentUser]);
// const fetchAllCourses = async () => {
//     try {
//       const allCourses = await userClient.findAllCourses();
//       setAllCourses(allCourses);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  // useEffect(() => {
  //   fetchAllCourses();
  // }, []);
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };
    const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
};
  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    }))
    ;};

//   const enrollUserInCourse = async (courseId:string) => {
//       const updatedCourses = await userClient.enrollUserInCourse(courseId);
//       setCourses(updatedCourses);
//   }
//   const unenrollUserFromCourse = async (courseId: string) => {
//   await userClient.unenrollUserFromCourse(courseId);
//   const updatedEnrollments = await userClient.fetchEnrollments();
//   setEnrollments(updatedEnrollments);

//   const updatedCourses = await userClient.findMyCourses();
//   setCourses(updatedCourses);
// };



 const updateEnrollment = async (courseId: string, enrolled: boolean) => {
   if (enrolled) {
     await userClient.enrollIntoCourse(currentUser._id, courseId);
   } else {
     await userClient.unenrollFromCourse(currentUser._id, courseId);
   }
   setCourses(
     courses.map((course) => {
       if (course._id === courseId) {
         return { ...course, enrolled: enrolled };
       } else {
         return course;
       }
     })
   );
 };




 const [enrolling, setEnrolling] = useState<boolean>(false);
 const findCoursesForUser = async () => {
   try {
     const courses = await userClient.findCoursesForUser(currentUser._id);
     setCourses(courses);
   } catch (error) {
     console.error(error);
   }
 };
 const fetchCourses = async () => {
   try {
     const allCourses = await courseClient.fetchAllCourses();
     const enrolledCourses = await userClient.findCoursesForUser(
       currentUser._id
     );
     const courses = allCourses.map((course: any) => {
       if (enrolledCourses.find((c: any) => c._id === course._id)) {
         return { ...course, enrolled: true };
       } else {
         return course;
       }
     });
     setCourses(courses);
   } catch (error) {
     console.error(error);
   }
 };

  useEffect(() => {
   if (enrolling) {
     fetchCourses();
   } else {
     findCoursesForUser();
   }
 }, [currentUser, enrolling]);

  return (
    <Session>
    <div id="wd-kambaz">
      <div>
            <KambazNavigation />
      </div>
      <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"} />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={<ProtectedRoute><Dashboard enrolling={enrolling} setEnrolling={setEnrolling}  courses={courses} course={course} setCourse={setCourse} addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} updateEnrollment={updateEnrollment}/></ProtectedRoute>} />
            <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses}/></ProtectedRoute>} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
      </div>
    </div>
    </Session>
);}
