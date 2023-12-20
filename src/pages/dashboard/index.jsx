import React, { useState, useEffect } from "react";
import CardModule from "./card/cardModule";
import Layout from "@/components/layout/Index";
import { Button } from "@/components/ui/button";
import ListUlasan from "./cardUlasanUser";
import CardTotalMentee from "./cardTotalMentee";
import { CardUlasanUser } from "./card/cardUlasanUser";
import { getAllCourse, getCouseByID } from "@/utils/apis/dashboard";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [totalMenteeData, setTotalMenteeData] = useState({});
  const [feedbackData, setFeedbackData] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCourse();
        const defaultModuleId = response.data.course[0]?.id;

        setCourses(response.data.course);
        setActiveModule(defaultModuleId);

        if (defaultModuleId) {
          const totalMenteeResponse = await getCouseByID(defaultModuleId);
          const { total_user, total_active_user, feedback } =
            totalMenteeResponse.data;

          setTotalMenteeData({
            id: defaultModuleId,
            title: response.data.course[0]?.title,
            total_user,
            total_active_user,
          });

          setFeedbackData(feedback || []);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, []);

  const handleModuleClick = async (moduleId) => {
    setActiveModule(moduleId);

    try {
      const response = await getCouseByID(moduleId);
      const { total_user, total_active_user, feedback } = response.data;

      setTotalMenteeData({
        id: moduleId,
        title: response.data.title,
        total_user,
        total_active_user,
      });

      setFeedbackData(feedback || []);
    } catch (error) {
      console.error("Error fetching course data by ID:", error);
    }
  };

  const formatDate = (dateString) => {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, "dd-MM-yyyy");
  };

  return (
    <Layout>
      <div className="container mb-10 font-poppins">
        <div>
          <h1 className="text-5xl font-bold">Hello {username},</h1>
          <h3 className="text-2xl">udah siap ngajar lagi?</h3>
        </div>
        <div className="mt-4 overflow-x-auto">
          <div className="flex gap-8">
            {courses.map((course) => (
              <CardModule
                key={course.id}
                id={course.id}
                logo={course.image_url}
                title={course.title}
                onClick={() => handleModuleClick(course.id)}
                isActive={activeModule === course.id}
              />
            ))}
          </div>
        </div>
        <div className="my-6 grid justify-items-end">
          <Link to={`/kelas/manage-kelas/${activeModule}`}>
            <Button className="w-[168px] items-center justify-center rounded-lg bg-[#092C4C] px-[10px] py-[15px]">
              <p className="font-poppins text-[16px] font-semibold text-white">
                Manage Kelas
              </p>
            </Button>
          </Link>
        </div>
        <div className="w-full pb-4">
          <CardTotalMentee
            title={totalMenteeData.title}
            totalUsers={totalMenteeData.total_user}
            totalActiveUsers={totalMenteeData.total_active_user}
          />
        </div>
        <h2 className="py-4 text-start text-xl font-bold">Ulasan User</h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-1">
          {feedbackData.length === 0 ? (
            <p className="text-center text-gray-500">
              Belum ada feedback untuk modul ini.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-1">
              {feedbackData.map((feedbackItem, index) => (
                <CardUlasanUser
                  key={index}
                  image={feedbackItem.user.image_url}
                  title={feedbackItem.user.name}
                  desc={feedbackItem.content}
                  time={formatDate(feedbackItem.created_at)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
