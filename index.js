const defaultOutput = {
  success: false,
  errors: [],
  message: null,
};

const messageBody = (input, options) => {
  let output = input;
  if (options.type === "code") {
    output = "Log data:\n```\n" + input + "\n```";
  } else if (options.type === "error") {
    output = "Error:\n```\n" + input + "\n```";
  }
  return output;
};

export const notify = async (input, options) => {
  let output = defaultOutput;
  //let output = JSON.parse(JSON.stringify(defaultOutput))
  let message = {
    text: "```\n" + input + "\n```",
  };
  message.text = messageBody(input, options);
  try {
    const res = await fetch(options.webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(message, null, 2),
    });
    output.success = res.ok;
  } catch (err) {
    console.log(err);
    output.errors.push(err.message);
  }
  return output;
};
