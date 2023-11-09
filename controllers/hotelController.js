import Hotel from "../models/hotelModel.js";

//get hotel
export const gethotel = async (req, res) => {
  const { location, hotelname } = req.query;

  const queryObject = {};

  if (location) {
    queryObject.$or = [
      { city: { $regex: location, $options: "i" } },
      { address: { $regex: location, $options: "i" } },
    ];
  }

  if (hotelname) {
    queryObject.hotelname = { $regex: hotelname, $options: "i" };
  }

  try {
    const hotels = await Hotel.find(queryObject);
    res.status(200).json({ hotels });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching hotels." });
  }
};

//create
export const createhotel = async (req, res) => {
  //res.send(req.body);

  const hotel = await Hotel.create(req.body);
  res.status(201).json({ hotel });
};

//update hotel
export const updatehotel = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({ updatedHotel });
  } catch (error) {
    res.status(500).json({ error: "failed to upadate hotel" });
  }
};

//delete
export const deletehotel = async (req, res) => {
  const { id } = req.params;
  const removehotel = await Hotel.findByIdAndDelete(id);

  res.status(200).json({ msg: "hotel deleted", hotel: removehotel });
};
