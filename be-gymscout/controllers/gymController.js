import Gym from "../models/Gyms.js";

export const index = async (req, res) => {
  const { search, city, sort } = req.query;

  let query = {};

  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (city) {
    query.location = {
      $regex: city,
      $options: "i",
    };
  }

  let sortOption = {};

  if (sort === "price-low") {
    sortOption.price = 1;
  }

  if (sort === "price-high") {
    sortOption.price = -1;
  }

  const gyms = await Gym.find(query).sort(sortOption).populate("reviews");

  res.send({ gyms });
};

export const showGym = async (req, res) => {
  const gym = await Gym.findById(req.params.id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });

  res.send({ gym });
};

export const createGym = async (req, res) => {
  const gym = new Gym(req.body.gym);

  if (req.file) {
    gym.image = req.file.path;
  }

  gym.owner = req.user.id;

  gym.coordinates = {
    lat: Number(req.body.gym.lat),
    lng: Number(req.body.gym.lng),
  };

  await gym.save();

  res.send({ gym });
};

export const updateGym = async (req, res) => {
  const { id } = req.params;

  const gym = await Gym.findById(id);

  if (!gym) {
    return res.status(404).send({
      message: "Gym not found",
    });
  }

  if (gym.owner.toString() !== req.user.id) {
    return res.status(403).send({
      message: "You are not allowed to edit this gym",
    });
  }

  Object.assign(gym, req.body.gym);

  gym.coordinates = {
    lat: Number(req.body.gym.lat),
    lng: Number(req.body.gym.lng),
  };

  if (req.file) {
    gym.image = req.file.path;
  }

  await gym.save();

  res.send({ gym });
};

export const deleteGym = async (req, res) => {
  const { id } = req.params;

  const gym = await Gym.findById(id);

  if (!gym) {
    return res.status(404).send({
      message: "Gym not found",
    });
  }

  if (gym.owner.toString() !== req.user.id) {
    return res.status(403).send({
      message: "You are not allowed to delete this gym",
    });
  }

  await Gym.findByIdAndDelete(id);

  res.send({ success: true });
};