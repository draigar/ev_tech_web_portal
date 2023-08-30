// import { openNotification } from "./notifications";

export function ErrorHelper(errors: any) {
  if (!errors) {
    return null;
  }

  for (const key in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      const el = errors[key];
      const fields = key;
      const errorData = el;
      const stripErrorMessageArray = JSON.stringify(errorData)
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll(/"/g, "");
      // openNotification({
      //   title: fields.replace(/([a-z0-9])([A-Z])/g, "$1 $2"),
      //   description: `${key.replace(
      //     /([a-z0-9])([A-Z])/g,
      //     "$1 $2"
      //   )} - ${stripErrorMessageArray}`,
      //   type: "warning",
      //   duration: 9,
      // });
    }
  }
}
