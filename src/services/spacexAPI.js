export const getAllLaunches = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/launches");
  const data = await res.json();
  return data;
};


export const getUpcomingLaunches = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/launches/upcoming");
  return res.json();
};

export const getPastLaunches = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/launches/past");
  return res.json();
};
