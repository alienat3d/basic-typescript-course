const folder: string = "dev";

const switchCase = () => {
  let str: string = "The folder is ";
  switch (folder) {
    case "src":
      str += "src.";
      break;
    case "dist":
      str += "dist.";
      break;
    case "dev":
      str += "dev.";
      break;
    default:
      str = "Something went wrong. Check the input.";
  }
  return str;
};

export default switchCase;