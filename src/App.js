import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [list, setList] = useState({});

  useEffect(() => {
    // localStorage.removeItem('list')
    let storedList = JSON.parse(localStorage.getItem("list"));
    if (storedList) {
      setList(storedList);
    }
    console.log("storedList :>> ", storedList);
  }, []);

  const handleNewListItemChange = (e) => {
    const { value } = e.target;
    setNewItem(value);
  };

  const handleAddListItem = (e) => {
    e.preventDefault();
    if (newItem) {
      let newList = { ...list };
      newList[newItem] = {};
      localStorage.setItem("list", JSON.stringify(newList));
      setList(newList);
      setNewItem("");
    }
  };

  const handleListDelete = (item) => {
    let newList = { ...list };
    delete newList[item];
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  };

  const handleNewCardItemChange = (e, item) => {
    const { name, value } = e.target;
    let newList = { ...list };
    newList[item][name] = value;
    console.log("newList :>> ", newList);
    setList(newList);
    // console.log('name,value :>> ', name,value,item);
  };

  const handleAddCardItem = (e, item) => {
    e.preventDefault();
    let newList = { ...list };
    const { new_title, new_description } = list[item];
    console.log("new_title,new_description :>> ", new_title, new_description);
    if (new_title) {
      newList[item] = {
        ...newList[item],
        [new_title]: new_description,
      };
      delete newList[item].new_title;
      delete newList[item].new_description;
      console.log("newList :>> ", newList);
      setList(newList);
      localStorage.setItem("list", JSON.stringify(newList));
    }
  };

  const handleCardDelete = (item, cardItem) => {
    let newList = { ...list };
    delete newList[item][cardItem];
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  };

  return (
    <div className="App">
      <div className="app_container">
        <div className="app_header row">
          <h1>Dashboard</h1>
        </div>
        <div className="card_container row">
          <div>
            <form
              className="card_form column"
              action="submit"
              onSubmit={handleAddListItem}
            >
              <input
                className="form_input"
                value={newItem}
                onChange={handleNewListItemChange}
                type="text"
                placeholder="Enter list title"
              />
              <button type="submit" onClick={handleAddListItem} className="btn">
                Add List
              </button>
            </form>
          </div>
          {Object.keys(list).map((item) => {
            return (
              <div key={item} className="card_list_item column">
                <div className="row card_header">
                  <h2 className="card_title">{item}</h2>
                  <div
                    onClick={() => handleListDelete(item)}
                    className="card_delete"
                  >
                    x
                  </div>
                </div>

                <form
                  className="column child_card_form"
                  action="submit"
                  onSubmit={(e) => handleAddCardItem(e, item)}
                >
                  <input
                    className="form_input"
                    value={list[item].new_title || ""}
                    name="new_title"
                    onChange={(e) => handleNewCardItemChange(e, item)}
                    type="text"
                    placeholder="Enter title"
                  />
                  <input
                    className="form_input"
                    value={list[item].new_description || ""}
                    name="new_description"
                    onChange={(e) => handleNewCardItemChange(e, item)}
                    type="text"
                    placeholder="Enter the text for this card"
                  />
                  <button
                    type="submit"
                    onClick={(e) => handleAddCardItem(e, item)}
                    className="btn"
                  >
                    Add Card
                  </button>
                </form>
                {Object.keys(list[item]).map((cardItem) => {
                  if (
                    cardItem === "new_title" ||
                    cardItem === "new_description"
                  ) {
                    return null;
                  }
                  return (
                    <div key={cardItem} className="column child_card_container">
                      <div className="row child_card_header">
                        <h3 className="card_title">{cardItem}</h3>
                        <div
                          onClick={() => handleCardDelete(item, cardItem)}
                          className="card_delete"
                        >
                          x
                        </div>
                      </div>
                      <div className="card_description">
                        {list[item][cardItem]}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
