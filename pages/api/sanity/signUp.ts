import { signUpHandler } from "next-auth-sanity";
import { client } from "../../../lib/client";

export default signUpHandler(client as any);