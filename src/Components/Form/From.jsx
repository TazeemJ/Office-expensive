import React, { useState, useEffect } from "react";

const Form = ({
  setFromDisplay,
  FromDisplay,
  setMyData,
  MyData,
  setFormData,
  formData,
  success,
}) => {
  let currentDate = new Date().toISOString().slice(0, 10);
  useEffect(() => {
    if (localStorage.getItem("MyData") !== null) {
      setMyData(JSON.parse(localStorage.getItem("MyData")));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handel handleSubmit

  const handleSubmit = (e) => {
    e.preventDefault();
    let uniqueId = Math.floor(Math.random() * 56600 + 1);
    let newData = [...MyData, { ...formData, uniqueId, currentDate }];
    setMyData(newData);
    localStorage.setItem("MyData", JSON.stringify(newData));
    setFromDisplay(true);
    setFormData({
      date: "",
      account: "",
      comments: "",
      amount: "",
      paidBy: "",
      expenseType: "",
      EdiBtnText: false,
    });
    success("Data SuccessFully Added");
  };

  // handel handleUpdate

  const handleUpdate = (e) => {
    e.preventDefault();
    formData["EdiBtnText"] = false;
    let spliceIndex = MyData.findIndex((item, index) => {
      return item.uniqueId == formData.uniqueId;
    });
    MyData.splice(spliceIndex, 1, formData);
    setMyData(MyData);
    localStorage.setItem("MyData", JSON.stringify(MyData));
    setFromDisplay(true);
    success("Data SuccessFully Updated");
  };

  return (
    <div
      className={` flex justify-center items-center ${
        FromDisplay ? "displaynone" : "displayactive"
      }`}
      style={{ backgroundColor: "#211b1b7d" }}
    >
      <div className="w-100   ">
        <div className="formshow w-100">
          <form
            onSubmit={formData.EdiBtnText ? handleUpdate : handleSubmit}
            className="col-4 mx-auto py-3 bg-white rounded-xl"
            id="form"
          >
            <div className="flex justify-between p-3 align-items-center">
              <h2
                htmlFor="date"
                className="form-label text-[35px] font-normal "
              >
                Expense Date
              </h2>
              <svg
                id="close"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-x-lg "
                viewBox="0 0 16 16"
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
                  setFromDisplay(true);
                }}
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </div>
            <fieldset className="px-3">
              <div className="mb-3">
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Account" className="form-label">
                  Account
                </label>
                <select
                  id="Account"
                  name="account"
                  className="form-select"
                  value={formData.account}
                  onChange={handleChange}
                  required
                >
                  <option selected>Electricity Bill</option>
                  <option>Petty Cash</option>
                  <option>Internet Bill</option>
                  <option>Water Filling</option>
                  <option>Guest Refreshment</option>
                  <option>Meals & Tips</option>
                  <option>Miscellaneous</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="Comments" className="form-label">
                  Comments
                </label>
                <textarea
                  id="Comments"
                  name="comments"
                  className="form-control"
                  value={formData.comments}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="Amount" className="form-label">
                  Amount
                </label>
                <input
                  id="Amount"
                  name="amount"
                  type="number"
                  className="form-control"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="PaidBuy" className="form-label">
                  Paid By
                </label>
                <select
                  id="PaidBuy"
                  name="paidBy"
                  className="form-select"
                  value={formData.paidBy}
                  onChange={handleChange}
                  required
                >
                  <option>Cash in Hand</option>
                  <option>Usama Ali</option>
                  <option>Sir Mujassir</option>
                  <option>Sir Omer Aziz</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="ExpenseBuy" className="form-label">
                  Expense Type
                </label>
                <select
                  id="ExpenseBuy"
                  name="expenseType"
                  className="form-select"
                  value={formData.expenseType}
                  onChange={handleChange}
                  required
                >
                  <option>Office Expense</option>
                  <option>Common Expense</option>
                  <option>Petty Cash</option>
                </select>
              </div>
            </fieldset>
            <hr />
            <button
              type="submit"
              className={`btn ${
                formData.EdiBtnText ? "bg-danger" : "bg-primary"
              } text-white ms-3 mt-3`}
            >
              {formData.EdiBtnText ? "Update" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
