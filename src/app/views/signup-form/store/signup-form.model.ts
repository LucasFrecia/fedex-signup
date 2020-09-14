import { FormState } from '@core/models/form-state.model';

/**
 * Model File.
 *
 * Holds form select data
 */
export interface SignupStateModel {
  form: FormState<any> | null;
  submitted: boolean;
}

export interface SignUpItemModel {
  name: string;
  lastName: string;
  email: string;
}
