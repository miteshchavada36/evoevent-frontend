import * as Yup from "yup";
import { EMAIL_FIELD, REQUIRED_FIELD } from "../../common/validation";

export const loginSchema = Yup.object().shape({
  // email: EMAIL_FIELD,
  email: EMAIL_FIELD,
  password: REQUIRED_FIELD,
});
