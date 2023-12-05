const generateRandomClass = () => {
  const classes = ['Math', 'Science', 'History', 'English', 'Art'];
  const randomIndex = Math.floor(Math.random() * classes.length);
  return classes[randomIndex];
};

const generateDummyData = (count) => {
  const dummyData = [];

  for (let i = 1; i <= count; i++) {
    const student = {
      id: i,
      name: `Student ${i}`,
      class: generateRandomClass(),
    };
    dummyData.push(student);
  }

  return dummyData;
};

const dummyStudents = generateDummyData(25);

export default dummyStudents;
