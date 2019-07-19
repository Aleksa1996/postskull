export class FormHelpers {
  constructor() {}

  static transformBackendErrors({ error }) {
    let backendErrors = error;
    if (error && error.error) {
      backendErrors = error.error;
    }

    const errors = Object.entries(backendErrors).map(e => ({
      field: e[0],
      message: typeof e[1] === 'string' ? e[1] : e[1][0]
    }));
    return errors;
  }
}
