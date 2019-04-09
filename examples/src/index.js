import React from "react";
import { render } from "react-dom";
import Zeus from "../../src/Chatbot";

function zeusChat(domOptions) {
  const envOptions = {
    googleProjectId: process.env.GOOGLE_PROJECT_ID,
    dialogFlowSessionId: process.env.DF_SESSION_ID,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY
  };

  const options = Object.assign(envOptions, domOptions);

  if (!options.element) {
    throw new Error("dom element to mount chat view has not been defined");
  }
  if (!options.googleProjectId) {
    throw new Error("please set the GOOGLE_PROJECT_ID environment variable");
  }
  if (!options.dialogFlowSessionId) {
    throw new Error("please set the DF_SESSION_ID environment variable");
  }
  if (!options.googleClientEmail) {
    throw new Error("please set the GOOGLE_CLIENT_EMAIL environment variable");
  }
  if (!options.googlePrivateKey) {
    throw new Error("please set the GOOGLE_PRIVATE_KEY environment variable");
  }

  render(<Zeus {...options} />, options.element);
}

export default zeusChat;
