import { useEffect, useState } from "react";

export default function useDB() {
  const [listData, setListData] = useState(() => {
    const stored = localStorage.getItem("data");
    return stored
      ? JSON.parse(stored)
      : [
          { id: 1, title: "Do Homework", complete: false },
          { id: 2, title: "Do React Exercise", complete: false },
        ];
  });

  function getData() {
    return listData;
  }

  function setData(data) {
    const exists = listData.some((item) => item.title === data.title);
    if (exists) {
      alert("این عنوان قبلاً اضافه شده!");
      return;
    }
    setListData([...listData, data]);
  }

  function editeData(id, newFields) {
    setListData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...newFields } : item))
    );
  }

  function deleteItem(id) {
    const filteredList = listData.filter((item) => item.id !== id);
    setListData(filteredList);
  }

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(listData));
  }, [listData]);

  return { getData, setData, editeData, deleteItem };
}
