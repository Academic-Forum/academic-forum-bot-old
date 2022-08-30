const average = (grades) => {
    var total = 0;
    grades.forEach((grade) => {
        total += grade;
    });
    const avg = total/grades.length;
	return avg;
};
module.exports = { average };

