const formatDate = (timestamp) => {
  try {
    const dateObj = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDateString = dateObj.toLocaleDateString("en-US", options);

    const dayPart = formattedDateString.split(" ")[1];
    let day = parseInt(dayPart);

    let suffix;
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    } else {
      suffix = "th";
    }

    // Append the suffix to the day part
    const formattedDateWithSuffix = formattedDateString.replace(
      day,
      day + suffix
    );

    return "Member since " + formattedDateWithSuffix;
  } catch (error) {
    return "Invalid timestamp format";
  }
};

export { formatDate };
