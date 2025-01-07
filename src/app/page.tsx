import Heading from "@/components/Heading";
import ThemeBtn from "@/components/ThemeBtn";
import TodoInput from "@/components/TodoInput";
import TodoLists from "@/components/TodoLists";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-between h-[800px] max-w-[430px] mx-auto space-y-4 px-4 pt-3 mt-10 pb-8 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-lg">
      <ThemeBtn />
      <div className="flex flex-col gap-4 w-full h-full ">
        <Heading />
        <TodoLists/>
      </div>
      <TodoInput />
    </main>
  );
};

export default Home;
