import DashboardHeader from "../componenet/dashboard/DashboardHeader.jsx";
import StatsGrid from "../componenet/dashboard/StatsGrid.jsx";
import Navbar from "../componenet/layout/Navbar.jsx";
import SearchFilter from "../componenet/filters/SearchFilter.jsx";
import { useEffect, useMemo, useState } from "react";
import TaskTable from "../componenet/task/TaskTable.jsx";
import AddTaskModal from "../componenet/forms/AddTask.jsx";
import DeleteTaskModal from "../componenet/forms/DeleteTaskModal.jsx";
import { useTasks } from "../hooks/useAuth.js";
import TableSkeleton from "../componenet/layout/TableSkeleton.jsx";
import {
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from "../hooks/useTask.js";
import StatsGridSkeleton from "../componenet/layout/skeleton/StatsGridSkeleton.jsx";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const { data, isLoading } = useTasks();

  const tasks = data?.allTask || [];

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filterLoading, setFilterLoading] = useState(false);

  // handle submit done create update
  const handleSubmitTask = (formData) => {
    if (selectedTask) {
      // Update

      updateTask.mutate(
        {
          id: selectedTask._id,
          data: formData,
        },
        {
          onSuccess: () => {
            setShowModal(false);
            setSelectedTask(null);
          },
        },
      );
    } else {
      // Create

      createTask.mutate(formData, {
        onSuccess: () => {
          setShowModal(false);
        },
      });
    }
  };

  // handling delete click
  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  // handling Edit click
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  // effiient way to handle closing add task modle
  const closeAddTaskmodle = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  // handling delete Task
  const handleDeleteTask = () => {
    deleteTask.mutate(selectedTask._id, {
      onSuccess: () => {
        setSelectedTask(null);
        setShowDeleteModal(false);
      },
    });
  };

  // filtering task and adding delay when filter or task change
  useEffect(() => {
    setFilterLoading(true);

    const timer = setTimeout(() => {
      const filtered = tasks.filter((task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = status === "" || task.status === status;

        const matchesPriority = priority === "" || task.priority === priority;

        return matchesSearch && matchesStatus && matchesPriority;
      });

      setFilteredTasks(filtered);
      setFilterLoading(false);
    }, 1000); // 1s delay for skeleton loading...

    return () => clearTimeout(timer);
  }, [tasks, search, status, priority]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {/* Dashboard header part */}
        <DashboardHeader onAddTask={() => setShowModal(true)} />
        {/* Stats card  */}
        {filterLoading ? (
          <StatsGridSkeleton />
        ) : (
          <StatsGrid tasks={filteredTasks} />
        )}
        {/* Filter and Search bar */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          total={filteredTasks?.length}
        />
        {/* Task table */}
        {isLoading || filterLoading ? (
          <TableSkeleton />
        ) : (
          <TaskTable
            tasks={filteredTasks}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
        )}

        {/* add Task modal */}
        <AddTaskModal
          open={showModal}
          onClose={closeAddTaskmodle}
          onCreate={handleSubmitTask}
          loading={createTask.isPending || updateTask.isPending}
          isEdit={!!selectedTask}
          task={selectedTask}
        />

        {/* Delete Task */}
        <DeleteTaskModal
          open={showDeleteModal}
          taskTitle={selectedTask?.title}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedTask(null);
          }}
          onDelete={handleDeleteTask}
          loading={deleteTask.isPending}
        />
      </main>
    </div>
  );
};

export default Dashboard;
