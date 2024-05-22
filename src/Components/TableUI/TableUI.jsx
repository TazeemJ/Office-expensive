import React, { useState, useEffect } from "react";
import From from "./../Form/From";
import TableRow from "../TableRow/TableRow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataNotFound from "../LottieFiles/DataNotFound";

const TableUI = () => {
  let [MyData, setMyData] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    account: "",
    comments: "",
    amount: "",
    paidBy: "",
    expenseType: "",
    EdiBtnText: false,
  });
  let [activeBtn, setActiveBtn] = useState("All");
  const [FromDisplay, setFromDisplay] = useState(true);

  // DeleteRow From Data

  function deleteBtn(id) {
    let updatedFormData = JSON.parse(localStorage.getItem("MyData")).filter(
      (data) => data.uniqueId != id
    );
    MyData = updatedFormData;
    setMyData(updatedFormData);
    localStorage.setItem("MyData", JSON.stringify(MyData));
    setActiveBtn("All");
    delTost();
  }

  // DeleteRow From ediBtn
  function ediBtn(id) {
    let updatedFormData = JSON.parse(localStorage.getItem("MyData")).filter(
      (data) => data.uniqueId == id
    );
    updatedFormData[0]["EdiBtnText"] = true;
    setFormData(updatedFormData[0]);
    setFromDisplay(false);
    setActiveBtn("All");
  }

  // TabFunction From ediBtn
  function tabFunction(TabText) {
    setActiveBtn(TabText);
    console.log(activeBtn);
    if (TabText == "All") {
      let filter = JSON.parse(localStorage.getItem("MyData"));
      setMyData(filter);
    } else if (TabText == "Today") {
      let filter = JSON.parse(localStorage.getItem("MyData")).filter(
        (item, index) => {
          return item.currentDate == new Date().toISOString().slice(0, 10);
        }
      );
      setMyData(filter);
    } else {
      let filter = JSON.parse(localStorage.getItem("MyData")).filter((type) => {
        return type.expenseType === TabText;
      });
      console.log(filter);
      setMyData(filter);
    }
  }

  function SearchValue(text) {
    if (!text) {
      // If the search text is empty, reset the data to display all items
      let allData = MyData;
      setMyData(allData);
      tabFunction(activeBtn);
    } else {
      // Filter the data based on the search text
      let filteredData = MyData.filter((item) => {
        // Convert the expenseType value to a string and perform case-insensitive search
        return item.expenseType.toLowerCase().includes(text.toLowerCase());
      });
      setMyData(filteredData);
    }
  }
  return (
    <>
      <From
        setFromDisplay={setFromDisplay}
        FromDisplay={FromDisplay}
        setMyData={setMyData}
        MyData={MyData}
        setFormData={setFormData}
        formData={formData}
        setActiveBtn={setActiveBtn}
        success={success}
      />
      <div className="flex justify-center p-4 align-items-center">
        <a className="navbar-brand text-[40px] font-medium" href="#">
          Office Expense Form
        </a>
        <button
          id="add"
          onClick={() => {
            setFormData({
              date: "",
              account: "",
              comments: "",
              amount: "",
              paidBy: "",
              expenseType: "",
              EdiBtnText: false,
            });
            setActiveBtn("All");
            tabFunction("All");
            setFromDisplay(false);
          }}
          className="py-2 px-3 rounded-xl text-white  ml-auto me-3 bg-[#bb2d3b]" // style="background-color: #bb2d3b !important;"
        >
          Add New Expenses
        </button>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5 my-3 ">
            <div className="search-container d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="search"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-search ms-auto"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input
                type="search"
                name="search"
                placeholder="Search item"
                className="w-25"
                onChange={(e) => SearchValue(e.target.value)}
              />
              {[
                "Office Expense",
                "Petty Cash",
                "Common Expense",
                "Today",
                "All",
              ].map((button, index) => (
                <button
                  key={index}
                  onClick={() => tabFunction(button)}
                  // Add a unique key prop for each button
                  className={`px-3 py-2 rounded-md text-white ml-5 ${
                    button == activeBtn && "btnActive"
                  }`}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <button className="btn text-white ms-suto">
              View Summary Details
            </button>
            <div id="showD"></div>
          </div>
          <div className="col-12 px-0">
            <table className="table mb-0">
              <TableHead />
              <tbody>
                {MyData && MyData.length > 0 ? (
                  MyData.map((data, index) => (
                    <TableRow
                      data={data}
                      key={index}
                      deleteBtn={deleteBtn}
                      ediBtn={ediBtn}
                    />
                  ))
                ) : (
                 
                    <DataNotFound />
                  
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* tostalert */}
      <ToastContainer />
    </>
  );
};

export default TableUI;

function TableHead() {
  return (
    <thead className="table-dark">
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Account</th>
        <th scope="col">Comments</th>
        <th scope="col">Paid By</th>
        <th scope="col">Account</th>
        <th scope="col">Type</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
  );
}

const delTost = () => {
  toast.error("Warning data is delete!", {
    position: "top-right",
    autoClose: 800,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

// // toastCode
const success = (textForToast) => {
  toast.dark(
    <span>
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="var(--toastify-icon-color-success)"
        className="inline mr-1 mb-1"
      >
        <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path>
      </svg>
      {textForToast}
    </span>,
    {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
  );
};
