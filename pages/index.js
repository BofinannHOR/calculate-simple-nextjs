import { useState } from "react";
import { Data } from "../components/Data";

function Home() {
  const timeOptions = [
    {
      key: 0,
      text: "07:00:00",
      value: 0,
    },
    {
      key: 1,
      text: "08:00:00",
      value: 1,
    },
    {
      key: 2,
      text: "09:00:00",
      value: 2,
    },
  ];

  const [selectedDate, setSelectedDate] = useState(Data[0].departure_date);
  const [selectedTime, setSelectedTime] = useState(Data[0].time[0].time_start);
  const [adult, setAdult] = useState(Data[0].time[0].adult);
  const [child, setChild] = useState(Data[0].time[0].child);
  const [infant, setInfant] = useState(Data[0].time[0].infant);
  const [totalAdult, setTotalAdult] = useState(0);
  const [totalChild, setTotalChild] = useState(0);
  const [totalInfant, setTotalInfant] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const handleDate = (event) => {
    setSelectedDate(event.target.value);
    let tmpDate = Data.find((e) => e.departure_date == event.target.value);
    console.log(tmpDate);
    let tmpArray = tmpDate.time.find((e) => e.time_start == selectedTime);
    setAdult(tmpArray.adult);
    setChild(tmpArray.child);
    setInfant(tmpArray.infant);
  };
  const handleTime = (event) => {
    setSelectedTime(event.target.value);
    let tmpTime = Data.find((e) => e.departure_date == selectedDate);
    let tmpArray = tmpTime.time.find((e) => e.time_start == event.target.value);
    setAdult(tmpArray.adult);
    setChild(tmpArray.child);
    setInfant(tmpArray.infant);
  };
  const handleAdult = (event) => {
    let totalA = adult * event.target.value;
    if (event.target.value >= 0) {
      setTotalAdult(totalA);
      setGrandTotal(totalA + totalChild);
    }
  };
  const handleChild = (event) => {
    let totalC = child * event.target.value;
    if (event.target.value >= 0) {
      setTotalChild(totalC);
      setGrandTotal(totalAdult + totalC);
    }
  };
  const handleInfant = (event) => {
    let totalI = infant * event.target.value;
    if (event.target.value >= 0) {
      setTotalInfant(totalI);
      setGrandTotal(totalAdult + totalChild + totalI);
    }
  };

  return (
    <div className=" p-2 items-center m-auto flex flex-col">
      <div>
        <label>Select Date</label>
        <select
          className="border p-1 rounded-md my-2 ml-1 hover:border-blue-400"
          name="select_date"
          id="select_date"
          onChange={handleDate}
        >
          {Data.map((d, index) => {
            return (
              <option
                key={index}
                value={d.departure_date}
                defaultValue={d.departure_date[0]}
              >
                {d.departure_date}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label>Select Time</label>
        <select
          className="border p-1 rounded-md my-2 ml-1 hover:border-blue-400"
          name="select_date"
          id="select_date"
          onChange={handleTime}
        >
          {timeOptions.map((t) => {
            return (
              <option value={t.text} key={t.key}>
                {t.text}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <ul className="flex flex-row justify-around border-2 rounded-lg p-3">
          <li className="flex flex-col items-center">
            <div className="inline-flex ">
              <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded-l">
                Adult
              </button>
              <button className="bg-blue-300 text-gray-800 py-2 px-4 rounded-r font-bold">
                ${adult}
              </button>
            </div>
            <div>
              <form className="flex flex-col items-center">
                <label className="font-bold mt-7">Adult</label>
                <input
                  onChange={handleAdult}
                  type="number"
                  min="0"
                  className="border p-1 rounded-md my-2 ml-1"
                  placeholder="adult..."
                />
              </form>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-bold">Total</h4>
              <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-md text-bold">
                ${totalAdult}
              </button>
            </div>
          </li>

          <li className="flex flex-col items-center">
            <div className="inline-flex ">
              <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded-l">
                Child
              </button>
              <button className="bg-red-300 text-gray-800 py-2 px-4 rounded-r font-bold">
                ${child}
              </button>
            </div>
            <div>
              <form className="flex flex-col items-center">
                <label className="font-bold mt-7">Child</label>
                <input
                  onChange={handleChild}
                  type="number"
                  min="0"
                  className="border p-1 rounded-md my-2 ml-1"
                  placeholder="child..."
                />
              </form>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-bold">Total</h4>
              <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-md text-bold">
                ${totalChild}
              </button>
            </div>
            <div className="flex flex-col items-center mt-7">
              <h1 className="font-bold text-lg mb-3">Grand Total</h1>
              <div className="bg-gray-300 text-gray-700  py-5 px-7 rounded-md font-bold text-2xl">
                ${grandTotal}
              </div>
            </div>
          </li>
          <li className="flex flex-col items-center">
            <div className="inline-flex ">
              <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded-l">
                Infant
              </button>
              <button className="bg-green-300 text-gray-800 py-2 px-4 rounded-r font-bold">
                ${infant}
              </button>
            </div>
            <div>
              <form className="flex flex-col items-center">
                <label className="font-bold mt-7">Infant</label>
                <input
                  onChange={handleInfant}
                  type="number"
                  className="border p-1 rounded-md my-2 ml-1"
                  placeholder="infant..."
                />
              </form>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="font-bold">Total</h4>
              <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-md text-bold">
                ${totalInfant}
              </button>
            </div>
          </li>
        </ul>
      </div>
      <span>Note: Calculate grand total base on select date and time.</span>
    </div>
  );
}
export default Home;
