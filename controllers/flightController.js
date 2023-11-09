import Flight from "../models/flightModel.js";

export const getflight = async (req, res) => {
  const { from, to, departure, sort } = req.query;
  if (!departure) {
    return res
      .status(400)
      .json({ error: 'The "departure" parameter is required for the search.' });
  }
  const queryObject = {
    departure: { $gte: new Date(departure) },
  };
  if (from) {
    queryObject.from = { $regex: from, $options: "i" };
  }
  if (to) {
    queryObject.to = { $regex: to, $options: "i" };
  }
  const sortOption = {
    newest: "departure",
  };

  const sortKey = sortOption[sort] || sortOption.newest;

  try {
    const flights = await Flight.find(queryObject).sort(sortKey);
    res.status(200).json({ flights });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching flights." });
  }
};

//create flight
export const createflight = async (req, res) => {
  //res.send(req.body);
  const flight = await Flight.create(req.body);
  res.status(201).json({ flight });
};

//update flight
export const updateflight = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({ updatedFlight });
  } catch (error) {
    res.status(500).json({ error: "failed to upadate flight" });
  }
};

//delete flight
export const deleteflight = async (req, res) => {
  const { id } = req.params;
  const removeflight = await Flight.findByIdAndDelete(id);

  res.status(200).json({ msg: "flight deleted", flight: removeflight });
};
