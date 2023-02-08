import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [datas, setDatas] = useState([]);
  const fetchDatas = async () => {
    try {
      const res = await axios.get("https://reqres.in/api/login");
      console.log(res);
      setDatas(res.data.data);
    } catch (error) {
      alert("failed to get");
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  console.log("datas", datas);

  return (
    <div className="text-center w-full h-screen flex justify-center">
      <div className="flex flex-col justify-center h-full">
        <div className="text-4xl font-extrabold m-5">hello</div>
        <div className="text-xl ">
          {datas.map((item: any) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
