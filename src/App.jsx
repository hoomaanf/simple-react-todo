import { useState } from "react";
import ListContainer from "./components/ListContainer";
import ListItem from "./components/ListItem";
import useDB from "./db/db";

export default function App() {
  const { getData, setData, editeData, deleteItem } = useDB();
  const [textInputValue, setTextInputValue] = useState("");

  function addData(e) {
    if (e.key === "Enter") {
      if (!textInputValue.trim()) return;
      setData({
        id: getData().length + 1,
        title: textInputValue,
        complete: false,
      });
      setTextInputValue("");
    }
  }
  let todoItem = getData().map((item) => (
    <ListItem
      key={item.id}
      id={item.id}
      title={item.title}
      complete={item.complete}
      onToggle={onToggle}
      deleteItem={deleteItem}
      editeData={editeData}
    />
  ));

  function onToggle(id, title, isComplete) {
    editeData(id, { title: title, complete: isComplete });
  }

  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-center h-screen">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
          <div className="flex items-center mb-6">
            <h1 className="mr-6 text-4xl font-bold text-purple-600">
              TO DO APP
            </h1>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="What needs to be done today?"
              className="w-full px-2 py-3 border rounded outline-none border-grey-600"
              value={textInputValue}
              onChange={(e) => setTextInputValue(e.target.value)}
              onKeyDown={addData}
            />
          </div>
          <ListContainer>{todoItem}</ListContainer>
        </div>
      </div>
    </div>
  );
}
