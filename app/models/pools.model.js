module.exports = mongoose => {
    const Pool = mongoose.model(
      "pool",
      mongoose.Schema(
        {
          name: String,
          location: String,
          yearBuilt: Integer,
          age: Integer,
          type: String,
          shape: String,
          volume: Integer,
          finish: String,
          features: [],
          setpoints: {
            freeChlorine: Integer,
            combinedChlorine: Integer,
            totalChlorine: Integer,
            pH: Integer,
            alkalinity: Integer,
            hardness: Integer,
            stabalizer: Integer,
            salt: Integer
          },
        },
        { timestamps: true }
      )
    );
    return Pool;
  };