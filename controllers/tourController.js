import Tour from "../models/tourModel.js";

//create tour
export const createtour = async (req, res) => {
  //res.send(req.body);
  const tour = await Tour.create(req.body);
  res.status(201).json({ tour });
};

//update
export const updateTour = async (req, res) => {
    const id = req.params.id;

    try {
      const updatedTour = await Tour.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
  
      res.status(200).json({updatedTour});
    } catch (error) {
      res.status(500).json({ error: "failed to upadate tour" });
    }
};

//get
export const getTour = async (req, res) => {

    const {input} = req.query;

    const queryObject = {};

    if (input) {
      queryObject.$or = [
        { city: { $regex: input, $options: "i" } },
        { address: { $regex: input, $options: "i" } },
        { title : { $regex: input, $options: "i" }},
      ];
    }

    try {
        const tours = await Tour.find(queryObject);
        res.status(200).json({ tours });
      } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching tours." });
      }

};

//delete
export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    const removetour = await Tour.findByIdAndDelete(id);

    res.status(200).json({ msg: "tour deleted", tour: removetour });
  } catch (error) {
    res.status(500).json({ error: "failed to delete tour" });
  }
};
