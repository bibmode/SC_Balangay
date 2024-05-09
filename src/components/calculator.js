import { supabase } from "@/app/page";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// icons
import { FaChevronDown } from "react-icons/fa";

const Calculator = () => {
  // calculator field variables
  const types = ["plastic", "metal", "glass", "paper", "e-waste", "battery"];
  const [prices, setPrices] = useState(null);
  const [currentItem, setCurrentItem] = useState("monobloc");
  const [currentPrice, setCurrentPrice] = useState("1.50");
  const [currentUnit, setCurrentUnit] = useState("kg");
  const [currentType, setCurrentType] = useState("plastic");
  const [total, setTotal] = useState(0.0);

  // form variables
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // change total
  const changeTotal = (quantity) => {
    const calculation = quantity * parseFloat(currentPrice);

    setTotal(calculation);
  };

  // change type
  const changeType = (newType) => {
    setCurrentType(newType);
    console.log(newType);
  };

  // change item
  const changeItem = (newItem) => {
    setCurrentItem(newItem);
    console.log(newItem);

    changePriceUnit(newItem);
  };

  // change price & unit
  const changePriceUnit = (newItem) => {
    // change current price & unit
    const priceLine = prices.filter((price) => price["itemName"] == newItem)[0][
      "price"
    ];
    const price = priceLine.substring(0, priceLine.indexOf(" /"));
    const unit = priceLine.substring(
      priceLine.indexOf("/ ") + 1,
      priceLine.length
    );

    console.log(price, unit);

    setCurrentPrice(price);
    setCurrentUnit(unit);
  };

  // submit function for the calculator
  const onSubmit = (data) => console.log(data);

  // get the prices table data
  const getPricelist = async () => {
    try {
      const { data, error } = await supabase.from("prices").select();

      if (data !== null) {
        console.log(data);
        // save it to prices variable
        setPrices(data);
      } else {
        console.log("data error:" + error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPricelist();
  }, []);

  return (
    <div className="flex flex-col w-fit h-fit bg-white rounded-xl shadow-lg p-9">
      <h2 className="font-bold text-lg">Transaction Calculator</h2>
      <p className="text-5xl font-bold text-green-600 pt-3 pb-6">₱ {total}</p>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
        <div className="flex mb-3">
          <div className="flex flex-col">
            <p className="text-slate-500 mb-2 font-semibold text-sm">Type</p>

            <div className="relative w-32">
              <select
                {...register("type")}
                onChange={(e) => changeType(e.target.value)}
                className="block appearance-none w-full bg-white border-2 border-green-600 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-green-50 focus:border-green-600"
              >
                {types.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </select>

              <div className="absolute right-4 top-4 text-slate-500">
                <FaChevronDown />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 ml-4">
            <p className="text-slate-500 mb-2 font-semibold text-sm">Item</p>

            <div className="relative">
              <select
                {...register("item")}
                onChange={(e) => changeItem(e.target.value)}
                className="block appearance-none w-full bg-white border-2 border-green-600 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-green-50 focus:border-green-600"
              >
                {prices != null ? (
                  prices
                    .filter((price) => price["type"] == currentType)
                    .map((price) => (
                      <option value={price["itemName"]}>
                        {price["itemName"]}
                      </option>
                    ))
                ) : (
                  <option value="other">Glass</option>
                )}
              </select>

              <div className="absolute right-4 top-4 text-slate-500">
                <FaChevronDown />
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* price */}
          <div className="flex flex-col">
            <p className="text-slate-500 mb-2 font-semibold text-sm">Price</p>

            <div className="relative">
              <p className="absolute top-3 left-3">₱</p>

              <input
                {...register("price")}
                defaultValue={currentPrice}
                value={currentPrice}
                className="block mb-6 w-32 appearance-none bg-white border-2 border-slate-400 text-gray-700 py-3 pl-8 pr-4 rounded-lg leading-tight focus:outline-none focus:bg-green-50 focus:border-green-600"
              />
            </div>
          </div>

          {/* unit */}
          <div className="flex flex-col ml-4 w-20">
            <p className="text-slate-500 mb-2 font-semibold text-sm">Unit</p>

            <input
              {...register("unit")}
              defaultValue={currentUnit}
              value={currentUnit}
              className="block mb-6 appearance-none bg-white border-2 border-slate-400 text-gray-700 py-3 px-4 rounded-lg leading-tight focus:outline-none focus:bg-green-50 focus:border-green-600"
            />
          </div>

          {/* quantity */}
          <div className="flex flex-col ml-4 w-36">
            <p className="text-slate-500 mb-2 font-semibold text-sm">
              Quantity
            </p>

            <input
              {...register("quantity")}
              defaultValue="0"
              onChange={(e) => changeTotal(e.target.value)}
              className="block mb-6 appearance-none bg-white border-2 border-green-600 text-gray-700 py-3 px-4 rounded-lg leading-tight focus:outline-none focus:bg-green-50 focus:border-green-600"
            />
          </div>
        </div>

        <button className="bg-green-600 hover:bg-green-700 rounded-lg text-lg text-white p-2 mt-3">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Calculator;
