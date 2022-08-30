module.exports = mongoose => {
  const Pool = mongoose.model(
    "pool",
    mongoose.Schema(
      {
        name: String,
        location: String,
        yearBuilt: Number,
        age: Number,
        type: String,
        shape: String,
        volume: Number,
        finish: String,
        features: [],
        setpoints: {
          freeChlorine: Number,
          combinedChlorine: Number,
          totalChlorine: Number,
          pH: Number,
          alkalinity: Number,
          hardness: Number,
          stabalizer: Number,
          salt: Number
        },
      },
      { timestamps: true }
    )
  );
  return Pool;
};