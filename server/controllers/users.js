const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");
const User =require( '../models/user.js');
const mongoose =require('mongoose');
const UserModal =require("../models/user.js");
const OrderModel =require("../models/Order.js");
let refreshTokens = []
const secret = 'test';
const secret2='test2';
const refresh = async  (req, res) => {
  const refreshToken = req.body.token
  const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, secret2, (err, email , id) => {
    if (err) return res.sendStatus(403)
    const token = generateAccessToken({ email: oldUser.email, id: oldUser._id })
    res.json({ token :token })
  })
}

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    //const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "15s" });
    const token = generateAccessToken({ email: oldUser.email, id: oldUser._id });
    const refreshToken = jwt.sign({email: oldUser.email, id: oldUser._id} ,secret2)
  refreshTokens.push(refreshToken)

    res.status(200).json({ result: oldUser, token,refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
function generateAccessToken(email ,id) {
  return jwt.sign({ email, id}, secret, { expiresIn: '1H' })
}

 const signup = async (req, res) => {
  const { email, password, firstName, lastName , gender } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email,gender, password: hashedPassword, name: `${firstName} ${lastName}` , gender});
    // const result = await OrderModel.create({ clientId: });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};


const getusers = async(req, res) => {
  try {
      const UserModals = await User.find();
      console.log('getting users');
      res.status(200).json(UserModals);
  } catch (error) {
      res.status(404).send({message: error.message}); 
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name , email} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);


  const updatedUser ={ name , email,"_id": id};

  await User.findByIdAndUpdate(id, updatedUser, { new: true });

  res.status(200).json(updatedUser);
}
module.exports= {signin,signup,refresh,getusers ,updateUser}