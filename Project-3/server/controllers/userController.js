import User from "../models/user.js";
export const test =(req,res) => {
    res.json({
        message:"Hi this is home"
    })
}

export const updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.avatar = req.body.avatar; 
    await user.save();

    res.json({ message: 'Avatar updated', avatar: user.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
