import jwt from "jsonwebtoken";

const generalAccessToken = async (uid, role) => {
  const accessToken = jwt.sign(
    {
      _id: uid,
      role,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "1 day",
    }
  );
  return accessToken;
};

const generalRefreshToken = async (uid) => {
  const refreshToken = jwt.sign(
    {
        _id: uid,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "3 days",
    }
  );
  return refreshToken;
};

export default {
  generalAccessToken,
  generalRefreshToken,
};
