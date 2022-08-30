/* eslint-disable indent */
const mongoose = require('mongoose');

// connect to the database

const db = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// define the grade user schema

const GradeSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  gradeCheckpoints: {
    type: Array,
  },
  averageScore: {
    type: Number,
    default: 0,
  },
});

const Grade = mongoose.model('grade', GradeSchema);

// define functions

const addUser = async (tag) => {
  // creates a new grade object for a new user, if they don't already have a grade object
  // tag = a string, their discord tag
  // returns true if successful, false if failed

  let grade = await Grade.findOne({ tag });

  if (!grade) {
    grade = new Grade({
      tag,
      gradeCheckpoints: [],
    });

    await grade.save();

    return true;
  } else {
    return false;
  }
};

const addCheckpoint = async (tag, grades) => {
  // add a grade checkpoint to the checkpoint list
  // tag = discord tag of the user, grades = array of the numerical grade values
  // returns true if succeeded, false if failed

  const grade = await Grade.findOne({ tag });
  if (!grade) {
    return false;
  } else {
    const toPush = {
      percentages: grades,
      // the current date doesnt work yet for some reason
      date: new Date(),
    };

    const gradeCheckpoints = grade.gradeCheckpoints;
    gradeCheckpoints.push(toPush);

    await Grade.findOneAndUpdate(
      { tag },
      { $set: { gradeCheckpoints } },
      { useFindAndModify: false }
    );

    return true;
  }
};

const getUser = async (tag) => {
  // return an user as an object, given their tag

  return Grade.findOne({ tag }).exec();
};

// export functions

module.exports = { addUser, addCheckpoint, getUser };
